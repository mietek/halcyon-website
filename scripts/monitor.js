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
      log: undefined
    };
  },
  render: function () {
    return (
      React.createElement('pre', {
          id: 'monitor-log'
        },
        React.createElement('code', {
            dangerouslySetInnerHTML: {
              __html: this.state.log
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


var reformatLog = function (log) {
  var esc    = String.fromCharCode(0x1b) + '\\[';
  var startB = new RegExp(esc + '1m', 'g');
  var endB   = new RegExp(esc + '0m', 'g');
  var link   = new RegExp('(https?://[^ \n]*?)(\n|\\.\\.\\.)', 'g');
  return log
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
        droplet: undefined,
        request: undefined,
        log:     undefined
      });
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.monitorLegend.setState({
        log: this.state.log
      });
  },
  start: function () {
    var loop = function () {
        if (this.state.request && (!this.state.log || !this.state.log.length)) {
          this.state.request.abort();
          this.setState({
              request: undefined
            });
          this.loadLog();
        }
        setTimeout(loop, 10 * 1000);
      }.bind(this);
    loop();
  },
  selectDroplet: function (droplet) {
    if (droplet && this.state.droplet && droplet.id === this.state.droplet.id && droplet.ipAddress === this.state.droplet.ipAddress) {
      return;
    }
    if (this.state.request) {
      this.state.request.abort();
    }
    this.setState({
        droplet: droplet,
        request: undefined,
        log:     undefined
      });
    this.loadLog();
  },
  loadLog: function () {
    if (this.state.droplet && this.state.droplet.ipAddress) {
      var url = 'http://' + this.state.droplet.ipAddress + ':4040/';
      var request = http.makeRequest('GET', url, null, null, {
          onChangeState: function () {
            this.changeRequestState(request);
          }.bind(this)
        });
      this.setState({
          request: request
        });
    }
  },
  changeRequestState: function (request) {
    this.setState({
        log: request && request.responseText && reformatLog(request.responseText)
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
    this.monitorControl.start();
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
