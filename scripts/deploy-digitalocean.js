'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var widgets = require('widgets');


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
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.sizes.map(function (size) {
            return (
              React.createElement(widgets.RadioButton, {
                  key:       size.slug,
                  className: 'size-button',
                  enabled:   this.state.enabled,
                  selected:  this.state.selectedSize && size.slug === this.state.selectedSize.slug,
                  title:     size.memory < 1024 ? size.memory + ' MB' : (size.memory / 1024 + ' GB'),
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
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.images.map(function (image) {
            return (
              React.createElement(widgets.RadioButton, {
                  key:       image.slug,
                  className: 'image-button',
                  enabled:   this.state.enabled && image.supported,
                  selected:  this.state.selectedImage && image.slug === this.state.selectedImage.slug,
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
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.regions.map(function (region) {
            return (
              React.createElement(widgets.RadioButton, {
                  key:       region.slug,
                  className: 'region-button',
                  enabled:   this.state.enabled && region.supported && this.state.selectedSize && this.state.selectedSize.regions.indexOf(region.slug) !== -1 && this.state.selectedImage && this.state.selectedImage.regions.indexOf(region.slug) !== -1,
                  selected:  this.state.selectedRegion && region.slug === this.state.selectedRegion.slug,
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
      onSelect: null
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      keys:         null,
      selectedKeys: null
    };
  },
  selectKey: function (selectedKey) {
    var selectedKeys = [];
    if (this.state.selectedKeys) {
      this.state.selectedKeys.forEach(function (key) {
          selectedKeys.push(key);
        });
    }
    selectedKeys.push(selectedKey);
    this.props.onSelect(selectedKeys);
  },
  deselectKey: function (deselectedKey) {
    var selectedKeys = [];
    this.state.selectedKeys.forEach(function (key) {
        if (key.id !== deselectedKey.id) {
          selectedKeys.push(key);
        }
      });
    this.props.onSelect(selectedKeys);
  },
  render: function () {
    if (!this.state.keys) {
      return React.createElement(widgets.RadioButton, {
          className: 'key-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var selectedKeyIds = this.state.selectedKeys && this.state.selectedKeys.map(function (key) {
        return key.id;
      });
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
                      this.deselectKey(key);
                    } else {
                      this.selectKey(key);
                    }
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
      referralCode: null,
      onConnect:    null
    };
  },
  getInitialState: function () {
    return {
      account:        null,
      accountPending: false,
      accountError:   null,
      hostname:       null,
      selectedSize:   null,
      sizesError:     null,
      selectedImage:  null,
      imagesError:    null,
      selectedRegion: null,
      regionsError:   null,
      selectedKeys:   null,
      keysError:      null,
      sourceUrl:      null,
      envVars:        null
    };
  },
  connect: function (event) {
    event.preventDefault();
    this.props.onConnect();
  },
  render: function () {
    // TODO: Rewrite this.
    var size = this.state.selectedSize;
    if (!size) {
      return (
        React.createElement(widgets.LegendArea, null,
          React.createElement('p', null,
            React.createElement('a', {
                href: '',
                onClick: this.connect.bind(this)
              },
              'Connect'),
            ' your DigitalOcean account to continue.'),
          React.createElement('p', null,
            'If you need to sign up for a new account, you can help the Halcyon project and receive $10 credit from DigitalOcean by using a ',
            React.createElement('a', {
                href: 'https://cloud.digitalocean.com/registrations/new?refcode=' + this.props.referralCode
              },
              'referral link'),
            '.')));
    }
    return (
      React.createElement(widgets.LegendArea, null,
        React.createElement('p', null,
          React.createElement('a', {
              href: 'https://digitalocean.com/pricing/'
            },
            React.createElement('strong', null, '$' + size['price_monthly'] + '/month'),
            ' — $' + size['price_hourly'] + '/hour')),
        React.createElement('p', null,
          (size.memory < 1024 ? size.memory + ' MB' : (size.memory / 1024 + ' GB')) + 'RAM, ' + size.vcpus + ' CPU' + (size.vcpus > 1 ? 's, ' : ', ') + size.disk + ' GB SSD disk, ' + size.transfer + ' TB transfer')));
  }
});


var ActionWidget = React.createClass({
  displayName: 'ActionWidget',
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
      React.createElement('div', null,
        React.createElement('div', {
            className: 'flex'
          },
          React.createElement(widgets.PushButton, {
              className: 'create-button',
              enabled:   this.state.enabled,
              title:     'Create droplet',
              onClick:   this.props.onCreate
            }))));
  }
});


var ActionLegend = React.createClass({
  displayName: 'ActionLegend',
  getDefaultProps: function () {
    return {
    };
  },
  getInitialState: function () {
    return {
      actionPending: false,
      actionError:   null
    };
  },
  render: function () {
    // TODO
  }
});


exports.DeployControl = function (props) {
  this.props = this.getDefaultProps();
  this.state = this.getInitialState();
  Object.keys(props || {}).forEach(function (key) {
      this.props[key] = props[key];
    }.bind(this));
  this.createWidgets();
};
exports.DeployControl.prototype = {
  getDefaultProps: function () {
    return {
      clientId:       null,
      callbackUrl:    null,
      token:          null,
      referralCode:   null,
      hostname:       null,
      sizeSlug:       null,
      imageSlug:      null,
      regionSlug:     null,
      keyIds:         null,
      sourceUrl:      null,
      envVars:        null,
      onSelectSize:   null,
      onSelectImage:  null,
      onSelectRegion: null,
      onSelectKeys:   null
    };
  },
  getInitialState: function () {
    return {
      token:          null,
      account:        null,
      accountPending: false,
      accountError:   null,
      hostname:       null,
      sizes:          null,
      sizesError:     null,
      selectedSize:   null,
      images:         null,
      imagesError:    null,
      selectedImage:  null,
      regions:        null,
      regionsError:   null,
      selectedRegion: null,
      keys:           null,
      keysError:      null,
      selectedKeys:   null,
      actionPending:  false,
      actionError:    null,
      sourceUrl:      null,
      envVars:        null
    };
  },
  createWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          onConnect:    this.connectAccount.bind(this),
          onForget:     this.forgetAccount.bind(this)
        }),
      document.getElementById('digitalocean-account-widget'));
    this.sizeWidget = React.render(
      React.createElement(SizeWidget, {
          onSelect:     this.selectSize.bind(this)
        }),
      document.getElementById('size-widget'));
    this.imageWidget = React.render(
      React.createElement(ImageWidget, {
          onSelect:     this.selectImage.bind(this)
        }),
      document.getElementById('image-widget'));
    this.regionWidget = React.render(
      React.createElement(RegionWidget, {
          onSelect:     this.selectRegion.bind(this)
        }),
      document.getElementById('region-widget'));
    this.keysWidget = React.render(
      React.createElement(KeysWidget, {
          onSelect:     this.selectKeys.bind(this)
        }),
      document.getElementById('keys-widget'));
    this.dropletLegend = React.render(
      React.createElement(DropletLegend, {
          referralCode: this.props.referralCode,
          onConnect:    this.connectAccount.bind(this)
        }),
      document.getElementById('droplet-legend'));
    this.actionWidget = React.render(
      React.createElement(ActionWidget, {
          onCreate:     this.createDroplet.bind(this)
        }),
      document.getElementById('action-widget'));
    this.actionLegend = React.render(
      React.createElement(ActionLegend, null),
      document.getElementById('action-legend'));
    this.renderWidgets();
  },
  renderWidgets: function () {
    this.accountWidget.setState({
        enabled:        !this.state.accountPending,
        account:        this.state.account && this.state.account.email
      });
    this.sizeWidget.setState({
        enabled:        !this.state.accountPending,
        sizes:          this.state.sizes,
        selectedSize:   this.state.selectedSize
      });
    this.imageWidget.setState({
        enabled:        !this.state.accountPending,
        images:         this.state.images,
        selectedImage:  this.state.selectedImage
      });
    this.regionWidget.setState({
        enabled:        !this.state.accountPending,
        selectedSize:   this.state.selectedSize,
        selectedImage:  this.state.selectedImage,
        regions:        this.state.regions,
        selectedRegion: this.state.selectedRegion
      });
    this.keysWidget.setState({
        enabled:        !this.state.accountPending,
        keys:           this.state.keys,
        selectedKeys:   this.state.selectedKeys
      });
    this.dropletLegend.setState({
        account:        this.state.account,
        accountPending: this.state.accountPending,
        accountError:   this.state.accountError,
        hostname:       this.state.hostname,
        selectedSize:   this.state.selectedSize,
        sizesError:     this.state.sizesError,
        selectedImage:  this.state.selectedImage,
        imagesError:    this.state.imagesError,
        selectedRegion: this.state.selectedRegion,
        regionsError:   this.state.regionsError,
        selectedKeys:   this.state.selectedKeys,
        keysError:      this.state.keysError,
        sourceUrl:      this.state.sourceUrl,
        envVars:        this.state.envVars
      });
    this.actionWidget.setState({
        enabled:        !this.state.accountPending && (this.state.hostname || this.props.hostname) && this.state.selectedSize && this.state.selectedImage && this.state.selectedRegion && (this.state.sourceUrl || this.props.sourceUrl) && !this.state.actionPending
      });
    this.actionLegend.setState({
        actionPending:  this.state.actionPending,
        actionError:    this.state.actionError
      });
  },
  loadData: function () {
    this.state.accountPending = true;
    this.loadAccount(function () {
        this.state.accountPending = false;
        this.renderWidgets();
        this.loadSizes(function () {
            this.updateSelectedSize();
            this.renderWidgets();
          }.bind(this));
        this.loadImages(function () {
            this.updateSelectedImage();
            this.renderWidgets();
          }.bind(this));
        this.loadRegions(function () {
            this.updateSelectedRegion();
            this.renderWidgets();
          }.bind(this));
        this.loadKeys(function () {
            this.updateSelectedKeys();
            this.renderWidgets();
          }.bind(this));
      }.bind(this));
  },
  loadAccount: function (next) {
    DigitalOcean.getAccount(function (account) {
        this.state.account = account;
        return next();
      }.bind(this),
      function (error) {
        this.state.account      = null;
        this.state.accountError = error;
        return next();
      }.bind(this),
      this.state.token);
  },
  loadSizes: function (next) {
    DigitalOcean.getSizes(function (sizes) {
        this.state.sizes = sizes;
        return next();
      }.bind(this),
      function (error) {
        this.state.sizes      = null;
        this.state.sizesError = error;
        return next();
      }.bind(this),
      this.state.token);
  },
  loadImages: function (next) {
    DigitalOcean.getDistributionImages(function (images) {
        this.state.images = images;
        return next();
      }.bind(this),
      function (error) {
        this.state.images      = null;
        this.state.imagesError = error;
        return next();
      }.bind(this),
      this.state.token);
  },
  loadRegions: function (next) {
    DigitalOcean.getRegions(function (regions) {
        this.state.regions = regions;
        return next();
      }.bind(this),
      function (error) {
        this.state.regions      = null;
        this.state.regionsError = error;
        return next();
      }.bind(this),
      this.state.token);
  },
  loadKeys: function (next) {
    DigitalOcean.getAccountKeys(function (keys) {
        this.state.keys = keys;
        return next();
      }.bind(this),
      function (error) {
        this.state.keys      = null;
        this.state.keysError = error;
        return next();
      }.bind(this),
      this.state.token);
  },
  createDroplet: function () {
    this.state.actionPending = true;
    this.renderWidgets();
    DigitalOcean.createDroplet(
      this.state.hostname || this.props.hostname,
      this.state.selectedSize.slug,
      this.state.selectedImage.slug,
      this.state.selectedRegion.slug,
      this.state.selectedKeys.map(function (key) {
          return key.id;
        }),
      this.state.sourceUrl || this.props.sourceUrl,
      function (droplet) {
        location.href = '/deploy/monitor/?id=' + droplet.id;
      }.bind(this),
      function (error) {
        this.state.actionPending = false;
        this.state.actionError   = error;
        this.renderWidgets();
      }.bind(this),
      this.state.token);
  },
  connectAccount: function () {
    DigitalOcean.requestToken(this.props.clientId, this.props.callbackUrl);
  },
  forgetAccount: function () {
    localStorage.removeItem('digitalocean-token');
    this.state.token          = null;
    this.state.account        = null;
    this.state.accountPending = false;
    this.state.sizes          = null;
    this.state.selectedSize   = null;
    this.state.images         = null;
    this.state.selectedImage  = null;
    this.state.regions        = null;
    this.state.selectedRegion = null;
    this.state.keys           = null;
    this.state.selectedKeys   = null;
    this.state.actionPending  = false;
    this.renderWidgets();
  },
  changeHostname: function (hostname) {
    this.state.hostname = hostname;
    this.renderWidgets();
  },
  selectSize: function (selectedSize) {
    this.state.selectedSize = selectedSize;
    localStorage.setItem('deploy-size-slug', selectedSize && selectedSize.slug);
    this.updateSelectedRegion();
    this.props.onSelectSize(selectedSize);
    this.renderWidgets();
  },
  selectImage: function (selectedImage) {
    this.state.selectedImage = selectedImage;
    localStorage.setItem('deploy-image-slug', selectedImage && selectedImage.slug);
    this.updateSelectedRegion();
    this.props.onSelectImage(selectedImage);
    this.renderWidgets();
  },
  selectRegion: function (selectedRegion) {
    this.state.selectedRegion = selectedRegion;
    localStorage.setItem('deploy-region-slug', selectedRegion && selectedRegion.slug);
    this.props.onSelectRegion(selectedRegion);
    this.renderWidgets();
  },
  selectKeys: function (selectedKeys) {
    this.state.selectedKeys = selectedKeys;
    localStorage.setItem('deploy-key-ids', selectedKeys && JSON.stringify(selectedKeys.map(function (key) {
        return key.id;
      })));
    this.props.onSelectKeys(selectedKeys);
    this.renderWidgets();
  },
  changeSourceUrl: function (sourceUrl) {
    this.state.sourceUrl = sourceUrl;
    this.renderWidgets();
  },
  changeEnvVars: function (envVars) {
    this.state.envVars = envVars;
    this.renderWidgets();
  },
  updateSelectedSize: function () {
    var sizes            = this.state.sizes || [];
    var selectedSizeSlug = (this.state.selectedSize && this.state.selectedSize.slug) || this.props.sizeSlug;
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
    this.selectSize(selectedSize);
  },
  updateSelectedImage: function () {
    var images            = this.state.images || [];
    var supportedImages   = images.filter(function (image) {
        return image.supported;
      });
    var selectedImageSlug = (this.state.selectedImage && this.state.selectedImage.slug) || this.props.imageSlug;
    var selectedImage;
    if (selectedImageSlug) {
      for (var i = 0; i < supportedImages.length; i += 1) {
        if (supportedImages[i].slug === selectedImageSlug) {
          selectedImage = supportedImages[i];
          break;
        }
      }
    }
    if (!selectedImage && supportedImages.length) {
      selectedImage = supportedImages[0];
    }
    this.selectImage(selectedImage);
  },
  updateSelectedRegion: function () {
    var regions            = this.state.regions || [];
    var supportedRegions   = regions.filter(function (region) {
        return region.supported && this.state.selectedSize && this.state.selectedSize.regions.indexOf(region.slug) !== -1 && this.state.selectedImage && this.state.selectedImage.regions.indexOf(region.slug) !== -1;
      });
    var selectedRegionSlug = (this.state.selectedRegion && this.state.selectedRegion.slug) || this.props.regionSlug;
    var selectedRegion;
    if (selectedRegionSlug) {
      for (var i = 0; i < supportedRegions.length; i += 1) {
        if (supportedRegions[i].slug === selectedRegionSlug) {
          selectedRegion = supportedRegions[i];
          break;
        }
      }
    }
    if (!selectedRegion && supportedRegions.length) {
      selectedRegion = supportedRegions[0];
    }
    this.selectRegion(selectedRegion);
  },
  updateSelectedKeys: function () {
    var keys           = this.state.keys || [];
    var selectedKeyIds = (this.state.selectedKeys && this.state.selectedKeys.map(function (key) {
        return key.id;
      })) || this.props.keyIds;
    var selectedKeys;
    if (selectedKeyIds) {
      for (var i = 0; i < keys.length; i += 1) {
        if (selectedKeyIds.indexOf(keys[i].id) !== -1) {
          selectedKeys = selectedKeys || [];
          selectedKeys.push(keys[i]);
        }
      }
    }
    if (!selectedKeys && keys.length) {
      selectedKeys = [keys[0]];
    }
    this.selectKeys(selectedKeys);
  }
};
