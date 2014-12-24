'use strict';

window.easeScroll = require('ease-scroll');
window.cannot = require('cannot');
window.deploy = require('deploy');


window.tweakGalleryItems = function () {
  var items = document.getElementsByClassName('gallery-item');
  [].forEach.call(items, function (item) {
      var target = document.getElementById('link-' + item.id.slice(5));
      item.addEventListener('mouseover', function () {
          target.classList.add('hover');
        });
      item.addEventListener('mouseout', function () {
          target.classList.remove('hover');
        });
    });
};


window.tweakGalleryLinks = function () {
  var links = document.getElementsByClassName('gallery-link');
  [].forEach.call(links, function (link) {
      var target = document.getElementById('item-' + link.id.slice(5));
      link.addEventListener('mouseover', function () {
          target.classList.add('hover');
          var baseOffset = document.getElementById('gallery-links').getBoundingClientRect().left;
          window.easeScroll.scrollElementByIdToHorizontalOffset('examples-gallery', target.offsetLeft - baseOffset);
        });
      link.addEventListener('mouseout', function () {
          target.classList.remove('hover');
        });
    });
};



// TODO: Rewrite gallery and other widgets using React.

(function () {
  addEventListener('load', function () {
      if (document.documentElement.classList.contains('tweak-gallery')) {
        window.tweakGalleryItems();
        window.tweakGalleryLinks();
      }
    });
})();
