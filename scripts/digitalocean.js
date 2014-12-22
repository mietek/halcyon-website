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
    var account = resp['account'];
    return account ? yea(account) : nay('bad_response');
  }, nay, token);
};


exports.getAccountKeys = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/account/keys', function (resp) {
    var keys = resp['ssh_keys'];
    return keys ? yea(keys) : nay('bad_response');
  }, nay, token);
};


exports.getSizes = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/sizes', function (resp) {
    var sizes = resp['sizes'];
    if (!sizes) {
      return nay('bad_response');
    }
    sizes.sort(function (size1, size2) {
      return size1['price_monthly'] - size2['price_monthly'];
    });
    return yea(sizes);
  }, nay, token);
};


exports.getRegions = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/regions', function (resp) {
    var regions = resp['regions'];
    if (!regions) {
      return nay('bad_response');
    }
    regions.sort(function (region1, region2) {
      return region1.name.localeCompare(region2.name);
    });
    return yea(regions);
  }, nay, token);
};


exports.getImageWithSlug = function (slug, yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/images/' + slug, function (resp) {
    var image = resp['image'];
    return image ? yea(image) : nay('bad_response');
  }, nay, token);
};
