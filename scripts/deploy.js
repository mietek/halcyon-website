'use strict';

var DigitalOceanDeploy = require('deploy-digitalocean');
var GitHubDeploy = require('deploy-github');
var GitHub = require('github');
var http = require('http');
var utils = require('utils');


var Control = function (props) {
  this.props = this.getDefaultProps();
  utils.update(this.props, props);
  this.makeControls();
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
      storedEnvVarItems:        undefined
    };
  },
  makeControls: function () {
    this.digitalOceanControl = new DigitalOceanDeploy.Control({
        clientId:            this.props.digitalOceanClientId,
        callbackUrl:         this.props.digitalOceanCallbackUrl,
        referralCode:        this.props.digitalOceanReferralCode,
        storedToken:         this.props.digitalOceanToken,
        defaultHostname:     this.props.defaultHostname,
        storedSizeSlug:      this.props.storedSizeSlug,
        storedImageSlug:     this.props.storedImageSlug,
        storedRegionSlug:    this.props.storedRegionSlug,
        storedKeyIds:        this.props.storedKeyIds,
        onForgetAccount:     this.forgetDigitalOceanToken.bind(this),
        onSelectSize:        this.selectSize.bind(this),
        onSelectImage:       this.selectImage.bind(this),
        onSelectRegion:      this.selectRegion.bind(this),
        onSelectKeys:        this.selectKeys.bind(this)
      });
    this.gitHubControl = new GitHubDeploy.Control({
        clientId:            this.props.gitHubClientId,
        storedToken:         this.props.gitHubToken,
        storedSourceUrl:     this.props.storedSourceUrl,
        storedEnvVarItems:   this.props.storedEnvVarItems,
        onForgetAccount:     this.forgetGitHubToken.bind(this),
        onChangeSourceUrl:   this.changeSourceUrl.bind(this),
        onChangeEnvVarItems: this.changeEnvVarItems.bind(this)
      });
  },
  start: function () {
    this.digitalOceanControl.start();
    this.gitHubControl.start();
  },
  forgetDigitalOceanToken: function () {
    utils.store('digitalocean-token', undefined);
  },
  forgetGitHubToken: function () {
    utils.store('github-token', undefined);
  },
  selectSize: function (size) {
    utils.store('deploy-size-slug', size && size.slug);
  },
  selectImage: function (image) {
    utils.store('deploy-image-slug', image && image.slug);
  },
  selectRegion: function (region) {
    utils.store('deploy-region-slug', region && region.slug);
  },
  selectKeys: function (keys) {
    utils.storeJson('deploy-key-ids', keys && keys.map(function (key) {
        return key.id;
      }));
  },
  changeSourceUrl: function (sourceUrl) {
    this.digitalOceanControl.changeSourceUrl(sourceUrl);
    utils.store('deploy-source-url', sourceUrl);
  },
  changeEnvVarItems: function (envVarItems) {
    var envVars = {};
    (envVarItems || []).forEach(function (item) {
        if (item.name && item.name.length && item.value && item.value.length) {
          envVars[item.name] = item.value;
        }
      });
    this.digitalOceanControl.changeEnvVars(envVars);
    utils.storeJson('deploy-env-var-items', envVarItems);
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
