'use strict';

var DigitalOcean = require('digitalocean');
var GitHub = require('github');
var React = require('react');
var http = require('http');
var storage = require('storage');
var utils = require('utils');
var widgets = require('widgets');


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
      onSelect: null
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
                    this.props.onSelect(size);
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
      onSelect: null
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
    var supportedImageSlugs = ['ubuntu-14-04-x64']; // TODO: Support CentOS 7.
    var selectedImageSlug   = this.state.selectedImage ? this.state.selectedImage.slug : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.images.map(function (image) {
            var enabled = this.state.enabled && supportedImageSlugs.indexOf(image.slug) !== -1;
            return (
              React.createElement(widgets.RadioButton, {
                  key:       image.slug,
                  className: 'image-button',
                  enabled:   enabled,
                  selected:  image.slug === selectedImageSlug,
                  title:     image.distribution + ' ' + image.name,
                  onClick:   function () {
                    this.props.onSelect(image);
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
      onSelect: null
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
            var available = region.available &&
              availableRegionSlugsBySize.indexOf(region.slug) !== -1 &&
              availableRegionSlugsByImage.indexOf(region.slug);
            var metadata  = region.features.indexOf('metadata') !== -1;
            return (
              React.createElement(widgets.RadioButton, {
                  key:       region.slug,
                  className: 'region-button',
                  enabled:   this.state.enabled && available && metadata,
                  selected:  region.slug === selectedRegionSlug,
                  title:     region.name,
                  onClick:   function () {
                    this.props.onSelect(region);
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


var DeployControl = function (props) {
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
DeployControl.prototype = {
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
          onLink:      this.handleLink.bind(this),
          onUnlink:    this.handleUnlink.bind(this)
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
          onSelect:    this.handleSelectSize.bind(this)
        }),
      document.getElementById('digitalocean-size-widget'));
    this.sizeLegend = React.render(
      React.createElement(SizeLegend, {
          onLink:      this.handleLink.bind(this)
        }),
      document.getElementById('digitalocean-size-legend'));
    this.imageWidget = React.render(
      React.createElement(ImageWidget, {
          onSelect:    this.handleSelectImage.bind(this)
        }),
      document.getElementById('digitalocean-image-widget'));
    this.regionWidget = React.render(
      React.createElement(RegionWidget, {
          onSelect:    this.handleSelectRegion.bind(this)
        }),
      document.getElementById('digitalocean-region-widget'));
    this.keysWidget = React.render(
      React.createElement(KeysWidget, {
          onChange:    this.handleChangeSelectedKeys.bind(this)
        }),
      document.getElementById('digitalocean-keys-widget'));
    this.backgroundImage = React.render(
      React.createElement(widgets.BackgroundImage, {
          src:         'http://i.imgur.com/WZEf0tB.png'
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
    DigitalOcean.getAccount(function (account) {
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
    DigitalOcean.getSizes(function (sizes) {
        this.state.sizes = sizes.length ? sizes : null;
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
    DigitalOcean.getDistributionImages(function (images) {
        var supportedImageSlugs = ['centos-7-0-x64', 'ubuntu-14-04-x64'];
        var validImages         = images.filter(function (image) {
            return supportedImageSlugs.indexOf(image.slug) !== -1;
          });
        this.state.images = validImages.length ? validImages : null;
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
    DigitalOcean.getRegions(function (regions) {
        this.state.regions = regions.length ? regions : null;
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
    DigitalOcean.getAccountKeys(function (keys) {
        this.state.keys = keys.length ? keys : null;
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
    DigitalOcean.createDroplet(
      this.storage.get('hostname') || this.storage.get('default_hostname'),
      this.storage.get('selected_size_slug'),
      this.storage.get('selected_image_slug'),
      this.storage.get('selected_region_slug'),
      this.storage.get('selected_key_ids'),
      sourceUrl,
      function (droplet) {
        var createdDropletIds = this.storage.get('created_droplet_ids', []); // TODO: Atomically get and set?
        createdDropletIds.push(droplet.id);
        this.storage.set('created_droplet_ids', createdDropletIds);
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
    DigitalOcean.requestToken(this.props.clientId, this.props.callbackUrl);
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
    var sizes            = this.state.sizes || [];
    var selectedSizeSlug = this.storage.get('selected_size_slug');
    var selectedSize;
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
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize ? selectedSize.slug : null);
  },
  updateSelectedImage: function () {
    var supportedImageSlugs = ['ubuntu-14-04-x64']; // TODO: Support CentOS 7.
    var images              = this.state.images || [];
    var validImages         = images.filter(function (image) {
        return supportedImageSlugs.indexOf(image.slug) !== -1;
      });
    var selectedImageSlug   = this.storage.get('selected_image_slug');
    var selectedImage;
    if (selectedImageSlug) {
      for (var i = 0; i < validImages.length; i += 1) {
        if (validImages[i].slug === selectedImageSlug) {
          selectedImage = validImages[i];
          break;
        }
      }
    }
    if (!selectedImage && validImages.length) {
      selectedImage = validImages[0];
    }
    this.state.selectedImage = selectedImage;
    this.storage.set('selected_image_slug', selectedImage ? selectedImage.slug : null);
  },
  updateSelectedRegion: function () {
    var availableRegionSlugsBySize  = this.state.selectedSize ? this.state.selectedSize.regions : [];
    var availableRegionSlugsByImage = this.state.selectedImage ? this.state.selectedImage.regions : [];
    var regions                     = this.state.regions || [];
    var validRegions                = regions.filter(function (region) {
        return availableRegionSlugsBySize.indexOf(region.slug) !== -1 &&
          availableRegionSlugsByImage.indexOf(region.slug) !== -1 &&
          region.features.indexOf('metadata') !== -1;
      });
    var selectedRegionSlug          = this.storage.get('selected_region_slug');
    var selectedRegion;
    if (selectedRegionSlug) {
      for (var i = 0; i < validRegions.length; i += 1) {
        if (validRegions[i].slug === selectedRegionSlug) {
          selectedRegion = validRegions[i];
          break;
        }
      }
    }
    if (!selectedRegion && validRegions.length) {
      selectedRegion = validRegions[0];
    }
    this.state.selectedRegion = selectedRegion;
    this.storage.set('selected_region_slug', selectedRegion ? selectedRegion.slug : null);
  },
  updateSelectedKeys: function () {
    var keys           = this.state.keys || [];
    var selectedKeyIds = this.storage.get('selected_key_ids');
    var selectedKeys   = [];
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


var DeployWidget = React.createClass({
  displayName: 'DeployWidget',
  getDefaultProps: function () {
    return {
      onCreate: null
    };
  },
  getInitialState: function () {
    return {
      enabled: false
    };
  },
  render: function () {
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(widgets.PushButton, {
            className: 'create-button',
            enabled:   this.state.enabled,
            title:     'Create droplet',
            onClick:   this.props.onCreate
          })));
  }
});


exports.Control = function (props) {
  this.props = this.getDefaultProps();
  Object.keys(props).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.state = this.getInitialState();
  this.createWidgets();
  this.createControl();
};
exports.Control.prototype = {
  getDefaultProps: function () {
    return {
      ghClientId:    null,
      ghToken:       null,
      doClientId:    null,
      doCallbackUrl: null,
      doToken:       null,
      sourceUrl:     null
    };
  },
  getInitialState: function () {
    return {
      locked:  false,
      ghReady: false,
      doReady: false
    };
  },
  createWidgets: function () {
    this.deployWidget = React.render(
      React.createElement(DeployWidget, {
          onCreate: this.handleCreateDroplet.bind(this)
        }),
      document.getElementById('deploy-widget'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.deployWidget.setState({
        enabled: !this.state.locked && this.state.ghReady && this.state.doReady
      });
  },
  createControl: function () {
    this.ghControl = new GitHub.DeployControl({
        clientId:  this.props.ghClientId,
        token:     this.props.ghToken,
        sourceUrl: this.props.sourceUrl,
        onReady:   function () {
          this.state.ghReady = true;
          this.renderWidgets();
        }.bind(this),
        onUnready: function () {
          this.state.ghReady = false;
          this.renderWidgets();
        }.bind(this)
      });
    this.doControl = new DeployControl({
        clientId:        this.props.doClientId,
        callbackUrl:     this.props.doCallbackUrl,
        token:           this.props.doToken,
        defaultHostname: utils.getRandomHostname(),
        onReady:         function () {
          this.state.doReady = true;
          this.renderWidgets();
        }.bind(this),
        onUnready:       function () {
          this.state.doReady = false;
          this.renderWidgets();
        }.bind(this)
      });
  },
  loadData: function () {
    this.ghControl.loadData();
    this.doControl.loadData();
  },
  handleCreateDroplet: function () {
    this.state.locked = true;
    this.renderWidgets();
    this.doControl.createDroplet(this.ghControl.getSourceUrl(),
      function (droplet) {
        location.href = '/deploy/monitor/?id=' + droplet.id;
      }.bind(this),
      function (err) {
        console.error('Failed to create droplet:', err); // TODO: Improve error display.
        this.state.locked = false;
        this.renderWidgets();
      }.bind(this));
  }
};


exports.start = function () {
  var sourceUrl;
  if (GitHub.parseRepoUrl(document.referrer)) {
    sourceUrl = document.referrer;
  }
  var ghToken, doToken;
  var query = http.parseQueryString(location.search);
  if (query) {
    var token = query['access_token'];
    if (query['vendor'] === 'github') {
      ghToken = token;
    } else if (query.vendor === 'digitalocean') {
      doToken = token;
    }
    sourceUrl = query['url'];
  }
  var control = new exports.Control({
      ghClientId:    '2765f53aa92837f0a835',
      ghToken:       ghToken,
      doClientId:    '2530da1c8b65fd7e627f9ba234db0cfddae44c2ddf7e603648301f043318cac4',
      doCallbackUrl: 'https://halcyon-digitalocean-callback.herokuapp.com/callback',
      doToken:       doToken,
      sourceUrl:     sourceUrl
    });
  control.loadData();
};
