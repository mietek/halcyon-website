'use strict';

var React = require('react');
var DigitalOcean = require('digitalocean');
var http = require('http');


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
    for (var i = 0; i < localStorage.length; i += 1) {
      var storageKey = localStorage.key(i);
      if (storageKey.lastIndexOf(this.prefix, 0) === 0) {
        localStorage.removeItem(storageKey);
      }
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


var LegendArea = React.createClass({
  displayName: 'LegendArea',
  render: function () {
    return (
      React.createElement('div', {
        id:        this.props.id,
        className: this.props.className || 'pre-like' // TODO
      }, this.props.children)
    );
  }
});


var BimodalButton = React.createClass({
  displayName: 'BimodalButton',
  getDefaultProps: function () {
    return {
      enabled:      false,
      mode:         false,
      trueTitle:    undefined,
      falseTitle:   undefined,
      onTrueClick:  undefined,
      onFalseClick: undefined,
      payload:      undefined
    };
  },
  handleClick: function (event) {
    event.preventDefault();
    var onClick = this.props.mode ? this.props.onTrueClick : this.props.onFalseClick;
    onClick(this.props.payload);
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
      onClick:  undefined,
      payload:  undefined
    };
  },
  handleClick: function (event) {
    event.preventDefault();
    this.props.onClick(this.props.payload);
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
    var title;
    if (this.state.account === null) {
      title = React.createElement('em', null, 'not available');
    } else if (this.state.account) {
      title = this.state.account.email;
    }
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(StaticField, {
            className: 'account-field',
            title:     title
          }),
        React.createElement(BimodalButton, {
            id:           'account-button',
            enabled:      this.state.enabled,
            mode:         this.state.account ? true : false,
            trueTitle:    'Unlink',
            falseTitle:   'Link',
            onTrueClick:  this.props.onUnlink,
            onFalseClick: this.props.onLink
          }))
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
      return React.createElement('em', null, 'not available');
    }
    var selectedSizeSlug = this.state.selectedSize ? this.state.selectedSize.slug : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.sizes.map(function (size) {
          return (
            React.createElement(RadioButton, {
                key:       size.slug,
                className: 'size-button',
                enabled:   this.state.enabled,
                selected:  size.slug === selectedSizeSlug,
                title:     '$' + size['price_monthly'] + '/month',
                onClick:   this.props.onSelectSize,
                payload:   size
              })
          );
        }.bind(this)))
    );
  }
});


