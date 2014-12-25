'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var http = require('http');
var widgets = require('widgets');


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
      selectedDropletId: null
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
    this.doControl = new DigitalOcean.MonitorControl({
        onChangeIpAddress: this.handleChangeIpAddress.bind(this)
      });
  },
  loadData: function () {
    this.doControl.loadData();
  },
  handleChangeIpAddress: function (ipAddress) {
    this.state.ipAddress = ipAddress;
    this.renderWidgets();
  }
};


exports.start = function () {
  var selectedDropletId;
  var query = http.parseQueryString(location.search);
  if (query) {
    selectedDropletId = query['id'];
  }
  var control = new exports.Control({
      selectedDropletId: selectedDropletId
    });
  control.loadData();
};
