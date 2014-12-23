'use strict';

var React = require('react');
var GitHub = require('github');
var DigitalOcean = require('digitalocean');
var http = require('http');
var random = require('random');


exports.CachedStorage = function (prefix) {
  this.prefix = prefix;
};
exports.CachedStorage.prototype = {
  storageKey: function (key) {
    return this.prefix ? this.prefix + '_' + key : key;
  },
  get: function (key, defaultValue) {
    this.cache = this.cache || {};
    var value = this.cache[key];
    if (value !== undefined) {
      return value;
    }
    var jsonValue = localStorage.getItem(this.storageKey(key));
    if (jsonValue !== undefined) {
      value = JSON.parse(jsonValue);
      this.cache[key] = value;
      return value;
    }
    if (defaultValue !== undefined) {
      return this.set(key, defaultValue);
    }
    return undefined;
  },
  set: function (key, value) {
    this.cache = this.cache || {};
    if (value === undefined) {
      return this.unset(key);
    }
    this.cache[key] = value;
    localStorage.setItem(this.storageKey(key), JSON.stringify(value));
    return value;
  },
  unset: function (key) {
    this.cache = this.cache || {};
    delete this.cache[key];
    localStorage.removeItem(this.storageKey(key));
    return undefined;
  },
  clear: function () {
    this.cache = {};
    // NOTE: This works around a bug in Safari 7.1.
    var storageKeys = [];
    for (var i = 0; i < localStorage.length; i += 1) {
      var storageKey = localStorage.key(i);
      if (storageKey.lastIndexOf(this.prefix, 0) === 0) {
        storageKeys.push(storageKey);
      }
    }
    for (var j = 0; j < storageKeys.length; j += 1) {
      localStorage.removeItem(storageKeys[j]);
    }
  }
};
exports.dumpCachedStorage = function (prefix) {
  for (var i = 0; i < localStorage.length; i += 1) {
    var storageKey = localStorage.key(i);
    if (storageKey.lastIndexOf(prefix, 0) === 0) {
      console.log(storageKey, localStorage.getItem(storageKey));
    }
  }
};


exports.debounce = function (func, duration) {
  var timeout;
  return function () {
    var that = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(that, args);
    }, duration);
  };
};


var StaticField = React.createClass({
  displayName: 'StaticField',
  getDefaultProps: function () {
    return {
      title: undefined
    };
  },
  render: function () {
    return (
      React.createElement('span', {
        id:        this.props.id,
        className: this.props.className || 'static-field'
      }, this.props.title)
    );
  }
});


var InputField = React.createClass({
  displayName: 'InputField',
  getDefaultProps: function () {
    return {
      enabled:     false,
      type:        undefined,
      placeholder: undefined,
      value:       undefined,
      onChange:    undefined
    };
  },
  handleChange: function (event) {
    this.props.onChange(event.target.value);
  },
  render: function () {
    return (
      React.createElement('input', {
        id:           this.props.id,
        className:    this.props.className || 'input-field',
        disabled:     !this.props.enabled,
        type:         this.props.type || 'text',
        placeholder:  this.props.placeholder,
        value:        this.props.value,
        onChange:     this.handleChange
      })
    );
  }
});


var InputWidget = React.createClass({
  displayName: 'InputWidget',
  getDefaultProps: function () {
    return {
      type:        undefined,
      placeholder: undefined,
      onChange:    undefined
    };
  },
  getInitialState: function () {
    return {
      enabled: false,
      value:   undefined
    };
  },
  render: function () {
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(InputField, {
            id:          this.props.id,
            className:   this.props.className,
            enabled:     this.state.enabled,
            type:        this.props.type,
            placeholder: this.props.placeholder,
            value:       this.state.value,
            onChange:    this.props.onChange
          }))
    );
  }
});


