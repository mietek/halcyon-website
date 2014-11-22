---
title: Haskell application deployment
page-description: Halcyon is a system for deploying Haskell web and non-web applications.
page-class: hero tweak-listings
header-class: hero
main-class: hero
hero: |
  <h1 class="logotype">Halcyon</h1>
  <p>Deploy any Haskell application.  Instantly.</p>
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

Halcyon is a system for deploying Haskell web and non-web applications.

Any Haskell application can be deployed with a [single command](#deploying-an-application), using explicitly declared versions of GHC, libraries, build-tools, and other dependencies.

Halcyon aims to achieve 100% reproducible build results, while keeping deploy times under 30 seconds.


### Support

**Pre-release version.  For updates, please sign up to the [Halcyon announcements list](http://eepurl.com/8KXr9), or follow <a href="https://twitter.com/mietek">@mietek</a>.**

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

The <a href="irc://chat.freenode.net/haskell-deployment">#haskell-deployment</a> IRC channel on [freenode](https://freenode.net/) is a good place to ask questions and find answers.

Need commercial support?  Contact the [author](#about) directly.


Usage
-----

Halcyon is installed with _git_, and automatically keeps itself up-to-date.  [`halcyon paths`](/reference/#halcyon-paths) helps set environment variables.

```
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <( ~/halcyon/halcyon paths )
```


### Deploying an application

[`halcyon deploy`](/reference/#halcyon-deploy) accepts directories, Cabal packages, and _git_ URLs.

<div class="toggle">
<a class="toggle-button" data-target="log2" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log2"><code># halcyon deploy https://github.com/mietek/hello
-----> Cloning https://github.com/mietek/hello... done, 197a7ad
-----> Deploying app from install
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-1.0</b>
       Source hash:                              <b>e64e9a7</b>
       External storage:                         <b>public</b>

-----> Restoring install
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-install-e64e9a7-hello-1.0.tar.gz... done
       Extracting halcyon-install-e64e9a7-hello-1.0.tar.gz... done, 872KB
-----> Install restored
-----> Installing app in /app... done, 868KB

-----> App deployed:                             <b>hello-1.0</b>
</code></pre>
</div>

Deploying an application from an install archive is expected to take less than 10 seconds.


### Installing an environment

With no arguments, [`halcyon deploy`](/reference/#halcyon-deploy) installs a full Haskell development environment.

<div class="toggle">
<a class="toggle-button" data-target="log1" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log1"><code># halcyon deploy
-----> Deploying environment
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.3.tar.gz... done
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB
-----> GHC layer restored:                       <b>7.8.3</b>

-----> Locating Cabal layers
       Listing s3://s3.halcyon.sh/?prefix=linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-... done
-----> Restoring Cabal layer
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2014-11-19.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-19.tar.gz... done, 169MB
-----> Cabal layer restored:                     <b>1.20.0.3 (Hackage 2014-11-19)</b>

-----> Environment deployed
</code></pre>
</div>

Installing GHC, _cabal-install_, and an up-to-date Cabal package database is expected to take less than 20 seconds.


### Examples

#### Real-world applications

> Details                                                 | Live website
> --------------------------------------------------------|---------------
> [_hl_](/examples/#hl)                                   | —
> [_howistart.org_](/examples/#howistart.org)             | [How I Start](https://mietek-howistart.herokuapp.com/)
> [_tryhaskell_](/examples/#tryhaskell)                   | [Try Haskell](https://mietek-tryhaskell.herokuapp.com/)
> [_tryidris_](/examples/#tryidris)                       | [Try Idris](https://mietek-tryidris.herokuapp.com/)
> [_trypurescript_](/examples/#trypurescript)             | [Try Purescript](https://mietek-trypurescript.herokuapp.com/)
> [_tryhplay_](/examples/#tryhplay)                       | [Try Haste](https://mietek-tryhplay.herokuapp.com/)
> [_gitit_](/examples/#gitit)                             | [gitit](https://mietek-gitit.herokuapp.com/)
> [_mailchimp-subscribe_](/examples/#mailchimp-subscribe) | —


#### “Hello, world!” applications

> Details                                                 | Framework
> --------------------------------------------------------|----------------
> [_hello-happstack_](/examples/#hello-happstack)         | [Happstack](http://happstack.com/) Lite 7.3.5
> [_hello-mflow_](/examples/#hello-mflow)                 | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> [_hello-miku_](/examples/#hello-miku)                   | [_miku_](https://github.com/nfjinjing/miku/) 2014.5.19
> [_hello-scotty_](/examples/#hello-scotty)               | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> [_hello-simple_](/examples/#hello-simple)               | [Simple](http://simple.cx/) 0.10.0.2
> [_hello-snap_](/examples/#hello-snap)                   | [Snap](http://snapframework.com/) 0.9.6.3
> [_hello-spock_](/examples/#hello-spock)                 | [Spock](https://github.com/agrafix/Spock/) 0.7.4.0
> [_hello-wai_](/examples/#hello-wai)                     | [WAI](https://hackage.haskell.org/package/wai/) 3.0.2
> [_hello-wheb_](/examples/#hello-wheb)                   | [Wheb](https://github.com/hansonkd/Wheb-Framework/) 0.3.1.0
> [_hello-yesod_](/examples/#hello-yesod)                 | [Yesod](http://yesodweb.com/) 1.4.0


### Documentation

- [User’s guide](/guide/)
- [Programmer’s reference](/reference/)
- [Source code](https://github.com/mietek/halcyon/)


#### Internals

Halcyon is built with [_bashmenot_](https://bashmenot.mietek.io/), a shell function library.

- [_bashmenot_ — Programmer’s reference](https://bashmenot.mietek.io/reference/)
- [_bashmenot_ — Source code](https://github.com/mietek/bashmenot/)


About
-----

<span id="mietek"></span>

My name is [Miëtek Bak](https://mietek.io/).  I make software, and Halcyon is one of [my projects](https://mietek.io/projects/).

This work is published under the [MIT X11 license](/license/), and supported by my company, [Least Fixed](https://leastfixed.com/).

Like my work?  I am available for consulting.  Say <a class="hello" href="">hello</a>, or follow <a href="https://twitter.com/mietek">@mietek</a>.


### Acknowledgments

Thanks to [CircuitHub](https://circuithub.com/), [Purely Agile](http://purelyagile.com/), and [Tweag I/O](http://tweag.io/) for advice and assistance.

The monospaced font used in this website is [PragmataPro](http://fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).  The welcome image is based on [Altocumulus Cloud](https://flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://flickr.com/photos/kubina/).  Website built with [_cannot_](https://cannot.mietek.io/).
