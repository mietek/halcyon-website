---
title: Haskell application deployment
page-class: hero
header-class: hero
main-class: hero
hero: |
  <h1 class="logotype">Halcyon</h1>
  <p>Haskell application deployment.</p>
page-footer: |
  <script>
    addEventListener('load', function () {
      [].forEach.call(document.getElementsByClassName('hello'), function (hello) {
        hello.href = cannot.rot13('znvygb:uryyb@zvrgrx.vb');
      });
    });
  </script>
---


Halcyon
=======

Halcyon is a system for fast and reliable deployment of Haskell applications, used by [_Haskell on Heroku_](http://haskellonheroku.com/).

**This page describes version 1.0, which is currently undergoing testing.  Check back soon, or follow <a href="http://twitter.com/mietek">@mietek</a>.**


Examples
--------

_Work in progress._


Usage
-----

```
$ halcyon deploy
```

To learn more, see the [full list of examples](examples/), and continue with the [user’s guide](guide/).

Interested in deploying Haskell web applications?  Try [_Haskell on Heroku_](http://haskellonheroku.com/).


### Installation

```
$ git clone https://github.com/mietek/halcyon
```


### Dependencies

Currently, Halcyon supports:

- Ubuntu [10.04 LTS](http://releases.ubuntu.com/10.04/), [12.04 LTS](http://releases.ubuntu.com/12.04/), and [14.04 LTS](http://releases.ubuntu.com/14.04/) (64-bit)
- GHC [7.6.1](http://www.haskell.org/ghc/download_ghc_7_6_1), [7.6.3](http://www.haskell.org/ghc/download_ghc_7_6_3), [7.8.2](http://www.haskell.org/ghc/download_ghc_7_8_2), and [7.8.3](http://www.haskell.org/ghc/download_ghc_7_8_3)
- _cabal-install_ [1.20.0.0](http://www.haskell.org/cabal/download.html) and newer

Halcyon requires:

- [GNU _bash_](http://gnu.org/software/bash/) 4 or newer
- [GNU _date_](http://gnu.org/software/coreutils/manual/html_node/date-invocation.html)
- [GNU _sort_](http://gnu.org/software/coreutils/manual/html_node/sort-invocation.html)
- [_curl_](http://curl.haxx.se/)
- [OpenSSL](https://www.openssl.org/)
- [_bashmenot_](http://bashmenot.mietek.io/)


### Internals

For an in-depth discussion of Halcyon internals, see the [programmer’s reference](reference/).

Halcyon is built with [_bashmenot_](http://bashmenot.mietek.io/), a library of functions for safer shell scripting in [GNU _bash_](http://gnu.org/software/bash/).

Additional information is available in the [_bashmenot_ programmer’s reference](http://bashmenot.mietek.io/reference/).


### Bugs

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).

There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.


About
-----

<span id="mietek"><a class="hello" href=""></a></span>

My name is [Miëtek Bak](http://mietek.io/).  I make software, and Halcyon is one of [my projects](http://mietek.io/projects/).

This work is published under the [MIT X11 license](license/), and supported by my company, [Least Fixed](http://leastfixed.com/).

Would you like to work with me?  Say <a class="hello" href="">hello</a>.


### Acknowledgments

Thanks to [CircuitHub](https://circuithub.com/), [Tweag I/O](http://www.tweag.io/), and [Purely Agile](http://purelyagile.com/) for advice and assistance.

The monospaced font used in this website is [PragmataPro](http://www.fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://www.fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).

The welcome image is based on [Altocumulus Cloud](https://www.flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://www.flickr.com/photos/kubina/).
