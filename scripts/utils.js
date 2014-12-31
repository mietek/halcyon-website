'use strict';


exports.getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


exports.getRandomHostname = function () {
  var color = [
    'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'magenta'
  ];
  var food = [
    'apple', 'apricot', 'artichoke', 'asparagus', 'avocado',
    'banana', 'beet', 'broccoli',
    'cabbage', 'carrot',  'celery', 'cherry', 'coconut', 'cucumber',
    'date',
    'eggplant', 'elderberry', 'endive',
    'fennel', 'fig',
    'garlic', 'grape', 'guava',
    'horseradish', 'huckleberry',
    'ilama',
    'jackfruit', 'jujube',
    'kale', 'kiwi',
    'leek', 'lemon', 'lentil', 'lettuce', 'lychee',
    'mango', 'melon',
    'nectarine',
    'olive', 'onion',
    'parsnip', 'peach', 'pear', 'pineapple', 'plum', 'potato', 'pumpkin',
    'quince',
    'radish', 'raspberry', 'rhubarb',
    'shallot', 'spinach', 'strawberry',
    'tangerine', 'tomato', 'turnip',
    'ugli',
    'voavanga',
    'watercress', 'watermelon',
    'xigua',
    'yam',
    'zucchini'
  ];
  return (
    color[exports.getRandomInteger(0, color.length)] + '-' +
    food[exports.getRandomInteger(0, food.length)] + '-' +
    exports.getRandomInteger(1000, 9999)
  );
};


exports.debounce = function (func, duration) {
  var timeout;
  return function () {
    var that = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        func.apply(that, args);
      },
      duration);
  };
};


exports.update = function (target, source) {
  Object.keys(source || {}).forEach(function (key) {
      target[key] = source[key];
    });
};


exports.store = function (key, value) {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};


exports.storeJson = function (key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};


exports.load = function (key) {
  return localStorage.getItem(key);
};


exports.loadJson = function (key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
};
