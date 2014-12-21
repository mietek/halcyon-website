'use strict';

var http = require('http');


exports.addAuthHeader = function (token, opts) {
  return http.addAuthHeader(token ? 'Bearer ' + token : null, opts);
};


exports.addJsonHeader = function (opts) {
  return http.addHeader('Content-Type', 'application/json', opts);
};


exports.getJsonResource = function (url, yea, nay, token, opts) {
  http.getResource(url, function (resp) {
    var json = JSON.parse(resp);
    if (!json) {
      return nay('no_json');
    }
    return yea(json);
  }, nay, exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.postJsonResource = function (url, obj, yea, nay, token, opts) {
  exports.postResource(url, obj ? JSON.stringify(obj) : null, function (resp) {
    var json = JSON.parse(resp);
    if (!json) {
      return nay('no_json');
    }
    return yea(json);
  }, nay, exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.requestToken = function (clientId, callbackUrl, state) {
  location.href = http.addQueryToUrl({
    'client_id':     clientId,
    'redirect_uri':  callbackUrl,
    'response_type': 'code',
    'scope':         'read+write',
    'state':         state
  }, 'https://cloud.digitalocean.com/v1/oauth/authorize');
};


exports.revokeToken = function (yea, nay, token) {
  http.postResource(http.addQueryToUrl({
    'access_token': token
  }, 'https://cloud.digitalocean.com/v1/oauth/revoke'), null, yea, nay);
};


exports.getAccount = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/account', function (resp) {
    return yea(resp['account']);
  }, nay, token);
};


exports.getAccountKeys = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/account/keys', function (resp) {
    return yea(resp['ssh_keys']);
  }, nay, token);
};


exports.getRegions = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/regions', function (resp) {
    return yea(resp['regions']);
  }, nay, token);
};


exports.getImageWithSlug = function (slug, yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/images/' + slug, function (resp) {
    return yea(resp['image']);
  }, nay, token);
};
