'use strict';

var GitHub = require('github');
var React = require('react');
var utils = require('utils');
var widgets = require('widgets');


var SourceLegend = React.createClass({
  displayName: 'SourceLegend',
  getDefaultProps: function () {
    return {
      onConnect: undefined
    };
  },
  getInitialState: function () {
    return {
      account:      undefined,
      accountError: undefined,
      sourceUrl:    undefined,
      sourceInfo:   undefined,
      sourceError:  undefined,
      envVarItems:  undefined
    };
  },
  connect: function (event) {
    event.preventDefault();
    this.props.onConnect();
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


exports.Control = function (props) {
  this.props = this.getDefaultProps();
  utils.update(this.props, props);
  this.makeWidgets();
  this.state = {};
  this.setInitialState();
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      clientId:            undefined,
      storedToken:         undefined,
      storedSourceUrl:     undefined,
      storedEnvVarItems:   undefined,
      onForgetAccount:     undefined,
      onChangeSourceUrl:   undefined,
      onChangeEnvVarItems: undefined
    };
  },
  makeWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          onConnect:    this.connectAccount.bind(this),
          onForget:     this.forgetAccount.bind(this)
        }),
      document.getElementById('github-account-widget'));
    this.sourceWidget = React.render(
      React.createElement(widgets.InputWidget, {
          type:         'url',
          placeholder:  'https://github.com/user/project',
          onChange:     this.changeSourceUrl.bind(this)
        }),
      document.getElementById('source-widget'));
    this.envVarItemsWidget = React.render(
      React.createElement(widgets.MapWidget, {
          onChange:     this.changeEnvVarItems.bind(this)
        }),
      document.getElementById('env-vars-widget'));
    this.sourceLegend = React.render(
      React.createElement(SourceLegend, {
          onConnect:    this.connectAccount.bind(this)
        }),
      document.getElementById('github-legend'));
  },
  setInitialState: function () {
    this.setState({
        token:        this.props.storedToken,
        account:      undefined,
        accountError: undefined,
        sourceUrl:    this.props.storedSourceUrl,
        sourceInfo:   undefined,
        sourceError:  undefined,
        envVarItems:  this.props.storedEnvVarItems
      });
  },
  forgetAccount: function () {
    this.setState({
        token:        undefined,
        account:      undefined,
        accountError: undefined,
        sourceInfo:   undefined,
        sourceError:  undefined
      });
    this.props.onForgetAccount();
  },
  connectAccount: function () {
    GitHub.requestToken(this.props.clientId);
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.accountWidget.setState({
        enabled:      !!this.state.account,
        account:      this.state.account && this.state.account.login,
        accountError: this.state.accountError
      });
    this.sourceWidget.setState({
        enabled:      true,
        value:        this.state.sourceUrl
      });
    this.envVarItemsWidget.setState({
        enabled:      true,
        items:        this.state.envVarItems
      });
    this.sourceLegend.setState({
        sourceUrl:    this.state.sourceUrl,
        sourceInfo:   this.state.sourceInfo,
        sourceError:  this.state.sourceError,
        envVarItems:  this.state.envVarItems
      });
  },
  start: function () {
    this.loadAccount(function () {
        this.loadSourceInfo();
      }.bind(this));
  },
  loadAccount: function (next) {
    GitHub.getAuthenticatedUser(function (account, err) {
        this.setState({
            account:      account,
            accountError: err
          });
        return next();
      }.bind(this),
      this.state.token);
  },
  loadSourceInfo: function () {
    GitHub.getJsonFile(this.state.sourceUrl, 'app.json',
      function (sourceInfo, err) {
        this.setState({
            sourceInfo:  sourceInfo,
            sourceError: err
          });
        this.updateEnvVarItems();
      }.bind(this),
      this.state.token);
  },
  changeSourceUrl: function (sourceUrl) {
    this.setState({
        sourceUrl:   sourceUrl,
        sourceInfo:  undefined,
        sourceError: undefined
      });
    this.props.onChangeSourceUrl(sourceUrl);
    this.updateEnvVarItems();
    this.debouncedLoadSourceInfo();
  },
  changeEnvVarItems: function (envVarItems) {
    this.setState({
        envVarItems: envVarItems
      });
    this.props.onChangeEnvVarItems(envVarItems);
  },
  updateEnvVarItems: function () {
    var envVarItems   = [];
    var originalItems = {};
    if (this.state.sourceInfo && this.state.sourceInfo.env) {
      Object.keys(this.state.sourceInfo.env).forEach(function (name) {
          if (name === 'BUILDPACK_URL') {
            return;
          }
          var value = this.state.sourceInfo.env[name];
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
exports.Control.prototype.debouncedLoadSourceInfo = utils.debounce(exports.Control.prototype.loadSourceInfo, 500);
