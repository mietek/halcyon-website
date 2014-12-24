'use strict';

var http = require('http');


exports.addAuthHeader = function (token, opts) {
  return http.addAuthHeader(token ? 'Bearer ' + token : null, opts);
};


exports.addJsonHeader = function (opts) {
  return http.addHeader('Content-Type', 'application/json', opts);
};


exports.getJsonResource = function (url, yea, nay, token, opts) {
  if (!token) {
    return nay('no_token');
  }
  http.getResource(url, function (resp) {
      var json = JSON.parse(resp);
      if (!json) {
        return nay('bad_response');
      }
      return yea(json);
    },
    nay, exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.postJsonResource = function (url, obj, yea, nay, token, opts) {
  if (!token) {
    return nay('no_token');
  }
  exports.postResource(url, obj ? JSON.stringify(obj) : null, function (resp) {
      var json = JSON.parse(resp);
      if (!json) {
        return nay('bad_response');
      }
      return yea(json);
    },
    nay, exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.deleteResource = function (url, yea, nay, token, opts) {
  if (!token) {
    return nay('no_token');
  }
  exports.deleteResource(url, yea, nay,
    exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.requestToken = function (clientId, callbackUrl, state) {
  location.href = http.addQueryToUrl({
      'client_id':     clientId,
      'redirect_uri':  callbackUrl,
      'response_type': 'code',
      'scope':         'read+write',
      'state':         state
    },
    'https://cloud.digitalocean.com/v1/oauth/authorize');
};


exports.revokeToken = function (yea, nay, token) {
  http.postResource(http.addQueryToUrl({
      'access_token': token
    },
    'https://cloud.digitalocean.com/v1/oauth/revoke'), null, yea, nay);
};


exports.getAccount = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/account', function (resp) {
      var account = resp['account'];
      return account ? yea(account) : nay('bad_response');
    },
    nay, token);
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
    },
    nay, token);
};


exports.getDistributionImages = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/images?type=distribution', function (resp) {
      var images = resp['images'];
      if (!images) {
        return nay('bad_response');
      }
      images.sort(function (image1, image2) {
          var title1 = image1.distribution + ' ' + image1.name;
          var title2 = image2.distribution + ' ' + image2.name;
          return title1.localeCompare(title2);
        });
      return yea(images);
    },
    nay, token);
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
    },
    nay, token);
};


exports.getAccountKeys = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/account/keys', function (resp) {
      var keys = resp['ssh_keys'];
      if (!keys) {
        return nay('bad_response');
      }
      keys.sort(function (key1, key2) {
          return key1.name.localeCompare(key2.name);
        });
      return yea(keys);
    },
    nay, token);
};


exports.createDroplet = function (hostname, sizeSlug, imageSlug, regionSlug, keyIds, yea, nay, token) {
  http.postJsonResource('https://api.digitalocean.com/v2/droplets', {
      'name':               hostname,
      'size':               sizeSlug,
      'image':              imageSlug,
      'region':             regionSlug,
      'ssh_keys':           keyIds,
      'backups':            false, // TODO
      'ipv6':               false,
      'private_networking': false,
      'user_data':          null
    },
    function (resp) {
      var droplet = resp['droplet'];
      if (!droplet) {
        return nay('bad_response');
      }
      return yea(droplet);
    },
    nay, token);
};



