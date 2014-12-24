'use strict';

var DigitalOcean = require('digitalocean');
var GitHub = require('github');
var React = require('react');
var http = require('http');
var utils = require('utils');
var widgets = require('widgets');


var DeployWidget = React.createClass({
  displayName: 'DeployWidget',
  getDefaultProps: function () {
    return {
      onDeploy: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled: false
    };
  },
  render: function () {
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(widgets.PushButton, {
            className: 'deploy-button',
            enabled:   this.state.enabled,
            title:     'Deploy to DigitalOcean',
            onClick:   this.props.onDeploy
          })));
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
}
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      ghClientId:    undefined,
      ghToken:       undefined,
      doClientId:    undefined,
      doCallbackUrl: undefined,
      doToken:       undefined,
      sourceUrl:     undefined
    };
  },
  getInitialState: function () {
    return {
      ghReady: undefined,
      doReady: undefined,
    };
  },
  createWidgets: function () {
    this.deployWidget = React.render(
      React.createElement(DeployWidget, {
          onDeploy: this.handleDeploy.bind(this)
        }),
      document.getElementById('deploy-widget'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.deployWidget.setState({
        enabled: this.state.ghReady && this.state.doReady
      });
  },
  createControl: function () {
    this.ghControl = new GitHub.Control({
        clientId:  this.props.ghClientId,
        token:     this.props.ghToken,
        sourceUrl: this.props.sourceUrl,
        onReady:   function () {
          this.state.ghReady = true;
          this.renderWidgets();
        }.bind(this),
        onUnready: function () {
          this.state.ghReady = false;
          this.renderWidgets();
        }.bind(this)
      });
    this.doControl = new DigitalOcean.Control({
        clientId:        this.props.doClientId,
        callbackUrl:     this.props.doCallbackUrl,
        token:           this.props.doToken,
        defaultHostname: utils.getRandomHostname(),
        onReady:         function () {
          this.state.doReady = true;
          this.renderWidgets();
        }.bind(this),
        onUnready:       function () {
          this.state.doReady = false;
          this.renderWidgets();
        }.bind(this)
      });
  },
  loadData: function () {
    this.doControl.loadData();
    this.ghControl.loadData();
  },
  handleDeploy: function () {
    this.doControl.createDroplet(this.ghControl.getSourceUrl(),
      function (droplet) {
        console.log('yea', droplet);
      },
      function (err) {
        console.log('nay', err);
      });
  }
};


exports.start = function () {
  var sourceUrl;
  if (GitHub.parseRepoUrl(document.referrer)) {
    sourceUrl = document.referrer;
  }
  var ghToken, doToken;
  var query = http.parseQueryString(location.search);
  if (query) {
    var token = query['access_token'];
    if (query['vendor'] === 'github') {
      ghToken = token;
    } else if (query.vendor === 'digitalocean') {
      doToken = token;
    }
    sourceUrl = query['url'];
  }
  var control = new exports.Control({
      ghClientId:    '2765f53aa92837f0a835',
      ghToken:       ghToken,
      doClientId:    '2530da1c8b65fd7e627f9ba234db0cfddae44c2ddf7e603648301f043318cac4',
      doCallbackUrl: 'https://halcyon-digitalocean-callback.herokuapp.com/callback',
      doToken:       doToken,
      sourceUrl:     sourceUrl
    });
  control.loadData();
};