var PushButton = React.createClass({
  displayName: 'PushButton',
  getDefaultProps: function () {
    return {
      enabled: false,
      title:   undefined,
      onClick: undefined
    };
  },
  handleClick: function (event) {
    event.preventDefault();
    this.props.onClick();
  },
  render: function () {
    var className = this.props.className || 'pill-button'; // TODO
    className += this.props.enabled ? ' enabled' : ' disabled';
    return (
      React.createElement('a', {
        id:        this.props.id,
        className: className,
        href:      this.props.enabled ? '' : null,
        onClick:   this.props.enabled ? this.handleClick : null
      }, this.props.title)
    );
  }
});


var MapItemWidget = React.createClass({
  displayName: 'MapItemWidget',
  getDefaultProps: function () {
    return {
      enabled:       false,
      required:      false,
      name:          undefined,
      value:         undefined,
      onChangeName:  undefined,
      onChangeValue: undefined,
      onRemove:      undefined
    };
  },
  render: function () {
    var className = 'input-field';
    className += this.props.required ? ' required' : '';
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(InputField, {
            className:   className,
            enabled:     this.props.enabled && !this.props.required,
            placeholder: this.props.required ? 'required name' : 'name',
            value:       this.props.name,
            onChange:    this.props.onChangeName
          }),
        React.createElement(InputField, {
            className:   className,
            enabled:     this.props.enabled,
            placeholder: this.props.required ? 'required value' : 'value',
            value:       this.props.value,
            onChange:    this.props.onChangeValue
          }),
        React.createElement(PushButton, {
            className:   'map-button',
            enabled:     this.props.enabled && !this.props.required,
            title:       'Remove',
            onClick:     this.props.onRemove
          }))
    );
  }
});


var MapWidget = React.createClass({
  displayName: 'MapWidget',
  getDefaultProps: function () {
    return {
      onChange: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled: false,
      items:   undefined
    };
  },
  handleChangeItemName: function (changedIndex, changedName) {
    if (!this.state.items) {
      return;
    }
    var found = false;
    var changedItems = [];
    this.state.items.forEach(function (item, index) {
      if (index === changedIndex) {
        found = true;
        changedItems.push({
          required: item.required,
          name:     changedName,
          value:    item.value
        });
      } else {
        changedItems.push(item);
      }
    });
    if (found) {
      this.props.onChange(changedItems);
    }
  },
  handleChangeItemValue: function (changedIndex, changedValue) {
    if (!this.state.items) {
      return;
    }
    var found = false;
    var changedItems = [];
    this.state.items.forEach(function (item, index) {
      if (index === changedIndex) {
        found = true;
        changedItems.push({
          required: item.required,
          name:     item.name,
          value:    changedValue
        });
      } else {
        changedItems.push(item);
      }
    });
    if (found) {
      this.props.onChange(changedItems);
    }
  },
  handleRemoveItem: function (removedIndex) {
    if (!this.state.items) {
      return;
    }
    var found = false;
    var changedItems = [];
    this.state.items.forEach(function (item, index) {
      if (index === removedIndex) {
        found = true;
      } else {
        changedItems.push(item);
      }
    });
    if (found) {
      this.props.onChange(changedItems.length ? changedItems : undefined);
    }
  },
  handleAddItem: function () {
    var changedItems = [];
    if (this.state.items) {
      this.state.items.forEach(function (item) {
        changedItems.push(item);
      });
    }
    changedItems.push({});
    this.props.onChange(changedItems);
  },
  render: function () {
    return (
      React.createElement('div', null,
        this.state.items ? this.state.items.map(function (item, index) {
          return React.createElement(MapItemWidget, {
                key:           index,
                enabled:       this.state.enabled,
                required:      item.required,
                name:          item.name,
                value:         item.value,
                onChangeName:  function (name) {
                  this.handleChangeItemName(index, name);
                }.bind(this),
                onChangeValue: function (value) {
                  this.handleChangeItemValue(index, value);
                }.bind(this),
                onRemove:      function () {
                  this.handleRemoveItem(index);
                }.bind(this)
              });
        }.bind(this)) : null,
        React.createElement('div', {
            className: 'flex justify-end'
          },
          React.createElement(PushButton, {
              className: 'map-button',
              enabled:   this.state.enabled,
              title:     'Add',
              onClick:   this.handleAddItem
            })))
    );
  }
});


