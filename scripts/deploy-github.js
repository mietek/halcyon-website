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
      envVars:      undefined
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
      clientId:           undefined,
      storedToken:        undefined,
      onForgetAccount:    undefined,
      onChangeSourceInfo: undefined
    };
  },
  makeWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          onConnect:    this.connectAccount.bind(this),
          onForget:     this.forgetAccount.bind(this)
        }),
      document.getElementById('github-account-widget'));
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
        sourceUrl:    undefined,
        sourceInfo:   undefined,
        sourceError:  undefined,
        envVars:      undefined
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
    this.sourceLegend.setState({
        sourceUrl:    this.state.sourceUrl,
        sourceInfo:   this.state.sourceInfo,
        sourceError:  this.state.sourceError,
        envVars:      this.state.envVars
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
        this.props.onChangeSourceInfo(sourceInfo);
      }.bind(this),
      this.state.token);
  },
  changeSourceUrl: function (sourceUrl) {
    this.setState({
        sourceUrl:   sourceUrl,
        sourceInfo:  undefined,
        sourceError: undefined
      });
    this.props.onChangeSourceInfo();
    this.debouncedLoadSourceInfo();
  },
  changeEnvVars: function (envVars) {
    this.setState({
        envVars: envVars
      });
  }
};
exports.Control.prototype.debouncedLoadSourceInfo = utils.debounce(exports.Control.prototype.loadSourceInfo, 500);
