'use strict';


exports.parseQueryString = function (str) {
  if (!str) {
    return null;
  }
  if (str[0] !== '?') {
    return {};
  }
  var result = {};
  str.substr(1).split('&').forEach(function (param) {
    // TODO: Decoding; key-only and multiple-value params.
    var pair = param.split('=');
    result[pair[0]] = pair[1];
  });
  return result;
};


exports.parseCurrentQueryString = function () {
  return exports.parseQueryString(location.search);
};


exports.addQueryToUrl = function (query, url) {
  if (!url) {
    return null;
  }
  var result = url;
  var sep;
  if (url.indexOf('?') === -1) {
    sep = '?';
  } else {
    sep = '&';
  }
  Object.keys(query).forEach(function (key) {
    // TODO: Encoding; key-only and multiple-value params.
    var value = query[key];
    if (value !== undefined) {
      result += sep + key + '=' + query[key];
      sep = '&';
    }
  });
  return result;
};


exports.addHeader = function (key, value, opts) {
  if (!value) {
    return opts;
  }
  opts = opts || {};
  opts.headers = opts.headers || {};
  opts.headers[key] = value;
  return opts;
};


exports.addAuthHeader = function (value, opts) {
  return exports.addHeader('Authorization', value, opts);
};


exports.makeRequest = function (method, url, data, yea, nay, opts) {
  if (!url) {
    return nay('no_url');
  }
  var req = new XMLHttpRequest();
  req.open(method, url, true);
  if (opts && opts.headers) {
    Object.keys(opts.headers).forEach(function (key) {
      req.setRequestHeader(key, opts.headers[key]);
    });
  }
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status >= 200 && req.status < 400) {
        return yea(req.responseText);
      }
      if (req.status >= 400 && req.status < 500) {
        return nay('client_error');
      }
      if (req.status >= 500) {
        return nay('server_error');
      }
      return nay('unknown_error');
    }
  };
  if (data && data.length) {
    req.send(data);
  } else {
    req.send();
  }
};


exports.getResource = function (url, yea, nay, opts) {
  exports.makeRequest('GET', url, null, yea, nay, opts);
};


exports.postResource = function (url, data, yea, nay, opts) {
  exports.makeRequest('POST', url, data, yea, nay, opts);
};
