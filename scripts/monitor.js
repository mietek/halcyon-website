'use strict';

var DigitalOcean = require('monitor-digitalocean');
var React = require('react');
var http = require('http');
var utils = require('utils');
var widgets = require('widgets');


var MonitorLegend = React.createClass({
  displayName: 'MonitorLegend',
  getDefaultProps: function () {
    return {};
  },
  getInitialState: function () {
    return {
      ipAddress: undefined
    };
  },
  render: function () {
    // TODO: Write this.
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        JSON.stringify(this.state, null, 2)));
  }
});


var Control = function (props) {
  this.props = this.getDefaultProps();
  utils.update(this.props, props);
  this.makeControls();
  this.makeWidgets();
  this.state = {};
  this.setInitialState();
};
Control.prototype = {
  getDefaultProps: function () {
    return {
      digitalOceanToken: undefined,
      storedDropletId:   undefined
    };
  },
  makeControls: function () {
    this.digitalOceanControl = new DigitalOcean.Control({
        storedToken:     this.props.digitalOceanToken,
        storedDropletId: this.props.storedDropletId,
        onSelectDroplet: this.selectDroplet.bind(this)
      });
  },
  makeWidgets: function () {
    this.monitorLegend = React.render(
      React.createElement(MonitorLegend),
      document.getElementById('monitor-legend'));
  },
  setInitialState: function () {
    this.setState();
  },
  setState: function (state) {
    utils.update(this.state, state);
  },
  start: function () {
    this.digitalOceanControl.start();
  },
  selectDroplet: function (droplet) {
    this.monitorLegend.setState({
        ipAddress: droplet && droplet.ipAddress
      });
    utils.store('monitor-droplet-id', droplet && droplet.id);
  }
};


exports.start = function () {
  var query = http.parseQueryString(location.search);
  if (query && query['id']) {
    utils.storeJson('monitor-droplet-id', query['id']);
  }
  window.control = new Control({
      digitalOceanToken: utils.load('digitalocean-token'),
      storedDropletId:   utils.loadJson('monitor-droplet-id')
    });
  window.control.start();
};
