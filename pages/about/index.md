---
title: About
page-head: |
  <style>
    header a.link-about {
      color: #3f96f0;
    }
  </style>
page-footer: |
  <script>
    addEventListener('load', function () {
      document.getElementById('hello').href = cannot.rot13('znvygb:uryyb@yrnfgsvkrq.pbz');
    });
  </script>
---


About
=====

Halcyon is a system for deploying [Haskell](http://haskell.org/) applications rapidly and reliably.

To get started with Halcyon, see the [examples](.), and continue with the [user’s guide](guide/).

Interested in deploying Haskell web applications?  Try [Haskell on Heroku](http://haskellonheroku.com/).


### Internals

For an in-depth discussion of Halcyon internals, see the [programmer’s reference](reference/).

Halcyon is built with [_bashmenot_](http://bashmenot.mietek.io/), a library of functions for safer shell scripting in [GNU _bash_](http://gnu.org/software/bash/).

Additional information is available in the [_bashmenot_ programmer’s reference](http://bashmenot.mietek.io/reference/).


### Installation

```
$ git clone https://github.com/mietek/bashmenot.git
$ git clone https://github.com/mietek/halcyon.git
```

Also available as a [Bower](http://bower.io/) package.

```
$ bower install halcyon
```


### Dependencies

Halcyon requires:

- [GNU _bash_](http://gnu.org/software/bash/) 4 or newer
- [GNU _date_](https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html)
- [GNU _sort_](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)
- [_curl_](http://curl.haxx.se/)
- [OpenSSL](https://www.openssl.org/)
- [_bashmenot_](http://bashmenot.mietek.io/)


Support
-------

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

Commercial support for Halcyon is offered by [Least Fixed](http://leastfixed.com/), a functional software consultancy.

Need help?  Say <a href="" id="hello">hello</a>.


Ac­knowl­edg­ments
---------------

Thanks to [CircuitHub](https://circuithub.com/), [Tweag I/O](http://www.tweag.io/), and [Purely Agile](http://purelyagile.com/) for advice and assistance.

The sans-serif font used in this website is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).  The monospaced font is [PragmataPro](http://www.fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://www.fsd.it/).

The welcome image is based on [Altocumulus Cloud](https://www.flickr.com/photos/kubina/146306532/) by [Jeff Kubina](https://www.flickr.com/photos/kubina/).

This website is built with [_cannot_](http://cannot.mietek.io/).


License
-------

Made by [Miëtek Bak](http://mietek.io/).  Published under the [MIT X11 license](license/).
