'use strict';

var DigitalOcean = require('deploy-digitalocean');
var GitHub = require('deploy-github');
var React = require('react');
var http = require('http');
var utils = require('utils');
var widgets = require('widgets');


exports.Control = function (props) {
  this.props = this.getDefaultProps();
  Object.keys(props || {}).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.state = this.getInitialState();
  this.createWidgets();
  this.createControl();
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      digitalOceanClientId:     null,
      digitalOceanCallbackUrl:  null,
      digitalOceanToken:        null,
      digitalOceanReferralCode: null,
      gitHubClientId:           null,
      gitHubToken:              null,
      hostname:                 null,
      sizeSlug:                 null,
      imageSlug:                null,
      regionSlug:               null,
      keyIds:                   null,
      sourceUrl:                null,
      envVars:                  null
    };
  },
  getInitialState: function () {
    return {
      hostname:                 null,
      sourceUrl:                null,
      envVars:                  null
    };
  },
  createWidgets: function () {
    this.hostnameWidget = React.render(
      React.createElement(widgets.InputWidget, {
          placeholder: this.props.hostname,
          onChange:    this.changeHostname.bind(this)
        }),
      document.getElementById('hostname-widget'));
    this.sourceWidget = React.render(
      React.createElement(widgets.InputWidget, {
          type:        'url',
          placeholder: 'https://github.com/user/project',
          onChange:    this.changeSourceUrl.bind(this)
        }),
      document.getElementById('source-widget'));
    this.envVarsWidget = React.render(
      React.createElement(widgets.MapWidget, {
          onChange:    this.changeEnvVars.bind(this)
        }),
      document.getElementById('env-vars-widget'));
    this.renderWidgets();
  },
  createControl: function () {
    this.digitalOceanControl = new DigitalOcean.DeployControl({
        clientId:     this.props.digitalOceanClientId,
        callbackUrl:  this.props.digitalOceanCallbackUrl,
        token:        this.props.digitalOceanToken,
        referralCode: this.props.digitalOceanReferralCode,
        hostname:     this.props.hostname,
        sizeSlug:     this.props.sizeSlug,
        imageSlug:    this.props.imageSlug,
        regionSlug:   this.props.regionSlug,
        keyIds:       this.props.keyIds,
        sourceUrl:    this.props.sourceUrl,
        envVars:      this.props.envVars
      });
    this.gitHubControl = new GitHub.DeployControl({
        clientId:     this.props.gitHubClientId,
        token:        this.props.gitHubToken,
        sourceUrl:    this.props.sourceUrl
      });
  },
  renderWidgets: function () {
    this.hostnameWidget.setState({
        enabled: true,
        value:   this.state.hostname
      });
    this.sourceWidget.setState({
        enabled: true,
        value:   this.state.sourceUrl || this.props.sourceUrl
      });
    this.envVarsWidget.setState({
        enabled: true,
        items:   this.state.envVars || this.props.envVars
      });
  },
  loadData: function () {
    this.digitalOceanControl.loadData();
    this.gitHubControl.loadData();
  },
  changeHostname: function (hostname) {
    var validHostname = hostname.replace(/[^a-z0-9\-]/g, '');
    this.state.hostname = validHostname;
    this.renderWidgets();
    this.digitalOceanControl.changeHostname(validHostname);
  },
  changeSourceUrl: function (sourceUrl) {
    this.state.sourceUrl = sourceUrl;
    this.renderWidgets();
    this.digitalOceanControl.changeSourceUrl(sourceUrl);
    this.gitHubControl.changeSourceUrl(sourceUrl);
  },
  changeEnvVars: function (envVars)  {
    this.state.envVars = envVars;
    this.renderWidgets();
    this.digitalOceanControl.changeEnvVars(envVars);
  }
};


exports.start = function () {
  if (GitHub.parseRepoUrl(document.referrer)) {
    localStorage.setItem('deploy-source-url', document.referrer);
  }
  var query = http.parseQueryString(location.search);
  if (query) {
    if (query['access_token']) {
      if (query.vendor === 'digitalocean') {
        localStorage.setItem('digitalocean-token', query['access_token']);
      } else if (query['vendor'] === 'github') {
        localStorage.setItem('github-token', query['access_token']);
      }
    }
    if (query['url']) {
      localStorage.setItem('deploy-source-url', query['url']);
    }
  }
  var keyIds = localStorage.getItem('deploy-key-ids');
  var control = new exports.Control({
      digitalOceanClientId:     '2530da1c8b65fd7e627f9ba234db0cfddae44c2ddf7e603648301f043318cac4',
      digitalOceanCallbackUrl:  'https://halcyon-digitalocean-callback.herokuapp.com/callback',
      digitalOceanToken:        localStorage.getItem('digitalocean-token'),
      digitalOceanReferralCode: '6b1199e29661',
      gitHubClientId:           '2765f53aa92837f0a835',
      gitHubToken:              localStorage.getItem('github-token'),
      hostname:                 utils.getRandomHostname(),
      sizeSlug:                 localStorage.getItem('deploy-size-slug'),
      imageSlug:                localStorage.getItem('deploy-image-slug'),
      regionSlug:               localStorage.getItem('deploy-region-slug'),
      keyIds:                   keyIds && JSON.parse(keyIds),
      sourceUrl:                localStorage.getItem('deploy-source-url')
    });
  control.loadData();
};
