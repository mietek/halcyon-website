'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var http = require('http');
var widgets = require('widgets');


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
    };
  },
  createWidgets: function () {
    this.monitorWidget = React.render(
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        'Hello, world!'),
      document.getElementById('monitor-legend'));
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
