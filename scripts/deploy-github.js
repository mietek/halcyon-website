'use strict';

var GitHub = require('github');
var React = require('react');
var utils = require('utils');
var widgets = require('widgets');


var SourceWidget = React.createClass({
  displayName: 'SourceWidget',
  getDefaultProps: function () {
    return {
      onChange:  undefined,
      onConnect: undefined
    };
  },
  getInitialState: function () {
    return {
      noAccount:    false,
      sourceUrl:    undefined,
      sourceInfo:   undefined,
      sourceError:  undefined
    };
  },
  connect: function (event) {
    event.preventDefault();
    this.props.onConnect();
  },
  render: function () {
    var extraMsg;
    var info = this.state.sourceInfo;
    var err  = this.state.sourceError;
    if (err) {
      if (typeof err === 'object' && err[0] === 'client_error') {
        if (err[1] === 403 && this.state.noAccount) {
          extraMsg = React.createElement('p', {
              className: 'em'
            },
            'Please ',
            React.createElement('a', {
                href:    '',
                onClick: this.connect
              },
              'connect'),
            ' your GitHub account to avoid running into GitHub API rate limits.');
        } else if (err[1] === 404) {
          extraMsg = React.createElement('p', {
              className: 'em'
            },
            'Source information can only be loaded from an ',
            React.createElement('a', {
                href:   'https://devcenter.heroku.com/articles/app-json-schema',
                target: '_blank'
              },
              React.createElement('code', null, 'app.json')),
            ' file located at the root of the repository.  The app can still be deployed, as long as the URL is valid.');
        }
      } else if (err === 'no_url') {
        if (this.state.sourceUrl && this.state.sourceUrl.length) {
          extraMsg = React.createElement('p', {
              className: 'em'
            },
            'Source information can only be loaded from ',
            React.createElement('em', null, 'git'),
            ' repositories hosted on GitHub.  The app can still be deployed, as long as the URL is valid.');
        } else {
          info = {};
          err  = null;
          extraMsg = React.createElement('p', {
              className: 'em'
            },
            'Enter a ',
            React.createElement('em', null, 'git'),
            ' repository URL to continue.');
        }
      }
    }
    return (
      React.createElement('div', null,
        React.createElement('div', {
            className: 'flex',
          },
          React.createElement(widgets.InputField, {
              enabled:      true,
              type:         'url',
              placeholder:  'https://github.com/user/project',
              value:        this.state.sourceUrl,
              onChange:     this.props.onChange
            })),
        React.createElement(widgets.DynamicDisplay, {
            value:       info,
            loadingMsg:  'Loading source information…',
            error:       err,
            errorMsg:    'Failed to load source information.',
            noReloadMsg: true
          }),
        extraMsg));
  }
});


