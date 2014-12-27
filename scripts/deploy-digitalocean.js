'use strict';

var DigitalOcean = require('digitalocean');
var React = require('react');
var cloudConfig = require('cloud-config');
var utils = require('utils');
var widgets = require('widgets');


var SizeWidget = React.createClass({
  displayName: 'SizeWidget',
  getDefaultProps: function () {
    return {
      onSelect: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      sizes:        undefined,
      selectedSize: undefined
    };
  },
  render: function () {
    if (!this.state.sizes || !this.state.sizes.length) {
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
      onSelect: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:       false,
      images:        undefined,
      selectedImage: undefined
    };
  },
  render: function () {
    if (!this.state.images || !this.state.images.length) {
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
      onSelect: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:        false,
      selectedSize:   undefined,
      selectedImage:  undefined,
      regions:        undefined,
      selectedRegion: undefined
    };
  },
  render: function () {
    if (!this.state.regions || !this.state.regions.length) {
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
      onSelect: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      keys:         undefined,
      selectedKeys: undefined
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
    if (!this.state.keys || !this.state.keys.length) {
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
            var selected = selectedKeyIds && selectedKeyIds.indexOf(key.id) !== -1;
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


var DeployLegend = React.createClass({
  displayName: 'DeployLegend',
  getDefaultProps: function () {
    return {
      referralCode: undefined,
      onConnect:    undefined
    };
  },
  getInitialState: function () {
    return {
      account:        undefined,
      accountError:   undefined,
      hostname:       undefined,
      selectedSize:   undefined,
      sizesError:     undefined,
      selectedImage:  undefined,
      imagesError:    undefined,
      selectedRegion: undefined,
      regionsError:   undefined,
      selectedKeys:   undefined,
      keysError:      undefined,
      sourceUrl:      undefined,
      envVars:        undefined
    };
  },
  connect: function (event) {
    event.preventDefault();
    this.props.onConnect();
  },
  render: function () {
    // TODO: Write this.
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        JSON.stringify(this.state, null, 2)));
  }
});


var ActionWidget = React.createClass({
  displayName: 'ActionWidget',
  getDefaultProps: function () {
    return {
      onCreate: undefined
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
    return {};
  },
  getInitialState: function () {
    return {
      action:      undefined,
      actionError: undefined
    };
  },
  render: function () {
    // TODO: Write this.
    return (
      React.createElement(widgets.LegendArea, {
          pre: true
        },
        JSON.stringify(this.state, null, 2)));
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
      clientId:         undefined,
      callbackUrl:      undefined,
      referralCode:     undefined,
      storedToken:      undefined,
      defaultHostname:  undefined,
      storedSizeSlug:   undefined,
      storedImageSlug:  undefined,
      storedRegionSlug: undefined,
      storedKeyIds:     undefined,
      onForgetAccount:  undefined,
      onSelectSize:     undefined,
      onSelectImage:    undefined,
      onSelectRegion:   undefined,
      onSelectKeys:     undefined
    };
  },
  makeWidgets: function () {
    this.accountWidget = React.render(
      React.createElement(widgets.AccountWidget, {
          onConnect:    this.connectAccount.bind(this),
          onForget:     this.forgetAccount.bind(this)
        }),
      document.getElementById('digitalocean-account-widget'));
    this.hostnameWidget = React.render(
      React.createElement(widgets.InputWidget, {
          placeholder:  this.props.defaultHostname,
          onChange:     this.changeHostname.bind(this)
        }),
      document.getElementById('hostname-widget'));
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
    this.deployLegend = React.render(
      React.createElement(DeployLegend, {
          referralCode: this.props.referralCode,
          onConnect:    this.connectAccount.bind(this)
        }),
      document.getElementById('digitalocean-legend'));
    this.actionWidget = React.render(
      React.createElement(ActionWidget, {
          onCreate:     this.createDroplet.bind(this)
        }),
      document.getElementById('action-widget'));
    this.actionLegend = React.render(
      React.createElement(ActionLegend),
      document.getElementById('action-legend'));
  },
  setInitialState: function () {
    this.setState({
        token:            this.props.storedToken,
        account:          undefined,
        accountError:     undefined,
        hostname:         this.props.defaultHostname,
        sizes:            undefined,
        sizesError:       undefined,
        selectedSize:     undefined,
        images:           undefined,
        imagesError:      undefined,
        selectedImage:    undefined,
        regions:          undefined,
        regionsError:     undefined,
        selectedRegion:   undefined,
        keys:             undefined,
        keysError:        undefined,
        selectedKeys:     undefined,
        action:           undefined,
        actionError:      undefined,
        sourceUrl:        undefined,
        envVars:          undefined
      });
  },
  forgetAccount: function () {
    this.setState({
        token:            undefined,
        account:          undefined,
        accountError:     undefined,
        sizes:            undefined,
        sizesError:       undefined,
        selectedSize:     undefined,
        images:           undefined,
        imagesError:      undefined,
        selectedImage:    undefined,
        regions:          undefined,
        regionsError:     undefined,
        selectedRegion:   undefined,
        keys:             undefined,
        keysError:        undefined,
        selectedKeys:     undefined,
        action:           undefined,
        actionError:      undefined
      });
    this.props.onForgetAccount();
  },
  connectAccount: function () {
    DigitalOcean.requestToken(this.props.clientId, this.props.callbackUrl);
  },
  setState: function (state) {
    utils.update(this.state, state);
    this.accountWidget.setState({
        enabled:        this.state.account || this.state.accountError,
        account:        this.state.account && this.state.account.email,
        accountError:   this.state.accountError
      });
    this.hostnameWidget.setState({
        enabled:        true,
        value:          this.state.hostname
      });
    this.sizeWidget.setState({
        enabled:        !!this.state.account,
        sizes:          this.state.sizes,
        selectedSize:   this.state.selectedSize
      });
    this.imageWidget.setState({
        enabled:        !!this.state.account,
        images:         this.state.images,
        selectedImage:  this.state.selectedImage
      });
    this.regionWidget.setState({
        enabled:        !!this.state.account,
        selectedSize:   this.state.selectedSize,
        selectedImage:  this.state.selectedImage,
        regions:        this.state.regions,
        selectedRegion: this.state.selectedRegion
      });
    this.keysWidget.setState({
        enabled:        !!this.state.account,
        keys:           this.state.keys,
        selectedKeys:   this.state.selectedKeys
      });
    this.deployLegend.setState({
        account:        this.state.account && this.state.account.email,
        accountError:   this.state.accountError,
        hostname:       this.state.hostname,
        selectedSize:   this.state.selectedSize && {
          slug:           this.state.selectedSize.slug
        },
        sizesError:     this.state.sizesError,
        selectedImage:  this.state.selectedImage && {
          slug:           this.state.selectedImage.slug
        },
        imagesError:    this.state.imagesError,
        selectedRegion: this.state.selectedRegion && {
          slug:           this.state.selectedRegion.slug
        },
        regionsError:   this.state.regionsError,
        selectedKeys:   (this.state.selectedKeys || []).map(function (key) {
            return {
              id:   key.id,
              name: key.name
            };
          }),
        keysError:      this.state.keysError,
        sourceUrl:      this.state.sourceUrl,
        envVars:        this.state.envVars
      });
    this.actionWidget.setState({
        enabled:        !!this.state.account && this.state.hostname && this.state.selectedSize && this.state.selectedImage && this.state.selectedRegion && this.state.sourceUrl && !this.state.action
      });
    this.actionLegend.setState({
        action:         this.state.action,
        actionError:    this.state.actionError
      });
  },
  start: function () {
    this.loadAccount(function () {
        this.loadSizes();
        this.loadImages();
        this.loadRegions();
        this.loadKeys();
      }.bind(this));
  },
  loadAccount: function (next) {
    DigitalOcean.getAccount(function (account, err) {
        this.setState({
            account:      account,
            accountError: err
          });
        return next();
      }.bind(this),
      this.state.token);
  },
  loadSizes: function () {
    DigitalOcean.getSizes(function (sizes, err) {
        this.setState({
            sizes:      sizes,
            sizesError: err
          });
        this.updateSelectedSize();
      }.bind(this),
      this.state.token);
  },
  loadImages: function () {
    DigitalOcean.getDistributionImages(function (images, err) {
        this.setState({
            images:      images,
            imagesError: err
          });
        this.updateSelectedImage();
      }.bind(this),
      this.state.token);
  },
  loadRegions: function () {
    DigitalOcean.getRegions(function (regions, err) {
        this.setState({
            regions:      regions,
            regionsError: err
          });
        this.updateSelectedRegion();
      }.bind(this),
      this.state.token);
  },
  loadKeys: function () {
    DigitalOcean.getAccountKeys(function (keys, err) {
        this.setState({
            keys:      keys,
            keysError: err
          });
        this.updateSelectedKeys();
      }.bind(this),
      this.state.token);
  },
  createDroplet: function () {
    this.setState({
        action:      'create',
        actionError: undefined
      });
    DigitalOcean.createDroplet(
      this.state.hostname,
      this.state.selectedSize.slug,
      this.state.selectedImage.slug,
      this.state.selectedRegion.slug,
      this.state.selectedKeys.map(function (key) {
          return key.id;
        }),
      cloudConfig.formatSetupYml(this.state.sourceUrl, this.state.envVars, null), // TODO: Provide command here.
      function (droplet, err) {
        if (droplet) {
          location.href = '/deploy/monitor/?id=' + droplet.id;
        } else {
          this.setState({
              droplet:      undefined,
              dropletError: err
            });
        }
      }.bind(this),
      this.state.token);
  },
  selectSize: function (size) {
    this.setState({
        selectedSize: size
      });
    this.updateSelectedRegion();
    this.props.onSelectSize(size);
  },
  selectImage: function (image) {
    this.setState({
        selectedImage: image
      });
    this.updateSelectedRegion();
    this.props.onSelectImage(image);
  },
  selectRegion: function (region) {
    this.setState({
        selectedRegion: region
      });
    this.props.onSelectRegion(region);
  },
  selectKeys: function (keys) {
    this.setState({
        selectedKeys: keys
      });
    this.props.onSelectKeys(keys);
  },
  updateSelectedSize: function () {
    var sizes            = this.state.sizes || [];
    var selectedSizeSlug = (this.state.selectedSize && this.state.selectedSize.slug) || this.props.storedSizeSlug;
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
    var selectedImageSlug = (this.state.selectedImage && this.state.selectedImage.slug) || this.props.storedImageSlug;
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
      }.bind(this));
    var selectedRegionSlug = (this.state.selectedRegion && this.state.selectedRegion.slug) || this.props.storedRegionSlug;
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
      })) || this.props.storedKeyIds;
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
  },
  changeHostname: function (hostname) {
    var validHostname = hostname.replace(/[^a-z0-9\-]/g, '');
    this.setState({
        hostname: validHostname
      });
  },
  changeSourceUrl: function (sourceUrl) {
    this.setState({
        sourceUrl: sourceUrl
      });
  },
  changeEnvVars: function (envVars) {
    this.setState({
        envVars: envVars
      });
  }
};