var LegendArea = React.createClass({
  displayName: 'LegendArea',
  render: function () {
    return (
      React.createElement('div', {
        id:        this.props.id,
        className: this.props.className || 'pre-like meta' // TODO
      }, this.props.children)
    );
  }
});


var BimodalPushButton = React.createClass({
  displayName: 'BimodalPushButton',
  getDefaultProps: function () {
    return {
      enabled:      false,
      mode:         false,
      trueTitle:    undefined,
      falseTitle:   undefined,
      onTrueClick:  undefined,
      onFalseClick: undefined
    };
  },
  handleClick: function (event) {
    event.preventDefault();
    var onClick = this.props.mode ? this.props.onTrueClick : this.props.onFalseClick;
    onClick();
  },
  render: function () {
    var className = this.props.className || 'bimodal-button';
    className += this.props.enabled ? ' enabled' : ' disabled';
    className += this.props.mode ? ' true' : ' false';
    var title = this.props.mode ? this.props.trueTitle : this.props.falseTitle;
    return (
      React.createElement('a', {
        id:        this.props.id,
        className: className,
        href:      this.props.enabled ? '' : null,
        onClick:   this.props.enabled ? this.handleClick : null
      }, title)
    );
  }
});


var RadioButton = React.createClass({
  displayName: 'RadioButton',
  getDefaultProps: function () {
    return {
      enabled:  false,
      selected: false,
      title:    undefined,
      onClick:  undefined
    };
  },
  handleClick: function (event) {
    event.preventDefault();
    this.props.onClick();
  },
  render: function () {
    var className = this.props.className || 'radio-button';
    className += this.props.enabled ? ' enabled' : ' disabled';
    className += this.props.selected ? ' selected' : '';
    return (
      React.createElement('a', {
        id:        this.props.id,
        className: className,
        href:      this.props.enabled ? '' : undefined,
        onClick:   this.props.enabled ? this.handleClick : undefined
      }, this.props.title)
    );
  }
});


var AccountWidget = React.createClass({
  displayName: 'AccountWidget',
  getDefaultProps: function () {
    return {
      onLink:   undefined,
      onUnlink: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled: false,
      account: undefined
    };
  },
  render: function () {
    var className = 'account-field';
    className += this.state.account ? '' : ' meta';
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(StaticField, {
            className: className,
            title:     this.state.account ? this.state.account : 'none'
          }),
        React.createElement(BimodalPushButton, {
            className:    'account-button',
            enabled:      this.state.enabled,
            mode:         this.state.account ? true : false,
            trueTitle:    'Clear',
            falseTitle:   'Connect',
            onTrueClick:  this.props.onUnlink,
            onFalseClick: this.props.onLink
          }))
    );
  }
});


var SourceLegend = React.createClass({
  displayName: 'SourceLegend',
  getDefaultProps: function () {
    return {
      onLink: undefined
    };
  },
  getInitialState: function () {
    return {
      account:    undefined,
      sourceInfo: undefined
    };
  },
  handleLink: function (event) {
    event.preventDefault();
    this.props.onLink();
  },
  render: function () {
    var info = this.state.sourceInfo;
    if (!info) {
      return (
        React.createElement(LegendArea, null,
          React.createElement('p', null,
            'Enter a ',
            React.createElement('em', null, 'git'),
            ' URL to begin.'),
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
                onClick: this.handleLink
              },
              'Connect'),
            ' your GitHub account to avoid running into GitHub API rate limits.'))
      );
    }
    return (
      React.createElement(LegendArea, null,
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
                React.createElement('strong', null, info.name || 'no name'))),
            React.createElement('p', null, info.description || 'no description'))))
    );
  }
});