var SizeLegend = React.createClass({
  displayName: 'SizeLegend',
  getInitialState: function () {
    return {
      selectedSize: undefined
    };
  },
  render: function () {
    var size = this.state.selectedSize;
    if (!size) {
      return (
        React.createElement(LegendArea, null,
          React.createElement('p', null,
            React.createElement('em', null, 'not available')))
      );
    }
    var legend;
    if (size.memory < 1024) {
      legend = size.memory + ' MB RAM, ';
    } else {
      legend = size.memory / 1024 + ' GB RAM, ';
    }
    legend += size.vcpus + ' CPU' + (size.vcpus > 1 ? 's, ' : ', ') +
      size.disk + ' GB SSD disk, ' + size.transfer + ' TB transfer';
    return (
      React.createElement(LegendArea, null,
        React.createElement('p', null,
          React.createElement('a', {
              href: 'https://digitalocean.com/pricing/'
            },
            React.createElement('strong', null, '$' + size['price_monthly'] + '/month'))),
        React.createElement('p', null, legend))
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
      regions:        undefined,
      selectedRegion: undefined
    };
  },
  render: function () {
    if (!this.state.regions) {
      return React.createElement('em', null, 'not available');
    }
    var availableRegionSlugs = this.state.selectedSize ? this.state.selectedSize.regions : [];
    var selectedRegionSlug = this.state.selectedRegion ? this.state.selectedRegion.slug : null;
    return (
      React.createElement('div', {
          className: 'flex'
        },
        this.state.regions.map(function (region) {
          var available = availableRegionSlugs.indexOf(region.slug) !== -1;
          return (
            React.createElement(RadioButton, {
                key:       region.slug,
                className: 'region-button',
                enabled:   region.available && this.state.enabled && available,
                selected:  region.slug === selectedRegionSlug,
                title:     region.name,
                onClick:   this.props.onSelectRegion,
                payload:   region
              })
          );
        }.bind(this)))
    );
  }
});


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
    }), document.getElementById('account-widget')
  );
  this.sizeWidget = React.render(
    React.createElement(SizeWidget, {
      onSelectSize: this.handleSelectSize.bind(this)
    }), document.getElementById('size-widget')
  );
  this.sizeLegend = React.render(
    React.createElement(SizeLegend, null), document.getElementById('size-legend')
  );
  this.regionWidget = React.render(
    React.createElement(RegionWidget, {
      onSelectRegion: this.handleSelectRegion.bind(this)
    }), document.getElementById('region-widget')
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
      regions:        undefined,
      selectedRegion: undefined
    };
  },
  start: function () {
    var token = this.storage.get('token');
    if (!token) {
      this.state.failed         = true;
      this.state.account        = null;
      this.state.sizes          = null;
      this.state.selectedSize   = null;
      this.state.regions        = null;
      this.state.selectedRegion = null;
      this.resume();
      return;
    }
    this.loadAccount(token);
    this.loadSizes(token);
    this.loadRegions(token);
  },
  loadAccount: function (token) {
    DigitalOcean.getAccount(function (account) {
      this.state.account = account;
      this.resume();
    }.bind(this), function (err) {
      console.error('Failed to get account:', err);
      this.state.failed  = true;
      this.state.account = null;
      this.resume();
    }.bind(this), token);
  },
  loadSizes: function (token) {
    DigitalOcean.getSizes(function (sizes) {
      this.state.sizes = sizes;
      this.resume();
    }.bind(this), function (err) {
      console.error('Failed to get sizes:', err);
      this.state.failed = true;
      this.state.sizes  = null;
      this.resume();
    }.bind(this), token);
  },
  loadRegions: function (token) {
    DigitalOcean.getRegions(function (regions) {
      this.state.regions = regions;
      this.updateSelectedRegion();
      this.resume();
    }.bind(this), function (err) {
      console.error('Failed to get regions:', err);
      this.state.failed  = true;
      this.state.regions = null;
      this.resume();
    }.bind(this), token);
  },
  updateSelectedSize: function () {
    var selectedSizeSlug = this.storage.get('selected_size_slug');
    var selectedSize;
    if (selectedSizeSlug) {
      for (var i = 0; i < this.state.sizes.length; i += 1) {
        if (this.state.sizes[i].slug === selectedSizeSlug) {
          selectedSize = this.state.sizes[i];
          break;
        }
      }
    }
    if (!selectedSize) {
      selectedSize = this.state.sizes[0];
    }
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize ? selectedSize.slug : undefined);
  },
  updateSelectedRegion: function () {
    var availableRegionSlugs = this.state.selectedSize ? this.state.selectedSize.regions : [];
    var selectedRegionSlug = this.storage.get('selected_region_slug');
    var selectedRegion;
    if (selectedRegionSlug && availableRegionSlugs.indexOf(selectedRegionSlug) !== -1) {
      for (var i = 0; i < this.state.regions.length; i += 1) {
        if (this.state.regions[i].slug === selectedRegionSlug) {
          selectedRegion = this.state.regions[i];
          break;
        }
      }
    }
    if (!selectedRegion) {
      for (var j = 0; j < this.state.regions.length; j += 1) {
        if (availableRegionSlugs.indexOf(this.state.regions[j].slug) !== -1) {
          selectedRegion = this.state.regions[j];
          break;
        }
      }
    }
    this.state.selectedRegion = selectedRegion;
    this.storage.set('selected_region_slug', selectedRegion ? selectedRegion.slug : undefined);
  },
  resume: function () {
    if (
        this.state.account === undefined ||
        this.state.sizes   === undefined ||
        this.state.regions === undefined
    ) {
      return;
    }
    this.updateSelectedSize();
    this.updateSelectedRegion();
    this.state.enabled = true;
    this.render();
  },
  render: function () {
    var enabled = this.state.enabled;
    var failed  = this.state.failed;
    this.accountWidget.setState({
      enabled:      enabled,
      account:      this.state.account
    });
    this.sizeWidget.setState({
      enabled:      enabled && !failed,
      sizes:        this.state.sizes,
      selectedSize: this.state.selectedSize
    });
    this.sizeLegend.setState({
      selectedSize: this.state.selectedSize
    });
    this.regionWidget.setState({
      enabled:        enabled && !failed,
      selectedSize:   this.state.selectedSize,
      regions:        this.state.regions,
      selectedRegion: this.state.selectedRegion
    });
  },
  handleLink: function () {
    this.storage.clear();
    this.state = this.getInitialState();
    this.render();
    setTimeout(function () {
      DigitalOcean.requestToken(this.props.clientId, this.props.callbackUrl);
    }.bind(this), 500);
  },
  handleUnlink: function () {
    this.storage.clear();
    this.state = this.getInitialState();
    this.state.enabled = true;
    this.render();
  },
  handleSelectSize: function (selectedSize) {
    this.state.selectedSize = selectedSize;
    this.storage.set('selected_size_slug', selectedSize.slug);
    this.updateSelectedRegion();
    this.render();
  },
  handleSelectRegion: function (selectedRegion) {
    this.state.selectedRegion = selectedRegion;
    this.storage.set('selected_region_slug', selectedRegion.slug);
    this.render();
  }
};


exports.initDigitalOcean = function () {
  var token;
  var query = http.parseCurrentQueryString();
  if (query.vendor === 'digitalocean') {
    token = query['access_token'];
  }
  var control = new exports.DigitalOceanControl(
    'digitalocean',
    '2530da1c8b65fd7e627f9ba234db0cfddae44c2ddf7e603648301f043318cac4',
    'https://halcyon-digitalocean-callback.herokuapp.com/callback',
    token
  );
  control.start();
};
