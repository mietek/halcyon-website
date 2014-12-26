'use strict';

var React = require('react');
var http = require('http');
var utils = require('utils');
var widgets = require('widgets');


exports.parseRepoUrl = function (url) {
  if (!url) {
    return null;
  }
  var re = new RegExp('^http(?:s?)://github.com/([^/#]+)/([^/#]+?)(?:\\.git)?(?:/)?(?:#([^/#]+))?$');
  var result = url.match(re);
  if (!result) {
    return null;
  }
  return {
    user:   result[1],
    name:   result[2],
    branch: result[3] ? result[3] : 'master'
  };
};


exports.addPathToRepoUrl = function (url, path) {
  var repo = exports.parseRepoUrl(url);
  if (!repo) {
    return null;
  }
  return 'https://api.github.com/repos/' + repo.user + '/' + repo.name +
    '/contents' + (path ? '/' + path : '') + '?ref=' + repo.branch;
};


exports.addAuthHeader = function (token, opts) {
  return http.addAuthHeader(token ? 'token ' + token : null, opts);
};


exports.addJsonHeader = function (opts) {
  return http.addHeader('Accept', 'application/vnd.github.v3.json', opts);
};


exports.addRawHeader = function (opts) {
  return http.addHeader('Accept', 'application/vnd.github.v3.raw+json', opts);
};


exports.getResource = function (url, yea, nay, token, opts) {
  http.getResource(url, yea, nay, exports.addAuthHeader(token, opts));
};


exports.getJsonResource = function (url, yea, nay, token, opts) {
  exports.getResource(url, function (resp) {
      var json = JSON.parse(resp);
      if (!json) {
        return nay('bad_response');
      }
      return yea(json);
    },
    nay, token, exports.addJsonHeader(opts));
};


exports.getRawResource = function (url, yea, nay, token, opts) {
  exports.getResource(url, yea, nay, token, exports.addRawHeader(opts));
};


exports.requestToken = function (clientId, state) {
  location.href = http.addQueryToUrl({
      'client_id': clientId,
      'scope':     '',
      'state':     state
    },
    'https://github.com/login/oauth/authorize');
};


exports.getAuthenticatedUser = function (yea, nay, token) {
  if (!token) {
    return nay('no_token');
  }
  exports.getJsonResource('https://api.github.com/user', yea, nay, token);
};


exports.listRepoRoot = function (url, yea, nay, token) {
  exports.getJsonResource(exports.addPathToRepoUrl(url), function (resp) {
      var result = [];
      resp.forEach(function (file) {
          if (!file.name) {
            return nay('bad_response');
          }
          result.push(file.name);
        });
      return yea(result);
    },
    nay, token);
};


exports.getRawFile = function (url, path, yea, nay, token) {
  exports.getRawResource(exports.addPathToRepoUrl(url, path), yea, nay, token);
};


exports.getJsonFile = function (url, path, yea, nay, token) {
  exports.getRawResource(exports.addPathToRepoUrl(url, path), function (resp) {
      var json = JSON.parse(resp);
      if (!json) {
        return nay('bad_response');
      }
      return yea(json);
    },
    nay, token);
};


var SourceLegend = React.createClass({
  displayName: 'SourceLegend',
  getDefaultProps: function () {
    return {
      onConnect: null
    };
  },
  getInitialState: function () {
    return {
      account:        null,
      accountPending: false,
      accountError:   null,
      sourceInfo:     null,
      sourceError:    null
    };
  },
  handleConnect: function (event) {
    event.preventDefault();
    this.props.onConnect();
  },
  render: function () {
    // TODO: Rewrite this.
    var info = this.state.sourceInfo;
    if (!info) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            'Enter a ',
            React.createElement('em', null, 'git'),
            ' URL to continue.'),
          React.createElement('p', null,
            'For applications hosted on GitHub, the environment variables required for configuration can be determined from an ',
            React.createElement('a', {
                href: 'https://devcenter.heroku.com/articles/app-json-schema'
              },
              React.createElement('code', null, 'app.json')),
            ' file included in the repository.'),
          this.state.account ? null : React.createElement('p', null,
            React.createElement('a', {
                href: '',
                onClick: this.handleConnect
              },
              'Connect'),
            ' your GitHub account to avoid running into GitHub API rate limits.')));
    }
    return (
      React.createElement(widgets.LegendArea, null,
        React.createElement('div', {
            className: 'flex'
          },
          info.logo ? React.createElement('a', {
              href: info.website || info.repository
            },
            React.createElement('img', {
                className: 'source-logo',
                src:       info.logo
              })) : null,
          React.createElement('div', {
              className: 'shrink'
            },
            React.createElement('p', null,
              React.createElement('a', {
                  href: info.website || info.repository
                },
                React.createElement('strong', null, info.name || 'unnamed'))),
            React.createElement('p', null, info.description || 'undescribed')))));
  }
});