var SizeLegend = React.createClass({
  displayName: 'SizeLegend',
  getDefaultProps: function () {
    return {
      onLink: undefined
    };
  },
  getInitialState: function () {
    return {
      selectedSize: undefined
    };
  },
  handleLink: function (event) {
    event.preventDefault();
    this.props.onLink();
  },
  render: function () {
    var size = this.state.selectedSize;
    if (!size) {
      return (
        React.createElement(LegendArea, null,
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
            '.'))
      );
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
      React.createElement(LegendArea, null,
        React.createElement('p', null,
          React.createElement('a', {
              href: 'https://digitalocean.com/pricing/'
            },
            React.createElement('strong', null, '$' + size['price_monthly'] + '/month'),
            ' — $' + size['price_hourly'] + '/hour')),
        React.createElement('p', null, subtitle))
    );
  }
});


var SizeWidget = React.createClass({
  displayName: 'SizeWidget',
  getDefaultProps: function () {
    return {
      onSelectSize: undefined
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
    if (!this.state.sizes) {
      return React.createElement(RadioButton, {
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
            React.createElement(RadioButton, {
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
        }.bind(this)))
    );
  }
});


var ImageWidget = React.createClass({
  displayName: 'ImageWidget',
  getDefaultProps: function () {
    return {
      onSelectImage: undefined
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
    if (!this.state.images) {
      return React.createElement(RadioButton, {
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
            React.createElement(RadioButton, {
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
        }.bind(this)))
    );
  }
});


var RegionWidget = React.createClass({
  displayName: 'RegionWidget',
  getDefaultProps: function () {
    return {
      onSelectRegion: undefined
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
    if (!this.state.regions) {
      return React.createElement(RadioButton, {
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
            React.createElement(RadioButton, {
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
        }.bind(this)))
    );
  }
});


var KeysWidget = React.createClass({
  displayName: 'KeysWidget',
  getDefaultProps: function () {
    return {
      onSelectKey: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      keys:         undefined,
      selectedKeys: undefined
    };
  },
  render: function () {
    if (!this.state.keys) {
      return React.createElement(RadioButton, {
          className: 'key-button meta',
          enabled:   false,
          title:     'none'
        });
    }
    var selectedKeyIds = this.state.selectedKeys ? this.state.selectedKeys.map(function (selectedKey) {
      return selectedKey.id;
    }) : [];
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.keys.map(function (sshKey) {
          var selected = selectedKeyIds.indexOf(sshKey.id) !== -1;
          return (
            React.createElement(RadioButton, {
                key:       sshKey.id,
                className: 'key-button',
                enabled:   this.state.enabled,
                selected:  selected,
                title:     sshKey.name,
                onClick:   function () {
                  this.props.onSelectKey(sshKey);
                }.bind(this)
              })
          );
        }.bind(this)))
    );
  }
});


exports.GitHubControl = function (prefix, clientId, token) {
  this.storage = new exports.CachedStorage(prefix);
  this.props = {
    clientId: clientId
  };
  if (token) {
    this.storage.set('token', token);
  }
  this.state = this.getInitialState();
  this.accountWidget = React.render(
    React.createElement(AccountWidget, {
      onLink:   this.handleLink.bind(this),
      onUnlink: this.handleUnlink.bind(this)
    }),
    document.getElementById('github-account-widget')
  );
  this.sourceWidget = React.render(
    React.createElement(InputWidget, {
      type:        'url',
      placeholder: 'https://github.com/user/project',
      onChange:    this.handleChangeSourceUrl.bind(this)
    }),
    document.getElementById('github-source-widget')
  );
  this.sourceLegend = React.render(
    React.createElement(SourceLegend, {
      onLink: this.handleLink.bind(this)
    }),
    document.getElementById('github-source-legend')
  );
  this.varsWidget = React.render(
    React.createElement(MapWidget, {
      onChange: this.handleChangeVars.bind(this)
    }),
    document.getElementById('github-vars-widget')
  );
  this.render();
};
exports.GitHubControl.prototype = {
  getInitialState: function () {
    return {
      enabled:   false,
      account:   undefined,
      vars:      undefined
    };
  },
  start: function () {
    this.loadAccount(function () {
      this.state.enabled = true;
      this.render();
      this.loadSourceInfo(function () {
        this.render();
      }.bind(this));
    }.bind(this));
  },
  loadAccount: function (next) {
    GitHub.getAuthenticatedUser(function (account) {
      this.state.account = account;
      return next();
    }.bind(this), function (err) {
      console.error('Failed to load account:', err);
      this.state.account = null;
      return next();
    }.bind(this), this.storage.get('token'));
  },
  loadSourceInfo: function (next) {
    var sourceUrl = this.storage.get('source_url');
    GitHub.getJsonFile(sourceUrl, 'app.json', function (sourceInfo) {
      this.state.sourceInfo = sourceInfo;
      return next();
    }.bind(this), function (err) {
      console.error('Failed to load source info:', err);
      this.state.sourceInfo = null;
      return next();
    }.bind(this), this.storage.get('token'));
  },
  render: function () {
    var enabled = this.state.enabled;
    this.accountWidget.setState({
      enabled: enabled,
      account: this.state.account ? this.state.account.login : undefined
    });
    this.sourceWidget.setState({
      enabled: true,
      value:   this.storage.get('source_url')
    });
    this.sourceLegend.setState({
      account:    this.state.account,
      sourceInfo: this.state.sourceInfo
    });
    this.varsWidget.setState({
      enabled: true,
      items:   this.state.vars
    });
  },
  handleLink: function () {
    this.storage.unset('token');
    this.state.enabled = false;
    this.state.account = undefined;
    this.render();
    setTimeout(function () {
      GitHub.requestToken(this.props.clientId);
    }.bind(this), 1000);
  },
  handleUnlink: function () {
    this.storage.unset('token');
    this.state.enabled = true;
    this.state.account = undefined;
    this.render();
  },
  handleChangeSourceUrl: function (sourceUrl) {
    this.storage.set('source_url', sourceUrl);
    this.state.sourceInfo = undefined;
    this.updateVars();
    this.handleDebounceSourceUrl();
    this.render();
  },
  handleDebounceSourceUrl: exports.debounce(function () {
    this.loadSourceInfo(function () {
      this.updateVars();
      this.render();
    }.bind(this));
  }, 1000),
  handleChangeVars: function (vars) {
    this.state.vars = vars;
    this.render();
  },
  updateVars: function () {
    // TODO
  }
};


exports.DigitalOceanControl = function (prefix, clientId, callbackUrl, token) {
  this.storage = new exports.CachedStorage(prefix);
  this.props = {
    clientId:    clientId,
    callbackUrl: callbackUrl,
  };
  if (token) {
    this.storage.set('token', token);
  }
  this.state = this.getInitialState();
  this.accountWidget = React.render(
    React.createElement(AccountWidget, {
      onLink:   this.handleLink.bind(this),
      onUnlink: this.handleUnlink.bind(this)
    }),
    document.getElementById('digitalocean-account-widget')
  );
  this.hostnameWidget = React.render(
    React.createElement(InputWidget, {
      placeholder: 'hello-world-2015',
      onChange:    this.handleChangeHostname.bind(this)
    }),
    document.getElementById('digitalocean-hostname-widget')
  );
  this.sizeWidget = React.render(
    React.createElement(SizeWidget, {
      onSelectSize: this.handleSelectSize.bind(this)
    }),
    document.getElementById('digitalocean-size-widget')
  );
  this.sizeLegend = React.render(
    React.createElement(SizeLegend, {
      onLink: this.handleLink.bind(this)
    }),
    document.getElementById('digitalocean-size-legend')
  );
  this.imageWidget = React.render(
    React.createElement(ImageWidget, {
      onSelectImage: this.handleSelectImage.bind(this)
    }),
    document.getElementById('digitalocean-image-widget')
  );
  this.regionWidget = React.render(
    React.createElement(RegionWidget, {
      onSelectRegion: this.handleSelectRegion.bind(this)
    }),
    document.getElementById('digitalocean-region-widget')
  );
  this.keysWidget = React.render(
    React.createElement(KeysWidget, {
      onSelectKey: this.handleSelectKey.bind(this)
    }),
    document.getElementById('digitalocean-keys-widget')
  );
  this.render();
};
exports.DigitalOceanControl.prototype = {
  getInitialState: function () {
    return {
      enabled:        false,
      failed:         false,
      account:        undefined,
      sizes:          undefined,
      selectedSize:   undefined,
      images:         undefined,
      selectedImage:  undefined,
      regions:        undefined,
      selectedRegion: undefined,
      keys:           undefined,
      selectedKeys:   undefined
    };
  },
  start: function () {
    this.loadAccount(function () {
      this.loadSizes(function () {
        this.updateSelectedSize();
        this.loadImages(function () {
          this.updateSelectedImage();
          this.loadRegions(function () {
            this.updateSelectedRegion();
            this.loadKeys(function () {
              this.updateSelectedKeys();
              this.state.enabled = true;
              this.render();
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
    }.bind(this), function (err) {
      console.error('Failed to load account:', err);
      this.state.failed  = true;
      this.state.account = null;
      return next();
    }.bind(this), this.storage.get('token'));
  },
  loadSizes: function (next) {
    DigitalOcean.getSizes(function (sizes) {
      this.state.sizes = sizes;
      return next();
    }.bind(this), function (err) {
      console.error('Failed to load sizes:', err);
      this.state.failed = true;
      this.state.sizes  = null;
      return next();
    }.bind(this), this.storage.get('token'));
  },
  loadImages: function (next) {
    DigitalOcean.getDistributionImages(function (images) {
      this.state.images = images.filter(function (image) {
        return image.slug === 'ubuntu-14-04-x64';
      });
      return next();
    }.bind(this), function (err) {
      console.error('Failed to load images:', err);
      this.state.failed = true;
      this.state.images = null;
      return next();
    }.bind(this), this.storage.get('token'));
  },
  loadRegions: function (next) {
    DigitalOcean.getRegions(function (regions) {
      this.state.regions = regions;
      return next();
    }.bind(this), function (err) {
      console.error('Failed to load regions:', err);
      this.state.failed  = true;
      this.state.regions = null;
      return next();
    }.bind(this), this.storage.get('token'));
  },
  loadKeys: function (next) {
    DigitalOcean.getAccountKeys(function (keys) {
      this.state.keys = keys;
      return next();
    }.bind(this), function (err) {
      console.error('Failed to load keys:', err);
      this.state.failed = true;
      this.state.keys   = null;
      return next();
    }.bind(this), this.storage.get('token'));
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
        selectedSize = this.state.sizes[0];
      }
    }
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize ? selectedSize.slug : undefined);
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
    this.storage.set('selected_image_slug', selectedImage ? selectedImage.slug : undefined);
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
    this.storage.set('selected_region_slug', selectedRegion ? selectedRegion.slug : undefined);
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
    selectedKeyIds = selectedKeys ? selectedKeys.map(function (selectedKey) {
      return selectedKey.id;
    }) : [];
    this.storage.set('selected_key_ids', selectedKeyIds.length ? selectedKeyIds : undefined);
  },
  render: function () {
    var enabled = this.state.enabled;
    var failed  = this.state.failed;
    this.accountWidget.setState({
      enabled:        enabled,
      account:        this.state.account ? this.state.account.email : undefined
    });
    this.hostnameWidget.setState({
      enabled:        true,
      value:          this.storage.get('hostname')
    });
    this.sizeWidget.setState({
      enabled:        enabled && !failed,
      sizes:          this.state.sizes,
      selectedSize:   this.state.selectedSize
    });
    this.sizeLegend.setState({
      selectedSize:   this.state.selectedSize
    });
    this.imageWidget.setState({
      enabled:        enabled && !failed,
      images:         this.state.images,
      selectedImage:  this.state.selectedImage
    });
    this.regionWidget.setState({
      enabled:        enabled && !failed,
      selectedSize:   this.state.selectedSize,
      selectedImage:  this.state.selectedImage,
      regions:        this.state.regions,
      selectedRegion: this.state.selectedRegion
    });
    this.keysWidget.setState({
      enabled:        enabled && !failed,
      keys:           this.state.keys,
      selectedKeys:   this.state.selectedKeys
    });
  },
  handleLink: function () {
    this.storage.unset('token');
    this.state = this.getInitialState();
    this.render();
    setTimeout(function () {
      DigitalOcean.requestToken(this.props.clientId, this.props.callbackUrl);
    }.bind(this), 1000);
  },
  handleUnlink: function () {
    this.storage.unset('token');
    this.state = this.getInitialState();
    this.state.enabled = true;
    this.render();
  },
  handleChangeHostname: function (hostname) {
    this.storage.set('hostname', hostname.replace(/[^a-z0-9\-]/g, ''));
    this.render();
  },
  handleSelectSize: function (selectedSize) {
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize.slug);
    this.updateSelectedRegion();
    this.render();
  },
  handleSelectImage: function (selectedImage) {
    this.state.selectedImage = selectedImage;
    this.storage.set('selected_image_slug', selectedImage.slug);
    this.updateSelectedRegion();
    this.render();
  },
  handleSelectRegion: function (selectedRegion) {
    this.state.selectedRegion = selectedRegion;
    this.storage.set('selected_region_slug', selectedRegion.slug);
    this.render();
  },
  handleSelectKey: function (selectedKey) {
    var selectedKeys = [];
    var found = false;
    for (var i = 0; i < this.state.selectedKeys.length; i += 1) {
      if (this.state.selectedKeys[i].id !== selectedKey.id) {
        selectedKeys.push(this.state.selectedKey[i]);
      } else {
        found = true;
      }
    }
    if (!found) {
      selectedKeys.push(selectedKey);
    }
    this.state.selectedKeys = selectedKeys;
    this.storage.set('selected_key_ids', this.state.selectedKeys ? this.state.selectedKeys.map(function (selectedKey) {
      return selectedKey.id;
    }) : undefined);
    this.render();
  },
};


exports.initGitHub = function () {
  var token;
  var sourceUrl;
  if (GitHub.parseRepoUrl(document.referrer)) {
    sourceUrl = document.referrer;
  }
  var query = http.parseCurrentQueryString();
  if (query) {
    if (query['vendor'] === 'github') {
      token = query['access_token'];
    }
    if (query['url']) {
      sourceUrl = query['url'];
    }
  }
  window.ghc = new exports.GitHubControl(
    'github',
    '2765f53aa92837f0a835',
    token
  );
  window.ghc.start();
  if (sourceUrl) {
    window.ghc.handleChangeSourceUrl(sourceUrl);
  }
};


exports.initDigitalOcean = function () {
  var token;
  var query = http.parseCurrentQueryString();
  if (query && query.vendor === 'digitalocean') {
    token = query['access_token'];
  }
  window.doc = new exports.DigitalOceanControl(
    'digitalocean',
    '2530da1c8b65fd7e627f9ba234db0cfddae44c2ddf7e603648301f043318cac4',
    'https://halcyon-digitalocean-callback.herokuapp.com/callback',
    token
  );
  window.doc.start();
  window.doc.handleChangeHostname(random.getHostname());
};
