'use strict';

var React = require('react');
var http = require('http');
var storage = require('storage');
var widgets = require('widgets');


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
  http.postResource(url, obj ? JSON.stringify(obj) : null,
    function (resp) {
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
  exports.getJsonResource('https://api.digitalocean.com/v2/account',
    function (resp) {
      var account = resp['account'];
      return account ? yea(account) : nay('bad_response');
    },
    nay, token);
};


exports.getSizes = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/sizes',
    function (resp) {
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
  exports.getJsonResource('https://api.digitalocean.com/v2/images?type=distribution',
    function (resp) {
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
  exports.getJsonResource('https://api.digitalocean.com/v2/regions',
    function (resp) {
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
  exports.getJsonResource('https://api.digitalocean.com/v2/account/keys',
    function (resp) {
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


exports.createDroplet = function (hostname, sizeSlug, imageSlug, regionSlug, keyIds, sourceUrl, yea, nay, token) {
  exports.postJsonResource('https://api.digitalocean.com/v2/droplets', {
      'name':               hostname,
      'size':               sizeSlug,
      'image':              imageSlug,
      'region':             regionSlug,
      'ssh_keys':           keyIds,
      'backups':            false, // TODO: Support extra options.
      'ipv6':               false,
      'private_networking': false,
      'user_data':          null // TODO: Use sourceUrl.
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


exports.getDroplets = function (yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/droplets',
    function (resp) {
      var droplets = resp['droplets'];
      if (!droplets) {
        return nay('bad_response');
      }
      droplets.sort(function (droplet1, droplet2) {
          return droplet1.name.localeCompare(droplet2.name);
        });
      return yea(droplets);
    },
    nay, token);
};


exports.getDroplet = function (id, yea, nay, token) {
  exports.getJsonResource('https://api.digitalocean.com/v2/droplets/' + id,
    function (resp) {
      var droplet = resp['droplet'];
      if (!droplet) {
        return nay('bad_response');
      }
      return yea(droplet);
    },
    nay, token);
};


var SizeLegend = React.createClass({
  displayName: 'SizeLegend',
  getDefaultProps: function () {
    return {
      onLink: null
    };
  },
  getInitialState: function () {
    return {
      failed:       false,
      selectedSize: null
    };
  },
  handleLink: function (event) {
    event.preventDefault();
    this.props.onLink();
  },
  render: function () {
    if (this.state.failed) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            'Something went wrong.  ',
            React.createElement('a', {
                href: ''
              },
              'Refresh'),
            ' the page to continue.')));
    }
    var size = this.state.selectedSize;
    if (!size) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            React.createElement('a', {
                href: '',
                onClick: this.handleLink
              },
              'Connect'),
            ' your DigitalOcean account to continue.'),
          React.createElement('p', null,
            'If you need to sign up for a new account, you can help the Halcyon project and receive $10 credit from DigitalOcean by using a ',
            React.createElement('a', {
                href: 'https://cloud.digitalocean.com/registrations/new?refcode=6b1199e29661'
              },
              'referral link'),
            '.')));
    }
    var subtitle;
    if (size.memory < 1024) {
      subtitle = size.memory + ' MB RAM, ';
    } else {
      subtitle = size.memory / 1024 + ' GB RAM, ';
    }
    subtitle += size.vcpus + ' CPU' + (size.vcpus > 1 ? 's, ' : ', ') +
      size.disk + ' GB SSD disk, ' + size.transfer + ' TB transfer';
    return (
      React.createElement(widgets.LegendArea, null,
        React.createElement('p', null,
          React.createElement('a', {
              href: 'https://digitalocean.com/pricing/'
            },
            React.createElement('strong', null, '$' + size['price_monthly'] + '/month'),
            ' — $' + size['price_hourly'] + '/hour')),
        React.createElement('p', null, subtitle)));
  }
});


var SizeWidget = React.createClass({
  displayName: 'SizeWidget',
  getDefaultProps: function () {
    return {
      onSelectSize: null
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      sizes:        null,
      selectedSize: null
    };
  },
  render: function () {
    if (!this.state.sizes) {
      return React.createElement(widgets.RadioButton, {
          className: 'size-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var selectedSizeSlug = this.state.selectedSize ? this.state.selectedSize.slug : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.sizes.map(function (size) {
            var title = size.memory < 1024 ? size.memory + ' MB' : size.memory / 1024 + ' GB';
            return (
              React.createElement(widgets.RadioButton, {
                  key:       size.slug,
                  className: 'size-button',
                  enabled:   this.state.enabled,
                  selected:  size.slug === selectedSizeSlug,
                  title:     title,
                  onClick:   function () {
                    this.props.onSelectSize(size);
                  }.bind(this)
                })
            );
          }.bind(this))));
  }
});


var ImageWidget = React.createClass({
  displayName: 'ImageWidget',
  getDefaultProps: function () {
    return {
      onSelectImage: null
    };
  },
  getInitialState: function () {
    return {
      enabled:       false,
      images:        null,
      selectedImage: null
    };
  },
  render: function () {
    if (!this.state.images) {
      return React.createElement(widgets.RadioButton, {
          className: 'image-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var selectedImageSlug = this.state.selectedImage ? this.state.selectedImage.slug : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.images.map(function (image) {
            return (
              React.createElement(widgets.RadioButton, {
                  key:       image.slug,
                  className: 'image-button',
                  enabled:   this.state.enabled,
                  selected:  image.slug === selectedImageSlug,
                  title:     image.distribution + ' ' + image.name,
                  onClick:   function () {
                    this.props.onSelectImage(image);
                  }.bind(this)
                })
            );
          }.bind(this))));
  }
});


