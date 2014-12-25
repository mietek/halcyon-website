'use strict';


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
    if (value !== null && value !== undefined) {
      return value;
    }
    var jsonValue = localStorage.getItem(this.storageKey(key));
    if (jsonValue !== null) {
      value = JSON.parse(jsonValue);
      this.cache[key] = value;
      return value;
    }
    if (defaultValue !== null && defaultValue !== undefined) {
      return this.set(key, defaultValue);
    }
    return null;
  },
  set: function (key, value) {
    if (value === null || value === undefined) {
      return this.unset(key);
    }
    this.cache = this.cache || {};
    this.cache[key] = value;
    localStorage.setItem(this.storageKey(key), JSON.stringify(value));
    return value;
  },
  unset: function (key) {
    this.cache = this.cache || {};
    delete this.cache[key];
    localStorage.removeItem(this.storageKey(key));
    return null;
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
