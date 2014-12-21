'use strict';


exports.getInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


exports.getHostname = function () {
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
    color[exports.getInteger(0, color.length)] + '-' +
    food[exports.getInteger(0, food.length)] + '-' +
    exports.getInteger(1000, 9999)
  );
};
