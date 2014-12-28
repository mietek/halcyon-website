'use strict';

var http = require('http');


exports.addAuthHeader = function (token, opts) {
  return http.addAuthHeader(token ? 'Bearer ' + token : null, opts);
};


exports.addJsonHeader = function (opts) {
  return http.addHeader('Content-Type', 'application/json', opts);
};


exports.getJsonResource = function (url, next, token, opts) {
  if (!token) {
    return next(null, 'no_token');
  }
  return http.getResource(url,
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var json = JSON.parse(resp);
      if (!json) {
        return next(null, 'bad_response');
      }
      return next(json);
    },
    exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.postJsonResource = function (url, obj, next, token, opts) {
  if (!token) {
    return next(null, 'no_token');
  }
  return http.postResource(url, obj ? JSON.stringify(obj) : null,
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var json = JSON.parse(resp);
      if (!json) {
        return next(null, 'bad_response');
      }
      return next(json);
    },
    exports.addAuthHeader(token, exports.addJsonHeader(opts)));
};


exports.deleteResource = function (url, next, token, opts) {
  if (!token) {
    return next(null, 'no_token');
  }
  return http.deleteResource(url, next, exports.addAuthHeader(token, exports.addJsonHeader(opts)));
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


exports.revokeToken = function (next, token) {
  return http.postResource(http.addQueryToUrl({
      'access_token': token
    },
    'https://cloud.digitalocean.com/v1/oauth/revoke'), null, next);
};


exports.getAccount = function (next, token) {
  return exports.getJsonResource('https://api.digitalocean.com/v2/account',
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var account = resp['account'];
      if (!account) {
        return next(null, 'bad_response');
      }
      return next(account);
    },
    token);
};


exports.getSizes = function (next, token) {
  return exports.getJsonResource('https://api.digitalocean.com/v2/sizes',
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var sizes = resp['sizes'];
      if (!sizes) {
        return next(null, 'bad_response');
      }
      sizes.sort(function (size1, size2) {
          return size1['price_monthly'] - size2['price_monthly'];
        });
      return next(sizes.map(function (size) {
          size.supported = true;
          return size;
        }));
    },
    token);
};


exports.getDistributionImages = function (next, token) {
  var potentiallySupportedSlugs = ['centos-7-0-x64', 'ubuntu-14-04-x64'];
  var supportedSlugs            = ['ubuntu-14-04-x64']; // TODO: Support CentOS 7.
  return exports.getJsonResource('https://api.digitalocean.com/v2/images?type=distribution',
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var images = resp['images'];
      if (!images) {
        return next(null, 'bad_response');
      }
      images.sort(function (image1, image2) {
          var title1 = image1.distribution + ' ' + image1.name;
          var title2 = image2.distribution + ' ' + image2.name;
          return title1.localeCompare(title2);
        });
      return next(images.filter(function (image) {
          return potentiallySupportedSlugs.indexOf(image.slug) !== -1;
        })
        .map(function (image) {
          image.supported = supportedSlugs.indexOf(image.slug) !== -1;
          return image;
        }));
    },
    token);
};


exports.getRegions = function (next, token) {
  return exports.getJsonResource('https://api.digitalocean.com/v2/regions',
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var regions = resp['regions'];
      if (!regions) {
        return next(null, 'bad_response');
      }
      regions.sort(function (region1, region2) {
          return region1.name.localeCompare(region2.name);
        });
      return next(regions.map(function (region) {
          region.supported = region.available && region.features.indexOf('metadata') !== -1;
          return region;
        }));
    },
    token);
};


exports.getAccountKeys = function (next, token) {
  return exports.getJsonResource('https://api.digitalocean.com/v2/account/keys',
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var keys = resp['ssh_keys'];
      if (!keys) {
        return next(null, 'bad_response');
      }
      keys.sort(function (key1, key2) {
          return key1.name.localeCompare(key2.name);
        });
      return next(keys);
    },
    token);
};


exports.createDroplet = function (hostname, sizeSlug, imageSlug, regionSlug, keyIds, userData, next, token) {
  return exports.postJsonResource('https://api.digitalocean.com/v2/droplets', {
      'name':               hostname,
      'size':               sizeSlug,
      'image':              imageSlug,
      'region':             regionSlug,
      'ssh_keys':           keyIds,
      'backups':            false, // TODO: Support extra options.
      'ipv6':               false,
      'private_networking': false,
      'user_data':          userData
    },
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var droplet = resp['droplet'];
      if (!droplet) {
        return next(null, 'bad_response');
      }
      return next(droplet);
    },
    token);
};


exports.destroyDroplet = function (dropletId, next, token) {
  return exports.deleteResource('https://api.digitalocean.com/v2/droplets/' + dropletId, next, token);
};


exports.getDroplets = function (next, token) {
  return exports.getJsonResource('https://api.digitalocean.com/v2/droplets',
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var droplets = resp['droplets'];
      if (!droplets) {
        return next(null, 'bad_response');
      }
      droplets.sort(function (droplet1, droplet2) {
          return droplet1.name.localeCompare(droplet2.name);
        });
      return next(droplets.map(function (droplet) {
          if (droplet.networks && droplet.networks.v4 && droplet.networks.v4[0]) {
            droplet.ipAddress = droplet.networks.v4[0]['ip_address'];
          }
          return droplet;
        }));
    },
    token);
};


exports.getDroplet = function (dropletId, next, token) {
  return exports.getJsonResource('https://api.digitalocean.com/v2/droplets/' + dropletId,
    function (resp, err) {
      if (err) {
        return next(null, err);
      }
      var droplet = resp['droplet'];
      if (!droplet) {
        return next(null, 'bad_response');
      }
      if (droplet.networks && droplet.networks.v4 && droplet.networks.v4[0]) {
        droplet.ipAddress = droplet.networks.v4[0]['ip_address'];
      }
      return next(droplet);
    },
    token);
};
