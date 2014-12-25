'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var http = require('http');


var MonitorWidget = React.createClass({
  displayName: 'MonitorWidget',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
    };
  },
  render: function () {
    return (
      React.createElement('pre', null,
        React.createElement('code', null,
          'Hello, world!')));
  }
});


exports.Control = function (props) {
  this.props = this.getDefaultProps();
  Object.keys(props).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.state = this.getInitialState();
  this.createWidgets();
  this.createControl();
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      dropletId: undefined
    };
  },
  getInitialState: function () {
    return {
    };
  },
  createWidgets: function () {
    this.monitorWidget = React.render(
      React.createElement(MonitorWidget, null),
      document.getElementById('monitor-widget'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.monitorWidget.setState({
      });
  },
  createControl: function () {
    this.doControl = new DigitalOcean.MonitorControl({});
  },
  loadData: function () {
    this.doControl.loadData();
  }
};


exports.start = function () {
  var dropletId;
  var query = http.parseQueryString(location.search);
  if (query) {
    dropletId = query['droplet_id'];
  }
  var control = new exports.Control({
      dropletId: dropletId
    });
  control.loadData();
};
