---
title: System for installing Haskell apps
page-description: Halcyon is a system for installing Haskell apps and development tools.
page-class: hero tweak-gallery tweak-listings
page-data:
- key: min-section-link-level
  value: 1
- key: min-back-link-level
  value: 2
- key: h2-back-link-target
  value: halcyon
header-class: hero
main-class: hero
hero: |
  <h1 class="logotype">Halcyon</h1>
  <p>System for installing Haskell apps</p>
  <div id="hero-button"><a href="#halcyon" title="More">More</a></div>
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

Halcyon is a system for installing [Haskell](https://haskell.org/) apps and development tools, including [GHC](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/) and [Cabal](https://haskell.org/cabal/users-guide/).

**Follow the [Halcyon tutorial](/tutorial/) to get started.**


### Features

#### Simple

- Halcyon uses regular Cabal packages, sandboxes, and repositories.

- Halcyon does not require GHC to be installed, as it can install the right version of GHC for the app.


#### Fast

- Halcyon archives and caches all build products, optionally uploading archives to external storage.

- Halcyon automatically restores archived build products, saving time during development, continuous integration, and deployment.


#### Reliable

- Halcyon has been used in production since [June 2014](/examples/#circuithub).

- Halcyon includes solutions for many _cabal-install_ issues, such as [`#220`](https://github.com/haskell/cabal/issues/220),
[`#571`](https://github.com/haskell/cabal/issues/571), [`#713`](https://github.com/haskell/cabal/issues/713), [`#779`](https://github.com/haskell/cabal/issues/779), [`#784`](https://github.com/haskell/cabal/issues/784), [`#1534`](https://github.com/haskell/cabal/issues/1534), [`#1883`](https://github.com/haskell/cabal/issues/1883), [`#1908`](https://github.com/haskell/cabal/issues/1908), [`#1915`](https://github.com/haskell/cabal/issues/1915), [`#1992`](https://github.com/haskell/cabal/issues/1992), [`#2189`](https://github.com/haskell/cabal/issues/2189), [`#2265`](https://github.com/haskell/cabal/issues/2265), and [`#2309`](https://github.com/haskell/cabal/issues/2309).


#### Powerful

- Halcyon allows [sandbox sources](/reference/#halcyon_sandbox_sources), [build tools](/reference/#halcyon_sandbox_extra_apps), and [native OS packages](/reference/#halcyon_sandbox_extra_os_packages) to be declared as dependencies and installed together with the app.

- Halcyon can be used to construct deployment systems, such as [Haskell on Heroku](https://haskellonheroku.com/).


<aside>
<a class="micro face tristan-sloughter" href="https://twitter.com/t_sloughter/status/539168929131003904"></a>
<blockquote>_“[Miëtek’s](#about) [Haskell on Heroku](https://haskellonheroku.com/) and Halcyon has made deploying [How I Start](/examples/#how-i-start) fast and simple!  Thanks!”_</blockquote>
<p>[— Tristan Sloughter](https://twitter.com/t_sloughter/status/539168929131003904), [How I Start](/examples/#how-i-start) author</p>
</aside>


### Support

The <a href="irc://chat.freenode.net/haskell-deployment">`#haskell-deployment`</a> IRC channel on [_freenode_](https://freenode.net/) is a good place to ask questions and find answers.

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues) for problems with the documentation.

Need commercial support?  Contact the [author](#about) directly.


### Examples

- See the [Halcyon examples](/examples/) for a demonstration of advanced Halcyon features.

- Take a look at the [Halcyon shootout](/shootout/) for a comparison of build times and sizes across most Haskell web frameworks.

All example apps can be installed in one command on most recent Linux distributions, including CentOS 7, Debian 7, Fedora 20, and Ubuntu 14.04.

Additionally, all example apps can be deployed in one click to [DigitalOcean](https://digitalocean.com) or [Heroku](https://heroku.com/).


<aside>
<a class="micro face mietek" href="#about"></a>
<blockquote>_“If Halcyon is not helping you install apps easily, there is a bug in Halcyon.”_</blockquote>
<p>[— Miëtek Bak](#about), with apologies to [Jordan Sissel](https://github.com/jordansissel/fpm)</p>
</aside>


Usage
-----

Halcyon provides the [`halcyon install`](/reference/#halcyon-install) command, which can be used to install Haskell apps:

```
$ halcyon install https://github.com/mietek/halcyon-tutorial
-----> Cloning https://github.com/mietek/halcyon-tutorial... done, f1ccdd9
-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **b90bb47**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b90bb47-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-install-b90bb47-halcyon-tutorial-1.0.tar.gz... done, 8.8MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**
```


### Installation

Halcyon can be installed by cloning the [Halcyon source repository](https://github.com/mietek/halcyon):

```
$ git clone https://github.com/mietek/halcyon
```

Alternatively, you can run the [Halcyon setup script](https://github.com/mietek/halcyon/blob/master/setup.sh), which also installs the necessary OS packages and sets up the environment:

```
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
```


### Documentation

- **Start with the [Halcyon tutorial](/tutorial/) to learn how to develop a simple Haskell web app using Halcyon.**

- See the [Halcyon reference](/reference/) for a complete list of available commands and options.

- Read the [Haskell on Heroku tutorial](https://haskellonheroku.com/tutorial/) to learn how to deploy Haskell web apps to [Heroku](https://heroku.com/).


#### Internals

Halcyon is written in [GNU _bash_](https://gnu.org/software/bash/), using the [_bashmenot_](https://bashmenot.mietek.io/) library.

- Read the [Halcyon source code](https://github.com/mietek/halcyon) to understand how it works.


<aside>
<a class="micro face joe-nelson" href="https://twitter.com/begriffs/status/522811714325475329"></a>
<blockquote>_“Check out Miëtek’s [Haskell on Heroku](https://haskellonheroku.com/) buildpack — it dynamically selects a pre-made Cabal sandbox for build speed.”_</blockquote>
<p>[— Joe Nelson](https://twitter.com/begriffs/status/522811714325475329), [inspiration](https://begriffs.com/posts/2013-08-22-haskell-on-heroku-omg-lets-get-this.html) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>


About
-----

<div class="aside-like">
<a class="face mietek" href="https://mietek.io/"></a>
<blockquote>_My name is [Miëtek Bak](https://mietek.io/).  I make software, and Halcyon is one of [my projects](https://mietek.io/projects/)._

_This work is published under the [MIT X11 license](/license/), and supported by my company, [Least Fixed](https://leastfixed.com/)._

_Like my work?  I am available for consulting.  Say <a class="hello" href="">hello</a>, or follow <a href="https://twitter.com/mietek">@mietek</a>._
</blockquote>
</div>


### Acknowledgments

Thanks to [Joe Nelson](http://begriffs.com/), [Brian McKenna](http://brianmckenna.org/), and [Neuman Vong](https://github.com/luciferous) for initial work on Haskell deployment.  Thanks to [CircuitHub](https://circuithub.com/), [Purely Agile](http://purelyagile.com/), and [Tweag I/O](http://tweag.io/) for advice and assistance.

The welcome image is based on [Altocumulus Cloud](https://flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://flickr.com/photos/kubina/).  The monospaced font is [PragmataPro](http://fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).  Website built with [_cannot_](https://cannot.mietek.io/).

Thanks to [Fastly](https://fastly.com/) for providing low-latency access to Halcyon public storage.

This project is not affiliated with [DigitalOcean](https://digitalocean.com/) or [Heroku](https://heroku.com/).
