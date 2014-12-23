'use strict';

var http = require('http');


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
  return 'https://api.github.com/repos/' + repo.user + '/' + repo.name + '/contents' + (path ? '/' + path : '') + '?ref=' + repo.branch;
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
  }, nay, token, exports.addJsonHeader(opts));
};


exports.getRawResource = function (url, yea, nay, token, opts) {
  exports.getResource(url, yea, nay, token, exports.addRawHeader(opts));
};


exports.requestToken = function (clientId, state) {
  location.href = http.addQueryToUrl({
    'client_id': clientId,
    'scope':     '',
    'state':     state
  }, 'https://github.com/login/oauth/authorize');
};


exports.getAuthenticatedUser = function (yea, nay, token) {
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
  }, nay, token);
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
  }, nay, token);
};
