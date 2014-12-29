'use strict';

var DigitalOcean = require('monitor-digitalocean');
var React = require('react');
var easeScroll = require('ease-scroll');
var http = require('http');
var utils = require('utils');


var MonitorLegend = React.createClass({
  displayName: 'MonitorLegend',
  getDefaultProps: function () {
    return {};
  },
  getInitialState: function () {
    return {
      response: undefined
    };
  },
  render: function () {
    return (
      React.createElement('pre', {
          id: 'monitor-legend'
        },
        React.createElement('code', {
            dangerouslySetInnerHTML: {
              __html: this.state.response
            }
          })));
  },
  componentDidUpdate: function () {
    var node = this.getDOMNode();
    var startOffset = node.scrollTop;
    var maxOffset = node.scrollHeight - node.clientHeight;
    easeScroll.tween(startOffset, maxOffset, maxOffset, 500, function (y) {
        node.scrollTop = y;
      });
  }
});


var fixResponseText = function (responseText) {
  var esc    = String.fromCharCode(0x1b) + '\\[';
  var startB = new RegExp(esc + '1m', 'g');
  var endB   = new RegExp(esc + '0m', 'g');
  var link   = new RegExp('(https?://[^ \n]*?)(\n|\\.\\.\\.)', 'g');
  return responseText
    .replace(startB, '<b>')
    .replace(endB, '</b>')
    .replace(link, '<a href="$1">$1</a>$2');
};


var MonitorControl = function (props) {
  this.props = this.getDefaultProps();
  utils.update(this.props, props);
  this.makeWidgets();
  this.state = {};
  this.setInitialState();
};
MonitorControl.prototype = {
  getDefaultProps: function () {
    return {};
  },
  makeWidgets: function () {
    this.monitorLegend = React.render(
      React.createElement(MonitorLegend),
      document.getElementById('monitor-legend'));
  },
  setInitialState: function () {
    this.setState({
        droplet:   undefined,
        status:    undefined,
        response:  undefined
      });
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.monitorLegend.setState({
        response:  this.state.response
      });
  },
  selectDroplet: function (droplet) {
    if (droplet && this.state.droplet && droplet.id === this.state.droplet.id && droplet.ipAddress === this.state.droplet.ipAddress) {
      return;
    }
    this.setState({
        droplet:   droplet,
        status:    undefined,
        response:  undefined
      });
    if (droplet && droplet.ipAddress) {
      var req = http.makeRequest('GET', 'http://' + this.state.droplet.ipAddress + ':4040/', null, null, {
        onChangeState: function () {
            this.changeRequestState(req);
          }.bind(this)
      });
    }
  },
  changeRequestState: function (req) {
    this.setState({
        status:   req && req.status,
        response: req && req.responseText && fixResponseText(req.responseText)
      });
  }
};


var Control = function (props) {
  this.props = this.getDefaultProps();
  utils.update(this.props, props);
  this.makeControls();
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
        storedDropletId: this.props.storedDropletId && parseInt(this.props.storedDropletId),
        onSelectDroplet: this.selectDroplet.bind(this)
      });
    this.monitorControl = new MonitorControl();
  },
  start: function () {
    this.digitalOceanControl.start();
  },
  selectDroplet: function (droplet) {
    this.monitorControl.selectDroplet(droplet);
    utils.storeJson('monitor-droplet-id', droplet && droplet.id);
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