// TODO: env vars need to live here!!!

exports.GitHubDeployControl = function (props) {
  this.props = this.getDefaultProps();
  this.state = this.getInitialState();
  Object.keys(props || {}).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.createWidgets();
};
exports.GitHubDeployControl.prototype = {
  getDefaultProps: function () {
    return {
      clientId:  null,
      token:     null,
      sourceUrl: null
    };
  },
  getInitialState: function () {
    return {
      token:          null,
      account:        null,
      accountPending: false,
      accountError:   null,
      sourceInfo:     null,
      sourceError:    null,
      sourceUrl:      null
    };
  },
  createWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          onConnect:   this.handleConnect.bind(this),
          onForget:    this.handleForget.bind(this)
        }),
      document.getElementById('github-account-widget'));
    this.sourceLegend = React.render(
      React.createElement(SourceLegend, {
          onConnect:   this.handleConnect.bind(this)
        }),
      document.getElementById('source-legend'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.accountWidget.setState({
        enabled:        !this.state.accountPending,
        account:        this.state.account && this.state.account.login
      });
    this.sourceLegend.setState({
        account:        this.state.account,
        accountPending: this.state.accountPending,
        accountError:   this.state.accountError,
        sourceInfo:     this.state.sourceInfo,
        sourceError:    this.state.sourceError
      });
  },
  loadData: function () {
    this.state.accountPending = true;
    this.loadAccount(function () {
        this.state.accountPending = false;
        this.renderWidgets();
        this.loadSourceInfo(function () {
            this.updateEnvVars();
            this.renderWidgets();
          }.bind(this));
      }.bind(this));
  },
  loadAccount: function (next) {
    exports.getAuthenticatedUser(function (account) {
        this.state.account = account;
        return next();
      }.bind(this),
      function (error) {
        this.state.account      = null;
        this.state.accountError = error;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  loadSourceInfo: function (next) {
    var sourceUrl = this.storage.get('source_url');
    exports.getJsonFile(sourceUrl, 'app.json', function (sourceInfo) {
        this.state.sourceInfo = sourceInfo;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load source info:', err);
        this.state.sourceInfo = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  handleConnect: function () {
    this.storage.unset('token');
    this.state.linkable = false;
    this.state.account  = null;
    this.renderWidgets();
    exports.requestToken(this.props.clientId);
  },
  handleForget: function () {
    this.storage.unset('token');
    this.state.linkable = true;
    this.state.account  = null;
    this.renderWidgets();
  },
  handleChangeSourceUrl: function (sourceUrl) {
    this.storage.set('source_url', sourceUrl.length ? sourceUrl : null);
    this.state.sourceInfo = null;
    this.handleDebounceSourceUrl();
    this.updateVars();
    this.renderWidgets();
  },
  handleDebounceSourceUrl: utils.debounce(function () {
      this.loadSourceInfo(function () {
          this.updateVars();
          this.updateReady();
          this.renderWidgets();
        }.bind(this));
    },
    1000),
  handleChangeVars: function (vars) {
    this.storage.set('vars', vars);
    this.renderWidgets();
  },
  updateVars: function () {
    var info         = this.state.sourceInfo;
    var storedVars   = this.storage.get('vars');
    var vars         = [];
    var importedVars = {};
    if (info && info.env) {
      Object.keys(info.env).forEach(function (name) {
          if (name === 'BUILDPACK_URL') {
            return;
          }
          var value = info.env[name];
          var importedItem = {
            imported: true,
            name:     name
          };
          if (typeof value === 'string') {
            importedItem.required = true;
            importedItem.value    = value.length ? value : null;
          } else {
            importedItem.required = value.required !== false;
            importedItem.value    = value.value.length ? value.value : null;
          }
          importedVars[name] = importedItem;
          vars.push(importedItem);
        }.bind(this));
    }
    if (storedVars) {
      storedVars.forEach(function (item) {
          if (item.imported) {
            return;
          }
          var importedItem = importedVars[item.name];
          if (importedItem && !importedItem.value) {
            delete importedItem.imported;
            importedItem.value = item.value;
          } else {
            if (item.required) {
              vars.push({
                  name:  item.name,
                  value: item.value
                });
            } else {
              vars.push(item);
            }
          }
        });
    }
    this.storage.set('vars', vars.length ? vars : null);
  },
  updateReady: function () {
    if (this.storage.get('source_url')) {
      this.props.onReady();
    } else {
      this.props.onUnready();
    }
  },
  getSourceUrl: function () {
    return this.storage.get('source_url');
  }
};