var SourceLegend = React.createClass({
  displayName: 'SourceLegend',
  getInitialState: function () {
    return {
      sourceInfo: undefined
    };
  },
  render: function () {
    var info = this.state.sourceInfo;
    if (!info) {
      return (
        React.createElement('div'));
    }
    return (
      React.createElement(widgets.LegendArea, null,
        React.createElement('div', {
            className: 'flex'
          },
          !info.logo ? null :
            React.createElement('a', {
                href:   info.website || info.repository,
                target: '_blank'
              },
              React.createElement('img', {
                  className: 'source-logo',
                  src:       info.logo
                })),
          React.createElement('div', {
              className: 'source-info'
            },
            React.createElement('p', null,
              React.createElement('a', {
                  href:   info.website || info.repository,
                  target: '_blank'
                },
                React.createElement('strong', null, info.name || 'unnamed'))),
            React.createElement('p', null, info.description || 'undescribed')))));
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
      storedCommand:       undefined,
      onForgetAccount:     undefined,
      onChangeSourceUrl:   undefined,
      onChangeEnvVarItems: undefined,
      onChangeCommand:     undefined
    };
  },
  makeWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          noExtraMsg:   true,
          onConnect:    this.connectAccount.bind(this),
          onForget:     this.forgetAccount.bind(this)
        }),
      document.getElementById('github-account-widget'));
    this.sourceWidget = React.render(
      React.createElement(SourceWidget, {
          onChange:     this.changeSourceUrl.bind(this)
        }),
      document.getElementById('source-widget'));
    this.envVarItemsWidget = React.render(
      React.createElement(widgets.MapWidget, {
          onChange:     this.changeEnvVarItems.bind(this)
        }),
      document.getElementById('env-vars-widget'));
    this.commandWidget = React.render(
      React.createElement(widgets.InputWidget, {
          placeholder:  'automatic',
          onChange:     this.changeCommand.bind(this)
        }),
      document.getElementById('command-widget'));
    this.sourceLegend = React.render(
      React.createElement(SourceLegend),
      document.getElementById('source-legend'));
  },
  setInitialState: function () {
    this.setState({
        token:        undefined,
        account:      undefined,
        accountError: undefined,
        sourceUrl:    undefined,
        sourceInfo:   undefined,
        sourceError:  undefined,
        envVarItems:  undefined,
        command:      undefined,
        commandError: undefined
      });
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.accountWidget.setState({
        enabled:      this.state.account || this.state.accountError,
        account:      this.state.account && this.state.account.login,
        accountError: this.state.accountError
      });
    this.sourceWidget.setState({
        noAccount:    !this.state.account && !this.state.accountError,
        sourceUrl:    this.state.sourceUrl,
        sourceInfo:   this.state.sourceInfo,
        sourceError:  this.state.sourceError
      });
    this.envVarItemsWidget.setState({
        enabled:      true,
        items:        this.state.envVarItems
      });
    this.commandWidget.setState({ // TODO: Improve error display.
        enabled:      true,
        value:        this.state.command
      });
    this.sourceLegend.setState({
        sourceInfo:   this.state.sourceInfo
      });
  },
  start: function () {
    this.setState({
        token: this.props.storedToken
      });
    this.changeSourceUrl(this.props.storedSourceUrl);
    this.changeEnvVarItems(this.props.storedEnvVarItems);
    this.changeCommand(this.props.storedCommand);
    this.loadAccount(function () {
        this.loadSourceInfo();
        this.loadCommand();
      }.bind(this));
  },
  connectAccount: function () {
    GitHub.requestToken(this.props.clientId);
  },
  forgetAccount: function () {
    this.setState({
        token:        undefined,
        account:      undefined,
        accountError: 'no_token',
        sourceInfo:   undefined,
        sourceError:  undefined
      });
    this.props.onForgetAccount();
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
  loadCommand: function () {
    GitHub.getRawFile(this.state.sourceUrl, 'Procfile',
      function (procfile, err) {
        this.changeCommand(utils.getCommandFromProcfile(procfile), err);
      }.bind(this),
      this.state.token);
  },
  changeSourceUrl: function (sourceUrl) {
    var validSourceUrl = (sourceUrl && sourceUrl.length) ? sourceUrl : undefined;
    this.setState({
        sourceUrl:   validSourceUrl,
        sourceInfo:  undefined,
        sourceError: undefined
      });
    this.props.onChangeSourceUrl(validSourceUrl);
    this.updateEnvVarItems();
    this.changeCommand();
    this.debouncedLoadSourceInfo();
    this.debouncedLoadCommand();
  },
  changeEnvVarItems: function (envVarItems) {
    var validEnvVarItems = (envVarItems && envVarItems.length) ? envVarItems : undefined;
    this.setState({
        envVarItems: validEnvVarItems
      });
    this.props.onChangeEnvVarItems(validEnvVarItems);
  },
  changeCommand: function (command, err) {
    var validCommand = (command && command.length) ? command : undefined;
    this.setState({
        command:    validCommand,
        commandErr: err
      });
    this.props.onChangeCommand(validCommand);
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
exports.Control.prototype.debouncedLoadCommand = utils.debounce(exports.Control.prototype.loadCommand, 500);
