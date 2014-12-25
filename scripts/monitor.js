'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var http = require('http');
var widgets = require('widgets');


var MonitorWidget = React.createClass({
  displayName: 'MonitorWidget',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
      selectedIpAddress: null
    };
  },
  render: function () {
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        this.state.selectedIpAddress));
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
      dropletId: null
    };
  },
  getInitialState: function () {
    return {
      selectedIpAddress: null
    };
  },
  createWidgets: function () {
    this.monitorWidget = React.render(
      React.createElement(MonitorWidget, null),
      document.getElementById('monitor-legend'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.monitorWidget.setState({
        selectedIpAddress: this.state.selectedIpAddress
      });
  },
  createControl: function () {
    this.doControl = new DigitalOcean.MonitorControl({
        onSelectIpAddress: this.handleSelectIpAddress.bind(this)
      });
  },
  loadData: function () {
    this.doControl.loadData();
  },
  handleSelectIpAddress: function (ipAddress) {
    this.state.selectedIpAddress = ipAddress;
    this.renderWidgets();
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
