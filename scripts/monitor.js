'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var http = require('http');
var widgets = require('widgets');


var DropletWidget = React.createClass({
  displayName: 'DropletWidget',
  getDefaultProps: function () {
    return {
      onSelect: null
    };
  },
  getInitialState: function () {
    return {
      enabled:         false,
      droplets:        null,
      selectedDroplet: null
    };
  },
  render: function () {
    if (!this.state.droplets) {
      return React.createElement(widgets.RadioButton, {
          className: 'droplet-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.droplets.map(function (droplet) {
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
          }.bind(this))));
  }
});


var DropletLegend = React.createClass({
  displayName: 'DropletLegend',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
      failed:          false,
      selectedDroplet: null
    };
  },
  render: function () {
    if (this.state.failed) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            'Something went wrong.  ',
            React.createElement('a', {
                href: ''
              },
              'Refresh'),
            ' the page to continue.')));
    }
    var droplet = this.state.selectedDroplet;
    if (!droplet) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            React.createElement('a', {
                href: '/deploy/'
              },
              'Create'),
            ' a droplet first.')));
    }
    var info = {
      id:        droplet.id,
      locked:    droplet.locked,
      status:    droplet.status,
      createdAt: droplet['created_at'],
      ipAddress: droplet.ipAddress
    };
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        JSON.stringify(info, null, 2)));
  }
});


var ActionWidget = React.createClass({
  displayName: 'ActionWidget',
  getDefaultProps: function () {
    return {
      onView:    null,
      onDestroy: null
    };
  },
  getInitialState: function () {
    return {
      enabled: false
    };
  },
  render: function () {
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


var DigitalOceanMonitorControl = function (props) {
  this.props = this.getDefaultProps();
  this.state = this.getInitialState();
  Object.keys(props || {}).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.createWidgets();
};
DigitalOceanMonitorControl.prototype = {
  getDefaultProps: function () {
    return {
      token:             null,
      dropletId:         null,
      onSelectIpAddress: null
    };
  },
  getInitialState: function () {
    return {
      locked:          false,
      failed:          false,
      account:         null,
      droplets:        null,
      selectedDroplet: null
    };
  },
  createWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, null),
      document.getElementById('digitalocean-account-widget'));
    this.dropletWidget = React.render(
      React.createElement(DropletWidget, {
          onSelect: this.handleSelectDroplet.bind(this)
        }),
      document.getElementById('digitalocean-droplet-widget'));
    this.dropletLegend = React.render(
      React.createElement(DropletLegend, null),
      document.getElementById('digitalocean-droplet-legend'));
    this.dropletActionWidget = React.render(
      React.createElement(ActionWidget, {
          onView:    this.handleViewDroplet.bind(this),
          onDestroy: this.handleDestroyDroplet.bind(this)
        }),
      document.getElementById('droplet-action-widget'));
  },
  renderWidgets: function () {
    this.accountWidget.setState({
        account:           this.state.account ? this.state.account.email : null
      });
    this.dropletWidget.setState({
        enabled:           !this.state.failed,
        droplets:          this.state.droplets,
        selectedDroplet:   this.state.selectedDroplet
      });
    this.dropletLegend.setState({
        failed:            this.state.failed,
        selectedDroplet:   this.state.selectedDroplet
      });
    this.dropletActionWidget.setState({
        enabled:           !this.state.locked && !this.state.failed &&
          this.state.selectedDroplet && !this.state.selectedDroplet.locked
      });
  },
  loadData: function () {
    this.loadAccount(function () {
        this.loadDroplets(function () {
            this.updateSelectedDroplet();
            this.renderWidgets();
          }.bind(this));
      }.bind(this));
  },
  loadAccount: function (next) {
    DigitalOcean.getAccount(function (account) {
        this.state.account = account;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load account:', err);
        this.state.failed  = true;
        this.state.account = null;
        return next();
      }.bind(this),
      this.props.token);
  },
  loadDroplets: function (next) {
    DigitalOcean.getDroplets(function (droplets) {
        this.state.droplets = droplets;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load droplets:', err);
        this.state.failed   = true;
        this.state.droplets = null;
        return next();
      }.bind(this),
      this.props.token);
  },
  updateSelectedDroplet: function () {
    var droplets   = this.state.droplets || [];
    var selectedId = (this.state.selectedDroplet && this.state.selectedDroplet.id) || this.props.dropletId;
    var selectedDroplet;
    if (selectedId) {
      for (var i = 0; i < droplets.length; i += 1) {
        if (droplets[i].id === selectedId) {
          selectedDroplet = droplets[i];
          break;
        }
      }
    }
    if (!selectedDroplet && droplets.length) {
      selectedDroplet = droplets[0];
    }
    this.state.selectedDroplet = selectedDroplet;
    this.props.onSelectIpAddress(selectedDroplet ? selectedDroplet.ipAddress : null);
  },
  handleSelectDroplet: function (selectedDroplet) {
    this.state.selectedDroplet = selectedDroplet;
    this.props.onSelectIpAddress(selectedDroplet.ipAddress);
    this.renderWidgets();
  },
  handleViewDroplet: function () {
    location.href = 'http://' + this.state.selectedDroplet.ipAddress + ':8080/'; // TODO: Use custom port.
  },
  handleDestroyDroplet: function () {
    this.state.locked = true;
    this.renderWidgets();
    DigitalOcean.destroyDroplet(
      this.state.selectedDroplet.id,
      function () {
        this.loadDroplets(function () {
            this.updateSelectedDroplet();
            this.state.locked = false;
            this.renderWidgets();
          }.bind(this));
      }.bind(this),
      function (err) {
        console.error('Failed to destroy droplet:', err); // TODO: Improve error display.
        this.state.locked = false;
        this.renderWidgets();
      }.bind(this),
      this.props.token);
  }
};


var MonitorLegend = React.createClass({
  displayName: 'MonitorLegend',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
      ipAddress: null
    };
  },
  render: function () {
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        this.state.ipAddress));
  }
});


exports.Control = function (props) {
  this.props = this.getDefaultProps();
  Object.keys(props || {}).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.state = this.getInitialState();
  this.createWidgets();
  this.createControl();
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      dropletId: null
    };
  },
  getInitialState: function () {
    return {
      ipAddress: null
    };
  },
  createWidgets: function () {
    this.monitorLegend = React.render(
      React.createElement(MonitorLegend, null),
      document.getElementById('monitor-legend'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.monitorLegend.setState({
        ipAddress: this.state.ipAddress
      });
  },
  createControl: function () {
    this.digitalOceanControl = new DigitalOceanMonitorControl({
        token:             this.props.digitalOceanToken,
        dropletId:         this.props.dropletId,
        onSelectIpAddress: this.handleSelectIpAddress.bind(this)
      });
  },
  loadData: function () {
    this.digitalOceanControl.loadData();
  },
  handleSelectIpAddress: function (ipAddress) {
    this.state.ipAddress = ipAddress;
    this.renderWidgets();
  }
};


exports.start = function () {
  var query = http.parseQueryString(location.search);
  var control = new exports.Control({
      digitalOceanToken: localStorage.getItem('digitalocean-token'),
      dropletId:         query && parseInt(query['id'])
    });
  control.loadData();
};
