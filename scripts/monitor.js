'use strict';

var DigitalOcean = require('monitor-digitalocean');
var React = require('react');
var easeScroll = require('ease-scroll');
var http = require('http');
var utils = require('utils');
var widgets = require('widgets');

/* global innerHeight, scrollX, scrollY */


var MonitorLegend = React.createClass({
  displayName: 'MonitorLegend',
  getDefaultProps: function () {
    return {};
  },
  getInitialState: function () {
    return {
      droplet: undefined,
      log:     undefined
    };
  },
  render: function () {
    var createdAt, monitorLife, monitorUntil;
    if (this.state.droplet) {
      createdAt    = Date.parse(this.state.droplet['created_at']);
      monitorLife  = 3600 * 1000; // TODO: Support custom values;
      monitorUntil = createdAt + monitorLife;
    }
    return (
      React.createElement('div', null,
        (!this.state.droplet || !this.state.log) ? null :
          React.createElement('pre', {
              id: 'monitor-log'
            },
            React.createElement('code', {
                dangerouslySetInnerHTML: {
                  __html: this.state.log
                }
              })),
        React.createElement('div', {
            className: 'inner'
          },
          React.createElement(widgets.LoadingDisplay, {
              loadingMsg:
                !this.state.droplet ? 'Not available.' :
                !this.state.droplet.ipAddress ? 'Waiting for IP address…' :
                (!this.state.log && Date.now() < monitorUntil) ? 'Waiting for response…' :
                Date.now() < monitorUntil ? 'Live log expires at ' + new Date(monitorUntil).toLocaleString() :
                'Live log expired at ' + new Date(monitorUntil).toLocaleString()
            }))));
  },
  componentDidUpdate: function () {
    var node = this.getDOMNode().firstChild;
    if (node.tagName === 'PRE') {
      var startOffset = node.scrollTop;
      var maxOffset = node.scrollHeight - node.clientHeight;
      easeScroll.tween(startOffset, maxOffset, maxOffset, 500, function (y) {
          node.scrollTop = y;
        });
    }
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
    .replace(link, '<a href="$1" target="_blank">$1</a>$2');
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
        droplet: this.state.droplet,
        log:     this.state.log
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
        setTimeout(loop, 15 * 1000);
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
    var log = request && request.responseText && reformatLog(request.responseText);
    var mustScroll = !this.state.log && log;
    if (log) {
      this.setState({
          log: log
        });
    }
    if (mustScroll) {
      var startOffset = scrollY;
      var maxOffset   = document.body.scrollHeight - innerHeight;
      var offset      = easeScroll.getElementOffsetById('live-log');
      easeScroll.tween(startOffset, maxOffset, offset, 500, function (y) {
          scrollTo(scrollX, y);
        });
    }
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
