'use strict';

window.easeScroll = require('ease-scroll');
window.magic = require('cannot');


function addToc(level, container, containerHeading) {
  if (level === 4) {
    return;
  }
  var nav = document.createElement('nav');
  var toc = document.createElement('ul');
  nav.appendChild(toc);
  toc.classList.add('menu');
  toc.classList.add('open');
  toc.classList.add('toc');
  toc.classList.add('toc' + level);
  var sections = container.getElementsByClassName('level' + (level + 1));
  var items = 0;
  [].forEach.call(sections, function (section) {
    items += 1;
    var sectionHeading = section.getElementsByTagName('h' + (level + 1))[0];
    var tocItem = document.createElement('li');
    toc.appendChild(tocItem);
    var tocLink = document.createElement('a');
    tocItem.appendChild(tocLink);
    tocLink.appendChild(document.createTextNode(sectionHeading.textContent));
    tocLink.href = '#' + section.id;
    tocLink.title = sectionHeading.textContent + ', description of';
    var backLink = document.createElement('a');
    sectionHeading.appendChild(backLink);
    backLink.href = '#' + container.id;
    backLink.title = containerHeading.textContent.replace(/↩/, '') + ', contents of';
    backLink.classList.add('backlink');
    backLink.appendChild(document.createTextNode('↩'));
    addToc(level + 1, section, sectionHeading);
  });
  if (items) {
    container.insertBefore(nav, sections[0]);
  }
}


function fixLocalLinks() {
  function listener(id) {
    return function (event) {
      event.preventDefault();
      window.easeScroll.scrollToElementById(id, 1000);
    };
  }
  var local = window.location.origin + window.location.pathname;
  var links = document.links;
  for (var i = 0; i < links.length; i+= 1) {
    var href = links[i].getAttribute('href');
    if (href[0] === '#') {
      var id = href.slice(1);
      links[i].href = local + href;
      links[i].addEventListener('click', listener(id));
    }
  }
}


window.addEventListener('load', function () {
  if (document.body.classList.contains('toc')) {
    var container = document.getElementsByClassName('level1')[0];
    var containerHeading = container.getElementsByTagName('h1')[0];
    addToc(1, container, containerHeading);
  }
  fixLocalLinks();
});
