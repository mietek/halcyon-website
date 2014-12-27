'use strict';

var DigitalOceanDeploy = require('deploy-digitalocean');
var GitHubDeploy = require('deploy-github');
var GitHub = require('github');
var React = require('react');
var http = require('http');
var utils = require('utils');
var widgets = require('widgets');


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
      digitalOceanClientId:     undefined,
      digitalOceanCallbackUrl:  undefined,
      digitalOceanReferralCode: undefined,
      digitalOceanToken:        undefined,
      gitHubClientId:           undefined,
      gitHubToken:              undefined,
      defaultHostname:          undefined,
      storedSizeSlug:           undefined,
      storedImageSlug:          undefined,
      storedRegionSlug:         undefined,
      storedKeyIds:             undefined,
      storedSourceUrl:          undefined,
      storedEnvVarItems:        undefined,
      onChangeHostname:         undefined,
      onSelectSize:             undefined,
      onSelectImage:            undefined,
      onSelectRegion:           undefined,
      onSelectKeys:             undefined,
      onChangeSourceUrl:        undefined,
      onChangeEnvVarItems:      undefined
    };
  },
  makeControls: function () {
    this.digitalOceanControl = new DigitalOceanDeploy.Control({
        clientId:           this.props.digitalOceanClientId,
        callbackUrl:        this.props.digitalOceanCallbackUrl,
        referralCode:       this.props.digitalOceanReferralCode,
        storedToken:        this.props.digitalOceanToken,
        storedSizeSlug:     this.props.storedSizeSlug,
        storedImageSlug:    this.props.storedImageSlug,
        storedRegionSlug:   this.props.storedRegionSlug,
        storedKeyIds:       this.props.storedKeyIds,
        onForgetAccount:    this.unsetDigitalOceanToken.bind(this),
        onSelectSize:       this.setSize.bind(this),
        onSelectImage:      this.setImage.bind(this),
        onSelectRegion:     this.setRegion.bind(this),
        onSelectKeys:       this.setKeys.bind(this)
      });
    this.gitHubControl = new GitHubDeploy.Control({
        clientId:           this.props.gitHubClientId,
        storedToken:        this.props.gitHubToken,
        onForgetAccount:    this.unsetGitHubToken.bind(this),
        onChangeSourceInfo: this.changeSourceInfo.bind(this)
      });
  },
  makeWidgets: function () {
    this.hostnameWidget = React.render(
      React.createElement(widgets.InputWidget, {
          placeholder: this.props.defaultHostname,
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
    this.envVarItemsWidget = React.render(
      React.createElement(widgets.MapWidget, {
          onChange:    this.changeEnvVarItems.bind(this)
        }),
      document.getElementById('env-vars-widget'));
  },
  setInitialState: function () {
    this.setState({
        hostname:    this.props.defaultHostname,
        sourceUrl:   this.props.storedSourceUrl,
        envVarItems: this.props.storedEnvVarItems
      });
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.hostnameWidget.setState({
        enabled: true,
        value:   this.state.hostname
      });
    this.sourceWidget.setState({
        enabled: true,
        value:   this.state.sourceUrl
      });
    this.envVarItemsWidget.setState({
        enabled: true,
        items:   this.state.envVarItems
      });
    if ('hostname' in state) {
      this.digitalOceanControl.changeHostname(state.hostname);
    }
    if ('sourceUrl' in state) {
      this.digitalOceanControl.changeSourceUrl(state.sourceUrl);
      this.gitHubControl.changeSourceUrl(state.sourceUrl);
    }
    if ('envVarItems' in state) {
      var envVars = {};
      (state.envVarItems || []).forEach(function (item) {
          if (item.name && item.name.length && item.value && item.value.length) {
            envVars[item.name] = item.value;
          }
        });
      this.digitalOceanControl.changeEnvVars(envVars);
      this.gitHubControl.changeEnvVars(envVars);
    }
  },
  start: function () {
    this.digitalOceanControl.start();
    this.gitHubControl.start();
  },
  unsetDigitalOceanToken: function () {
    utils.store('digitalocean-token', undefined);
  },
  unsetGitHubToken: function () {
    utils.store('github-token', undefined);
  },
  setSize: function (size) {
    utils.store('deploy-size-slug', size && size.slug);
  },
  setImage: function (image) {
    utils.store('deploy-image-slug', image && image.slug);
  },
  setRegion: function (region) {
    utils.store('deploy-region-slug', region && region.slug);
  },
  setKeys: function (keys) {
    utils.storeJson('deploy-key-ids', keys && keys.map(function (key) {
        return key.id;
      }));
  },
  changeHostname: function (hostname) {
    var validHostname = hostname.replace(/[^a-z0-9\-]/g, '');
    this.setState({
        hostname: validHostname
      });
  },
  changeSourceUrl: function (sourceUrl) {
    this.setState({
        sourceUrl:  sourceUrl,
      });
    this.updateEnvVarItems();
    utils.store('deploy-source-url', sourceUrl);
  },
  changeSourceInfo: function (sourceInfo) {
    this.updateEnvVarItems(sourceInfo);
  },
  changeEnvVarItems: function (envVarItems) {
    this.setState({
        envVarItems: envVarItems
      });
    utils.storeJson('deploy-env-var-items', envVarItems);
  },
  updateEnvVarItems: function (sourceInfo) {
    var envVarItems   = [];
    var originalItems = {};
    if (sourceInfo && sourceInfo.env) {
      Object.keys(sourceInfo.env).forEach(function (name) {
          if (name === 'BUILDPACK_URL') {
            return;
          }
          var value = sourceInfo.env[name];
          var originalItem = {
            original: true,
            name:     name
          };
          if (typeof value === 'string') {
            originalItem.required = true;
            originalItem.value    = value;
          } else {
            originalItem.required = value.required !== false;
            originalItem.value    = value.value;
          }
          originalItems[name] = originalItem;
          envVarItems.push(originalItem);
        }.bind(this));
    }
    (this.state.envVarItems || []).forEach(function (item) {
        if (item.original) {
          return;
        }
        var originalItem = originalItems[item.name];
        if (originalItem && !originalItem.value) {
          delete originalItem.original;
          originalItem.value = item.value;
        } else {
          if (item.required) {
            envVarItems.push({
                name:  item.name,
                value: item.value
              });
          } else {
            envVarItems.push(item);
          }
        }
      });
    this.changeEnvVarItems(envVarItems);
  }
};


exports.start = function () {
  if (GitHub.parseRepoUrl(document.referrer)) {
    utils.store('deploy-source-url', document.referrer);
  }
  var query = http.parseQueryString(location.search);
  if (query) {
    if (query['access_token']) {
      if (query.vendor === 'digitalocean') {
        utils.store('digitalocean-token', query['access_token']);
      } else if (query['vendor'] === 'github') {
        utils.store('github-token', query['access_token']);
      }
    }
    if (query['url']) {
      utils.store('deploy-source-url', query['url']);
    }
  }
  window.control = new Control({
      digitalOceanClientId:     '2530da1c8b65fd7e627f9ba234db0cfddae44c2ddf7e603648301f043318cac4',
      digitalOceanCallbackUrl:  'https://halcyon-digitalocean-callback.herokuapp.com/callback',
      digitalOceanReferralCode: '6b1199e29661',
      digitalOceanToken:        utils.load('digitalocean-token'),
      defaultHostname:          utils.getRandomHostname(),
      gitHubClientId:           '2765f53aa92837f0a835',
      gitHubToken:              utils.load('github-token'),
      storedSizeSlug:           utils.load('deploy-size-slug'),
      storedImageSlug:          utils.load('deploy-image-slug'),
      storedRegionSlug:         utils.load('deploy-region-slug'),
      storedKeyIds:             utils.loadJson('deploy-key-ids'),
      storedSourceUrl:          utils.load('deploy-source-url'),
      storedEnvVarItems:        utils.loadJson('deploy-env-var-items')
    });
  window.control.start();
};
