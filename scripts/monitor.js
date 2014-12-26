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
      account:         null,
      accountPending:  false,
      accountError:    null,
      selectedDroplet: null,
      dropletsError:   null,
    };
  },
  render: function () {
    // TODO: Rewrite this.
    var droplet = this.state.selectedDroplet;
    if (!droplet) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            React.createElement('a', {
                href: '/deploy/'
              },
              'Create'),
            ' a droplet to begin.')));
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


var ActionLegend = React.createClass({
  displayName: 'ActionLegend',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
      actionPending: false,
      actionError:   null
    };
  },
  render: function () {
    // TODO
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
      token:           null,
      dropletId:       null,
      onSelectDroplet: null
    };
  },
  getInitialState: function () {
    return {
      account:         null,
      accountPending:  false,
      accountError:    null,
      droplets:        null,
      dropletsError:   null,
      selectedDroplet: null,
      actionPending:   false,
      actionError:     null
    };
  },
  createWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, null),
      document.getElementById('digitalocean-account-widget'));
    this.dropletWidget = React.render(
      React.createElement(DropletWidget, {
          onSelect: this.selectDroplet.bind(this)
        }),
      document.getElementById('droplet-widget'));
    this.dropletLegend = React.render(
      React.createElement(DropletLegend, null),
      document.getElementById('droplet-legend'));
    this.actionWidget = React.render(
      React.createElement(ActionWidget, {
          onView:    this.viewDroplet.bind(this),
          onDestroy: this.destroyDroplet.bind(this)
        }),
      document.getElementById('action-widget'));
    this.actionLegend = React.render(
      React.createElement(ActionLegend, null),
      document.getElementById('action-legend'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.accountWidget.setState({
        enabled:         false,
        account:         this.state.account && this.state.account.email
      });
    this.dropletWidget.setState({
        enabled:         !this.state.accountPending,
        droplets:        this.state.droplets,
        selectedDroplet: this.state.selectedDroplet
      });
    this.dropletLegend.setState({
        account:         this.state.account,
        accountPending:  this.state.accountPending,
        accountError:    this.state.accountError,
        dropletsError:   this.state.dropletsError,
        selectedDroplet: this.state.selectedDroplet
      });
    this.actionWidget.setState({
        enabled:         !this.state.accountPending && this.state.selectedDroplet && !this.state.selectedDroplet.locked && !this.state.actionPending
      });
    this.actionLegend.setState({
        actionPending:  this.state.actionPending,
        actionError:    this.state.actionError
      });
  },
  loadData: function () {
    this.state.accountPending = true;
    this.loadAccount(function () {
        this.state.accountPending = false;
        this.renderWidgets();
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
      function (error) {
        this.state.account      = null;
        this.state.accountError = error;
        return next();
      }.bind(this),
      this.props.token);
  },
  loadDroplets: function (next) {
    DigitalOcean.getDroplets(function (droplets) {
        this.state.droplets = droplets;
        return next();
      }.bind(this),
      function (error) {
        this.state.droplets      = null;
        this.state.dropletsError = error;
        return next();
      }.bind(this),
      this.props.token);
  },
  viewDroplet: function () {
    location.href = 'http://' + this.state.selectedDroplet.ipAddress + ':8080/'; // TODO: Support custom ports.
  },
  destroyDroplet: function () {
    this.state.actionPending = true;
    this.renderWidgets();
    DigitalOcean.destroyDroplet(
      this.state.selectedDroplet.id,
      function () {
        this.loadDroplets(function () {
            this.state.actionPending = false;
            this.updateSelectedDroplet();
            this.renderWidgets();
          }.bind(this));
      }.bind(this),
      function (error) {
        this.state.actionPending = false;
        this.state.actionError   = error;
        this.renderWidgets();
      }.bind(this),
      this.props.token);
  },
  selectDroplet: function (selectedDroplet) {
    this.state.selectedDroplet = selectedDroplet;
    localStorage.setItem('monitor-droplet-id', selectedDroplet && selectedDroplet.id);
    this.props.onSelectDroplet(selectedDroplet);
    this.renderWidgets();
  },
  updateSelectedDroplet: function () {
    var droplets          = this.state.droplets || [];
    var selectedDropletId = (this.state.selectedDroplet && this.state.selectedDroplet.id) || this.props.dropletId;
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
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      dropletId: null
    };
  },
  getInitialState: function () {
    return {
      droplet: null
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
        ipAddress: this.state.droplet && this.state.droplet.ipAddress
      });
  },
  createControl: function () {
    this.digitalOceanControl = new DigitalOceanMonitorControl({
        token:           this.props.digitalOceanToken,
        dropletId:       this.props.dropletId,
        onSelectDroplet: this.selectDroplet.bind(this)
      });
  },
  loadData: function () {
    this.digitalOceanControl.loadData();
  },
  selectDroplet: function (droplet) {
    this.state.droplet = droplet;
    this.renderWidgets();
  }
};


exports.start = function () {
  var query = http.parseQueryString(location.search);
  if (query) {
    if (query['id']) {
      localStorage.setItem('monitor-droplet-id', query['id']);
    }
  }
  var dropletId = localStorage.getItem('monitor-droplet-id');
  var control = new exports.Control({
      digitalOceanToken: localStorage.getItem('digitalocean-token'),
      dropletId:         dropletId && parseInt(dropletId)
    });
  control.loadData();
};
