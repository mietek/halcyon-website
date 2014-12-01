---
title: Haskell application deployment
page-description: Halcyon is a system for deploying Haskell web and non-web applications.
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
  <p>Deploy any Haskell application.  Instantly.</p>
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

Halcyon is a system for deploying Haskell web and non-web applications, powering [Haskell on Heroku](https://haskellonheroku.com/).

> _“If Halcyon is not helping you deploy applications easily, then there is a bug in Halcyon.”_\
> — With apologies to [Jordan Sissel](https://github.com/jordansissel/fpm/)


### Features

- **Simple.**  Halcyon can deploy any Haskell application with a single command, building all required dependencies on the fly.

- **Fast.**  All build results are archived in layers, which means incremental builds can be deployed in under 30 seconds.

- **Reliable.**  Halcyon allows all build-time and run-time dependencies to be explicitly declared, achieving 100% reproducible results.


### Support

**Pre-release version.**  For updates, please sign up to the [Halcyon announcements list](http://eepurl.com/8KXr9), or follow <a href="https://twitter.com/halcyon_sh">@halcyon_sh</a>.

The <a href="irc://chat.freenode.net/haskell-deployment">#haskell-deployment</a> IRC channel on [freenode](https://freenode.net/) is a good place to ask questions and find answers.

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

Need commercial support?  Contact the [author](#about) directly.


Examples
--------

[Real-world Haskell applications](/examples/), demonstrating advanced Halcyon features.

</section></section></section></div>
<div class="gallery-background">
<div class="wrapper">
<div class="gallery-frame" id="examples-gallery">
<div class="gallery-contents">
<a href="/examples/#circuithub" class="gallery-item" id="item-circuithub">CircuitHub</a>
<a href="/examples/#how-i-start" class="gallery-item" id="item-howistart">How I Start</a>
<a href="/examples/#haskell-language" class="gallery-item" id="item-haskell-lang">Haskell Language</a>
<a href="/examples/#try-haskell" class="gallery-item" id="item-tryhaskell">Try Haskell</a>
<a href="/examples/#try-idris" class="gallery-item" id="item-tryidris">Try Idris</a>
<a href="/examples/#try-purescript" class="gallery-item" id="item-trypurescript">Try PureScript</a>
<a href="/examples/#try-haste" class="gallery-item" id="item-tryhaste">Try Haste</a>
<a href="/examples/#gitit" class="gallery-item" id="item-gitit">Gitit</a>
</div></div></div></div>
<div class="wrapper"><section><section><section>

<div id="gallery-links"><nav>
<ul class="menu open">
<li><a class="gallery-link" href="/examples/#circuithub" id="link-circuithub">CircuitHub</a></li>
<li><a class="gallery-link" href="/examples/#how-i-start" id="link-howistart">How I Start</a></li>
<li><a class="gallery-link" href="/examples/#haskell-language" id="link-haskell-lang">Haskell Language</a></li>
<li><a class="gallery-link" href="/examples/#try-haskell" id="link-tryhaskell">Try Haskell</a></li>
<li><a class="gallery-link" href="/examples/#try-idris" id="link-tryidris">Try Idris</a></li>
<li><a class="gallery-link" href="/examples/#try-purescript" id="link-trypurescript">Try PureScript</a></li>
<li><a class="gallery-link" href="/examples/#try-haste" id="link-tryhaste">Try Haste</a></li>
<li><a class="gallery-link" href="/examples/#gitit" id="link-gitit">Gitit</a></li>
</ul>
</nav></div>


### “Hello, world!” shootout

[Simple applications](/shootout/), intended to compare build times and sizes across most Haskell web frameworks.


Usage
-----

Halcyon is installed with _git_, and automatically keeps itself up-to-date.

The [`halcyon paths`](/reference/#halcyon-paths) command helps set environment variables.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">git clone <a href="https://github.com/mietek/halcyon/">https://github.com/mietek/halcyon</a></span>
<span class="prompt">$</span> <span class="input">source &lt;( halcyon/halcyon paths )</span>
</code></pre>


### Deploying

The [`halcyon deploy`](/reference/#halcyon-deploy) command accepts directories, Cabal packages, and _git_ URLs.

With an [install directory](/guide/#install-directory) archive available, deploying an application is expected to take less than 10 seconds.

<div class="toggle">
<a class="toggle-button" data-target="deploy1" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="deploy1"><code>$ halcyon deploy <a href="https://github.com/mietek/hello/">https://github.com/mietek/hello</a>
-----> Cloning https://github.com/mietek/hello... done, 3091b75
-----> Preparing source directory
-----> Deploying app from install
       Prefix:                                   <b>/app</b>
       Label:                                    <b>hello-1.0</b>
       Source hash:                              <b>a5d944b</b>
       External storage:                         <b>public</b>

-----> Restoring install
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-install-a5d944b-hello-1.0.tar.gz... done
       Extracting halcyon-install-a5d944b-hello-1.0.tar.gz... done, 876KB
-----> Install restored
-----> Installing app into /app... done

-----> App deployed:                             <b>hello-1.0</b>
</code></pre>
</div>


#### Deploying GHC and Cabal only

The [`halcyon deploy`](/reference/#halcyon-deploy) command can also be used to install a full Haskell development environment.

With the needed [layer](/guide/#layers) archives available, this can be ready in under 20 seconds.

<div class="toggle">
<a class="toggle-button" data-target="deploy2" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="deploy2"><code>$ halcyon deploy
-----> Deploying GHC and Cabal layers
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

-----> Restoring GHC layer
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.3.tar.gz... done
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Locating Cabal layers
       Listing s3://s3.halcyon.sh/?prefix=linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-... done
-----> Restoring Cabal layer
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2014-11-30.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-30.tar.gz... done, 172MB

-----> GHC and Cabal layers deployed
</code></pre>
</div>


### Documentation

<div><nav>
<ul class="menu open">
<li><a href="/guide/">User’s guide</a></li>
<li><a href="/reference/">Programmer’s reference</a></li>
<li><a href="https://github.com/mietek/halcyon/">Source code</a></li>
</nav></div>


#### Internal documentation

Halcyon is built with [_bashmenot_](https://bashmenot.mietek.io/), a library of shell functions.

<div><nav>
<ul class="menu open">
<li><a href="https://bashmenot.mietek.io/reference/">_bashmenot_ programmer’s reference</a></li>
<li><a href="https://github.com/mietek/bashmenot/">_bashmenot_ source code</a></li>
</ul>
</nav></div>


About
-----

<span id="mietek"></span>

My name is [Miëtek Bak](https://mietek.io/).  I make software, and Halcyon is one of [my projects](https://mietek.io/projects/).

This work is published under the [MIT X11 license](/license/), and supported by my company, [Least Fixed](https://leastfixed.com/).

Like my work?  I am available for consulting.  Say <a class="hello" href="">hello</a>, or follow <a href="https://twitter.com/mietek">@mietek</a>.


### Acknowledgments

Thanks to [CircuitHub](https://circuithub.com/), [Purely Agile](http://purelyagile.com/), and [Tweag I/O](http://tweag.io/) for advice and assistance.

Website built with [_cannot_](https://cannot.mietek.io/).  The monospaced font used is [PragmataPro](http://fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).

The welcome image is based on [Altocumulus Cloud](https://flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://flickr.com/photos/kubina/).

This project is not affiliated with [Heroku](https://heroku.com/), [DigitalOcean](https://digitalocean.com/), or [Amazon](https://amazon.com/).
