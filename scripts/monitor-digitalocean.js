'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var utils = require('utils');
var widgets = require('widgets');


var DropletWidget = React.createClass({
  displayName: 'DropletWidget',
  getDefaultProps: function () {
    return {
      onSelect: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:         false,
      droplets:        undefined,
      dropletsError:   undefined,
      selectedDroplet: undefined
    };
  },
  render: function () {
    var contents;
    if (this.state.droplets) {
      if (!this.state.droplets.length) {
        contents = React.createElement(widgets.RadioButton, {
            className: 'meta-button',
            title:     'none'
          });
      } else {
        contents = this.state.droplets.map(function (droplet) {
            return (
              React.createElement(widgets.RadioButton, {
                  key:       droplet.id,
                  className: 'droplet-button',
                  enabled:   this.state.enabled,
                  selected:  this.state.selectedDroplet && droplet.id === this.state.selectedDroplet.id,
                  title:     droplet.name,
                  onClick:   function () {
                    this.props.onSelect(droplet);
                  }.bind(this)
                })
            );
          }.bind(this));
      }
    }
    return (
      React.createElement('div', null,
        React.createElement('div', {
            className: 'flex',
          },
          contents),
        React.createElement(widgets.DynamicDisplay, {
            value:      this.state.droplets,
            loadingMsg: 'Loading droplets…',
            error:      this.state.dropletsError,
            errorMsg:   'Failed to load droplets.'
          })));
  }
});


var DropletLegend = React.createClass({
  displayName: 'DropletLegend',
  getDefaultProps: function () {
    return {};
  },
  getInitialState: function () {
    return {
      selectedDroplet: undefined
    };
  },
  render: function () {
    // TODO: Write this.
    var droplet = this.state.selectedDroplet || {};
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        JSON.stringify({
            id:         droplet.id,
            name:       droplet.name,
            sizeSlug:   droplet['size_slug'],
            imageSlug:  droplet.image && droplet.image.slug,
            regionSlug: droplet.region && droplet.region.slug,
            status:     droplet.status,
            locked:     droplet.locked,
            ipAddress:  droplet.ipAddress
          }, null, 2)));
  }
});


var ActionWidget = React.createClass({
  displayName: 'ActionWidget',
  getDefaultProps: function () {
    return {
      onView:    undefined,
      onDestroy: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:     false,
      action:      undefined,
      actionError: undefined
    };
  },
  render: function () {
    // TODO: Add error handling.
    return (
      React.createElement('div', null,
        React.createElement('div', {
            className: 'flex'
          },
          React.createElement(widgets.PushButton, {
              className: 'view-button',
              enabled:   this.state.enabled,
              title:     'View droplet',
              onClick:   this.props.onView
            }),
          React.createElement(widgets.PushButton, {
              className: 'destroy-button',
              enabled:   this.state.enabled,
              title:     'Destroy droplet',
              onClick:   this.props.onDestroy
            }))));
  }
});


exports.Control = function (props) {
  this.props = this.getDefaultProps();
  utils.update(this.props, props);
  this.makeWidgets();
  this.state = {};
  this.setInitialState();
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      storedToken:     undefined,
      storedDropletId: undefined,
      onSelectDroplet: undefined
    };
  },
  makeWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget),
      document.getElementById('digitalocean-account-widget'));
    this.dropletWidget = React.render(
      React.createElement(DropletWidget, {
          onSelect: this.selectDroplet.bind(this)
        }),
      document.getElementById('droplet-widget'));
    this.dropletLegend = React.render(
      React.createElement(DropletLegend),
      document.getElementById('droplet-legend'));
    this.actionWidget = React.render(
      React.createElement(ActionWidget, {
          onView:    this.viewDroplet.bind(this),
          onDestroy: this.destroyDroplet.bind(this)
        }),
      document.getElementById('action-widget'));
  },
  setInitialState: function () {
    this.setState({
        token:           this.props.storedToken,
        account:         undefined,
        accountError:    undefined,
        droplets:        undefined,
        dropletsError:   undefined,
        selectedDroplet: undefined,
        action:          undefined,
        actionError:     undefined
      });
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.accountWidget.setState({
        enabled:         false,
        account:         this.state.account && this.state.account.email,
        accountError:    this.state.accountError
      });
    this.dropletWidget.setState({
        enabled:         !!this.state.account,
        droplets:        this.state.droplets,
        dropletsError:   this.state.dropletsError,
        selectedDroplet: this.state.selectedDroplet
      });
    this.dropletLegend.setState({
        selectedDroplet: this.state.selectedDroplet
      });
    this.actionWidget.setState({
        enabled:         !!this.state.account && this.state.selectedDroplet && !this.state.selectedDroplet.locked && !this.state.action,
        action:          this.state.action,
        actionError:     this.state.actionError
      });
  },
  start: function () {
    var loop = function () {
      this.loadDroplets(function () {
          setTimeout(loop, 10 * 1000);
        }.bind(this));
    }.bind(this);
    this.loadAccount(function () {
        loop();
      }.bind(this));
  },
  loadAccount: function (next) {
    DigitalOcean.getAccount(function (account, err) {
        this.setState({
            account:      account,
            accountError: err
          });
        return next();
      }.bind(this),
      this.state.token);
  },
  loadDroplets: function (next) {
    DigitalOcean.getDroplets(function (droplets, err) {
        var ourDroplets = droplets && droplets.filter(function (droplet) {
            return droplet.features.indexOf('backups') === -1 && droplet.features.indexOf('ipv6') === -1 && droplet.features.indexOf('private_networking') === -1; // TODO: Filter our droplets properly.
          });
        this.setState({
            droplets:      ourDroplets,
            dropletsError: err
          });
        this.updateSelectedDroplet();
        return next();
      }.bind(this),
      this.state.token);
  },
  viewDroplet: function () {
    location.href = 'http://' + this.state.selectedDroplet.ipAddress + ':8080/'; // TODO: Support custom ports.
  },
  destroyDroplet: function () {
    this.setState({
        action:      'destroy',
        actionError: undefined
      });
    DigitalOcean.destroyDroplet(
      this.state.selectedDroplet.id,
      function (nil, err) {
        this.loadDroplets(function () {
            this.setState({
                action:      undefined,
                actionError: err
              });
          }.bind(this));
      }.bind(this),
      this.state.token);
  },
  selectDroplet: function (droplet) {
    this.setState({
        selectedDroplet: droplet
      });
    this.props.onSelectDroplet(droplet);
  },
  updateSelectedDroplet: function () {
    var droplets          = this.state.droplets || [];
    var selectedDropletId = (this.state.selectedDroplet && this.state.selectedDroplet.id) || this.props.storedDropletId;
    var selectedDroplet;
    if (selectedDropletId) {
      for (var i = 0; i < droplets.length; i += 1) {
        if (droplets[i].id === selectedDropletId) {
          selectedDroplet = droplets[i];
          break;
        }
      }
    }
    if (!selectedDroplet && droplets.length) {
      selectedDroplet = droplets[0];
    }
    this.selectDroplet(selectedDroplet);
  }
};