var RegionWidget = React.createClass({
  displayName: 'RegionWidget',
  getDefaultProps: function () {
    return {
      onSelectRegion: null
    };
  },
  getInitialState: function () {
    return {
      enabled:        false,
      selectedSize:   null,
      selectedImage:  null,
      regions:        null,
      selectedRegion: null
    };
  },
  render: function () {
    if (!this.state.regions) {
      return React.createElement(widgets.RadioButton, {
          className: 'region-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var availableRegionSlugsBySize  = this.state.selectedSize ? this.state.selectedSize.regions : [];
    var availableRegionSlugsByImage = this.state.selectedImage ? this.state.selectedImage.regions : [];
    var selectedRegionSlug          = this.state.selectedRegion ? this.state.selectedRegion.slug : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.regions.map(function (region) {
            var available = availableRegionSlugsBySize.indexOf(region.slug) !== -1 && availableRegionSlugsByImage.indexOf(region.slug);
            var metadata  = region.features.indexOf('metadata') !== -1;
            return (
              React.createElement(widgets.RadioButton, {
                  key:       region.slug,
                  className: 'region-button',
                  enabled:   region.available && this.state.enabled && available && metadata,
                  selected:  region.slug === selectedRegionSlug,
                  title:     region.name,
                  onClick:   function () {
                    this.props.onSelectRegion(region);
                  }.bind(this)
                })
            );
          }.bind(this))));
  }
});


var KeysWidget = React.createClass({
  displayName: 'KeysWidget',
  getDefaultProps: function () {
    return {
      onChange: null
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      keys:         null,
      selectedKeys: null
    };
  },
  handleSelectKey: function (selectedKey) {
    var changedSelectedKeys = [];
    if (this.state.selectedKeys) {
      this.state.selectedKeys.forEach(function (key) {
          changedSelectedKeys.push(key);
        });
    }
    changedSelectedKeys.push(selectedKey);
    this.props.onChange(changedSelectedKeys);
  },
  handleDeselectKey: function (deselectedKey) {
    var changedSelectedKeys = [];
    this.state.selectedKeys.forEach(function (key) {
        if (key.id !== deselectedKey.id) {
          changedSelectedKeys.push(key);
        }
      });
    this.props.onChange(changedSelectedKeys);
  },
  render: function () {
    if (!this.state.keys) {
      return React.createElement(widgets.RadioButton, {
          className: 'key-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var selectedKeyIds = this.state.selectedKeys ?
      this.state.selectedKeys.map(function (selectedKey) {
          return selectedKey.id;
        }) :
      [];
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.keys.map(function (key) {
            var selected = selectedKeyIds.indexOf(key.id) !== -1;
            return (
              React.createElement(widgets.RadioButton, {
                  key:       key.id,
                  className: 'key-button',
                  enabled:   this.state.enabled,
                  selected:  selected,
                  title:     key.name,
                  onClick:   function () {
                    if (selected) {
                      this.handleDeselectKey(key);
                    } else {
                      this.handleSelectKey(key);
                    }
                  }.bind(this)
                })
            );
          }.bind(this))));
  }
});


exports.DeployControl = function (props) {
  this.props = this.getDefaultProps();
  Object.keys(props).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.storage = new storage.CachedStorage(this.props.prefix);
  if (this.props.token) {
    this.storage.set('token', this.props.token);
  }
  if (this.props.defaultHostname) {
    this.storage.set('default_hostname', this.props.defaultHostname);
  }
  this.state = this.getInitialState();
  this.createWidgets();
};
exports.DeployControl.prototype = {
  getDefaultProps: function () {
    return {
      prefix:      'digitalocean',
      clientId:    null,
      callbackUrl: null,
      token:       null,
      onReady:     null,
      onUnready:   null
    };
  },
  getInitialState: function () {
    return {
      linkable:       false,
      failed:         false,
      account:        null,
      sizes:          null,
      selectedSize:   null,
      images:         null,
      selectedImage:  null,
      regions:        null,
      selectedRegion: null,
      keys:           null,
      selectedKeys:   null
    };
  },
  createWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          onLink:   this.handleLink.bind(this),
          onUnlink: this.handleUnlink.bind(this)
        }),
      document.getElementById('digitalocean-account-widget'));
    this.hostnameWidget = React.render(
      React.createElement(widgets.InputWidget, {
          placeholder: this.storage.get('default_hostname'),
          onChange:    this.handleChangeHostname.bind(this)
        }),
      document.getElementById('digitalocean-hostname-widget'));
    this.sizeWidget = React.render(
      React.createElement(SizeWidget, {
          onSelectSize: this.handleSelectSize.bind(this)
        }),
      document.getElementById('digitalocean-size-widget'));
    this.sizeLegend = React.render(
      React.createElement(SizeLegend, {
          onLink: this.handleLink.bind(this)
        }),
      document.getElementById('digitalocean-size-legend'));
    this.imageWidget = React.render(
      React.createElement(ImageWidget, {
          onSelectImage: this.handleSelectImage.bind(this)
        }),
      document.getElementById('digitalocean-image-widget'));
    this.regionWidget = React.render(
      React.createElement(RegionWidget, {
          onSelectRegion: this.handleSelectRegion.bind(this)
        }),
      document.getElementById('digitalocean-region-widget'));
    this.keysWidget = React.render(
      React.createElement(KeysWidget, {
          onChange: this.handleChangeSelectedKeys.bind(this)
        }),
      document.getElementById('digitalocean-keys-widget'));
    this.backgroundImage = React.render(
      React.createElement(widgets.BackgroundImage, {
          src: 'http://i.imgur.com/WZEf0tB.png'
        }),
      document.getElementById('background-image'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    var linkable = this.state.linkable;
    var failed   = this.state.failed;
    this.accountWidget.setState({
        enabled:        linkable,
        account:        this.state.account ? this.state.account.email : null
      });
    this.hostnameWidget.setState({
        enabled:        true,
        value:          this.storage.get('hostname')
      });
    this.sizeWidget.setState({
        enabled:        linkable && !failed,
        sizes:          this.state.sizes,
        selectedSize:   this.state.selectedSize
      });
    this.sizeLegend.setState({
        failed:         failed,
        selectedSize:   this.state.selectedSize
      });
    this.imageWidget.setState({
        enabled:        linkable && !failed,
        images:         this.state.images,
        selectedImage:  this.state.selectedImage
      });
    this.regionWidget.setState({
        enabled:        linkable && !failed,
        selectedSize:   this.state.selectedSize,
        selectedImage:  this.state.selectedImage,
        regions:        this.state.regions,
        selectedRegion: this.state.selectedRegion
      });
    this.keysWidget.setState({
        enabled:        linkable && !failed,
        keys:           this.state.keys,
        selectedKeys:   this.state.selectedKeys
      });
    this.backgroundImage.setState({
        visible:        this.storage.get('hostname') === 'tallest-leek-2014'
      });
  },
  loadData: function () {
    this.loadAccount(function () {
        this.loadSizes(function () {
            this.updateSelectedSize();
            this.loadImages(function () {
                this.updateSelectedImage();
                this.loadRegions(function () {
                    this.updateSelectedRegion();
                    this.loadKeys(function () {
                        this.updateSelectedKeys();
                        this.state.linkable = true;
                        this.updateReady();
                        this.renderWidgets();
                      }.bind(this));
                  }.bind(this));
              }.bind(this));
          }.bind(this));
      }.bind(this));
  },
  loadAccount: function (next) {
    exports.getAccount(function (account) {
        this.state.account = account;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load account:', err);
        this.state.failed  = true;
        this.state.account = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  loadSizes: function (next) {
    exports.getSizes(function (sizes) {
        this.state.sizes = sizes;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load sizes:', err);
        this.state.failed = true;
        this.state.sizes  = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  loadImages: function (next) {
    exports.getDistributionImages(function (images) {
        this.state.images = images.filter(function (image) {
            return image.slug === 'ubuntu-14-04-x64'; // TODO: Support CentOS 7.
          });
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load images:', err);
        this.state.failed = true;
        this.state.images = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  loadRegions: function (next) {
    exports.getRegions(function (regions) {
        this.state.regions = regions;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load regions:', err);
        this.state.failed  = true;
        this.state.regions = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  loadKeys: function (next) {
    exports.getAccountKeys(function (keys) {
        this.state.keys = keys;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load keys:', err);
        this.state.failed = true;
        this.state.keys   = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  createDroplet: function (sourceUrl, yea, nay) {
    exports.createDroplet(
      this.storage.get('hostname') || this.storage.get('default_hostname'),
      this.storage.get('selected_size_slug'),
      this.storage.get('selected_image_slug'),
      this.storage.get('selected_region_slug'),
      this.storage.get('selected_key_ids'),
      sourceUrl,
      function (droplet) {
        var createdDropletIds = this.storage.get('created_droplet_ids', []);
        createdDropletIds.push(droplet.id);
        this.storage.set('created_droplet_ids', createdDropletIds);
        this.storage.set('selected_droplet_id', droplet.id);
        return yea(droplet);
      }.bind(this),
      nay,
      this.storage.get('token'));
  },
  handleLink: function () {
    this.storage.unset('token');
    this.state = this.getInitialState();
    this.updateReady();
    this.renderWidgets();
    setTimeout(function () {
        exports.requestToken(this.props.clientId, this.props.callbackUrl);
      }.bind(this),
      1000);
  },
  handleUnlink: function () {
    this.storage.unset('token');
    this.state = this.getInitialState();
    this.state.linkable = true;
    this.updateReady();
    this.renderWidgets();
  },
  handleChangeHostname: function (hostname) {
    var validHostname = hostname.replace(/[^a-z0-9\-]/g, '');
    this.storage.set('hostname', validHostname.length ? validHostname : null);
    this.renderWidgets();
  },
  handleSelectSize: function (selectedSize) {
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize.slug);
    this.updateSelectedRegion();
    this.renderWidgets();
  },
  handleSelectImage: function (selectedImage) {
    this.state.selectedImage = selectedImage;
    this.storage.set('selected_image_slug', selectedImage.slug);
    this.updateSelectedRegion();
    this.renderWidgets();
  },
  handleSelectRegion: function (selectedRegion) {
    this.state.selectedRegion = selectedRegion;
    this.storage.set('selected_region_slug', selectedRegion.slug);
    this.renderWidgets();
  },
  handleChangeSelectedKeys: function (selectedKeys) {
    this.state.selectedKeys = selectedKeys;
    var selectedKeyIds = selectedKeys ?
      selectedKeys.map(function (selectedKey) {
          return selectedKey.id;
        }) :
      [];
    this.storage.set('selected_key_ids', selectedKeyIds.length ? selectedKeyIds : null);
    this.renderWidgets();
  },
  updateSelectedSize: function () {
    var sizes            = this.state.sizes;
    var selectedSizeSlug = this.storage.get('selected_size_slug');
    var selectedSize;
    if (sizes) {
      if (selectedSizeSlug) {
        for (var i = 0; i < sizes.length; i += 1) {
          if (sizes[i].slug === selectedSizeSlug) {
            selectedSize = sizes[i];
            break;
          }
        }
      }
      if (!selectedSize && sizes.length) {
        selectedSize = sizes[0];
      }
    }
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize ? selectedSize.slug : null);
  },
  updateSelectedImage: function () {
    var images            = this.state.images;
    var selectedImageSlug = this.storage.get('selected_image_slug');
    var selectedImage;
    if (images) {
      if (selectedImageSlug) {
        for (var i = 0; i < images.length; i += 1) {
          if (images[i].slug === selectedImageSlug) {
            selectedImage = images[i];
            break;
          }
        }
      }
      if (!selectedImage) {
        for (var j = 0; j < images.length; j += 1) {
          selectedImage = images[j];
          break;
        }
      }
    }
    this.state.selectedImage = selectedImage;
    this.storage.set('selected_image_slug', selectedImage ? selectedImage.slug : null);
  },
  updateSelectedRegion: function () {
    var regions                     = this.state.regions;
    var availableRegionSlugsBySize  = this.state.selectedSize ? this.state.selectedSize.regions : [];
    var availableRegionSlugsByImage = this.state.selectedImage ? this.state.selectedImage.regions : [];
    var selectedRegionSlug          = this.storage.get('selected_region_slug');
    var selectedRegion;
    if (regions) {
      if (selectedRegionSlug && availableRegionSlugsBySize.indexOf(selectedRegionSlug) !== -1 && availableRegionSlugsByImage.indexOf(selectedRegionSlug) !== -1) {
        for (var i = 0; i < regions.length; i += 1) {
          if (regions[i].slug === selectedRegionSlug) {
            if (regions[i].features.indexOf('metadata') !== -1) {
              selectedRegion = regions[i];
            }
            break;
          }
        }
      }
      if (!selectedRegion) {
        for (var j = 0; j < regions.length; j += 1) {
          if (availableRegionSlugsBySize.indexOf(regions[j].slug) !== -1 && availableRegionSlugsByImage.indexOf(regions[j].slug) !== -1 && regions[j].features.indexOf('metadata') !== -1) {
            selectedRegion = regions[j];
            break;
          }
        }
      }
    }
    this.state.selectedRegion = selectedRegion;
    this.storage.set('selected_region_slug', selectedRegion ? selectedRegion.slug : null);
  },
  updateSelectedKeys: function () {
    var keys           = this.state.keys;
    var selectedKeyIds = this.storage.get('selected_key_ids');
    var selectedKeys   = [];
    if (keys) {
      if (selectedKeyIds) {
        for (var i = 0; i < keys.length; i += 1) {
          if (selectedKeyIds.indexOf(keys[i].id) !== -1) {
            selectedKeys.push(keys[i]);
          }
        }
      }
      if (!selectedKeys.length && keys.length) {
        selectedKeys.push(keys[0]);
      }
    }
    this.state.selectedKeys = selectedKeys;
    selectedKeyIds = selectedKeys ?
      selectedKeys.map(function (selectedKey) {
          return selectedKey.id;
        }) :
      [];
    this.storage.set('selected_key_ids', selectedKeyIds.length ? selectedKeyIds : null);
  },
  updateReady: function () {
    if (
      (this.storage.get('hostname') || this.storage.get('default_hostname')) &&
      this.storage.get('selected_size_slug') &&
      this.storage.get('selected_image_slug') &&
      this.storage.get('selected_region_slug') &&
      this.storage.get('token')
    ) {
      this.props.onReady();
    } else {
      this.props.onUnready();
    }
  }
};


var DropletWidget = React.createClass({
  displayName: 'DropletWidget',
  getDefaultProps: function () {
    return {
      onSelectDroplet: null
    };
  },
  getInitialState: function () {
    return {
      enabled:         false,
      droplets:        null,
      selectedDroplet: null
    };
  },
  render: function () {
    if (!this.state.droplets) {
      return React.createElement(widgets.RadioButton, {
          className: 'droplet-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var selectedDropletId = this.state.selectedDroplet ? this.state.selectedDroplet.id : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.droplets.map(function (droplet) {
            return (
              React.createElement(widgets.RadioButton, {
                  key:       droplet.id,
                  className: 'droplet-button',
                  enabled:   this.state.enabled,
                  selected:  droplet.id === selectedDropletId,
                  title:     droplet.name,
                  onClick:   function () {
                    this.props.onSelectDroplet(droplet);
                  }.bind(this)
                })
            );
          }.bind(this))));
  }
});


var DropletLegend = React.createClass({
  displayName: 'DropletLegend',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
      failed:          false,
      selectedDroplet: null
    };
  },
  render: function () {
    if (this.state.failed) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            'Something went wrong.  ',
            React.createElement('a', {
                href: ''
              },
              'Refresh'),
            ' the page to continue.')));
    }
    var droplet = this.state.selectedDroplet;
    if (!droplet) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null, 'Loading…')));
    }
    var dump;
    dump = JSON.stringify(droplet);
    return (
      React.createElement(widgets.LegendArea, null,
        React.createElement('p', null, dump)));
  }
});


exports.MonitorControl = function (props) {
  this.props = this.getDefaultProps();
  Object.keys(props).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.storage = new storage.CachedStorage(this.props.prefix);
  this.state = this.getInitialState();
  this.createWidgets();
};
exports.MonitorControl.prototype = {
  getDefaultProps: function () {
    return {
      prefix: 'digitalocean'
    };
  },
  getInitialState: function () {
    return {
      failed:          false,
      account:         null,
      droplets:        null,
      selectedDroplet: null
    };
  },
  createWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, null),
      document.getElementById('digitalocean-account-widget'));
    this.dropletWidget = React.render(
      React.createElement(DropletWidget, {
          onSelectDroplet: this.handleSelectDroplet.bind(this)
        }),
      document.getElementById('digitalocean-droplet-widget'));
    this.dropletLegend = React.render(
      React.createElement(DropletLegend, null),
      document.getElementById('digitalocean-droplet-legend'));
  },
  renderWidgets: function () {
    var failed = this.state.failed;
    this.accountWidget.setState({
        account: this.state.account ? this.state.account.email : null
      });
    this.dropletWidget.setState({
        enabled:         !failed,
        droplets:        this.state.droplets,
        selectedDroplet: this.state.selectedDroplet
      });
    this.dropletLegend.setState({
        failed:          failed,
        selectedDroplet: this.state.selectedDroplet
      });
  },
  loadData: function () {
    this.loadAccount(function () {
        this.loadDroplets(function () {
            console.log(this.state.droplets);
            this.updateSelectedDroplet();
            this.renderWidgets();
          }.bind(this));
      }.bind(this));
  },
  loadAccount: function (next) {
    exports.getAccount(function (account) {
        this.state.account = account;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load account:', err);
        this.state.failed  = true;
        this.state.account = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  loadDroplets: function (next) {
    exports.getDroplets(function (droplets) {
        this.state.droplets = droplets;
        return next();
      }.bind(this),
      function (err) {
        console.error('Failed to load droplets:', err);
        this.state.failed   = true;
        this.state.droplets = null;
        return next();
      }.bind(this),
      this.storage.get('token'));
  },
  updateSelectedDroplet: function () {
    var droplets          = this.state.droplets;
    var selectedDropletId = this.storage.get('selected_droplet_id');
    var selectedDroplet;
    if (droplets) {
      if (selectedDropletId) {
        for (var i = 0; i < droplets.length; i += 1) {
          if (droplets[i].id === selectedDropletId) {
            selectedDroplet = droplets[i];
            break;
          }
        }
      }
      if (!selectedDroplet && droplets.length) {
        selectedDroplet = droplets[0];
      }
    }
    this.state.selectedDroplet = selectedDroplet;
    this.storage.set('selected_droplet_id', selectedDroplet ? selectedDroplet.id : null);
  },
  handleSelectDroplet: function (selectedDroplet) {
    this.state.selectedDroplet = selectedDroplet;
    this.storage.set('selected_droplet_id', selectedDroplet.id);
    this.renderWidgets();
  }
};
