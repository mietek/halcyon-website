---
title: Haskell application deployment
page-description: Halcyon is a system for deploying Haskell web and non-web applications.
page-class: hero tweak-gallery tweak-listings
page-data:
- key: min-section-link-level
  value: 1
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

Any Haskell application can be deployed with a [single command](#usage), using explicitly declared versions of GHC, libraries, build-tools, and other dependencies.

Halcyon aims to achieve 100% reproducible build results, while keeping deploy times under 30 seconds.


### Support

**Pre-release version.  For updates, please sign up to the [Halcyon announcements list](http://eepurl.com/8KXr9), or follow <a href="https://twitter.com/mietek">@mietek</a>.**

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

The <a href="irc://chat.freenode.net/haskell-deployment">#haskell-deployment</a> IRC channel on [freenode](https://freenode.net/) is a good place to ask questions and find answers.

Need commercial support?  Contact the [author](#about) directly.


Example applications
--------------------

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


#### “Hello, world!” shootout

<div><nav>
<ul class="menu open">
<li><a href="/examples/#hello-happstack">_hello-happstack_</a></li>
<li><a href="/examples/#hello-mflow">_hello-mflow_</a></li>
<li><a href="/examples/#hello-miku">_hello-miku_</a></li>
<li><a href="/examples/#hello-scotty">_hello-scotty_</a></li>
<li><a href="/examples/#hello-simple">_hello-simple_</a></li>
<li><a href="/examples/#hello-snap">_hello-snap_</a></li>
<li><a href="/examples/#hello-spock">_hello-spock_</a></li>
<li><a href="/examples/#hello-wai">_hello-wai_</a></li>
<li><a href="/examples/#hello-wheb">_hello-wheb_</a></li>
<li><a href="/examples/#hello-yesod">_hello-yesod_</a></li>
</ul>
</nav></div>


Usage
-----

Halcyon is installed with _git_, and automatically keeps itself up-to-date.

```
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <( ~/halcyon/halcyon paths )
```

[`halcyon paths`](/reference/#paths) helps set environment variables.  See the [user’s guide](/guide/#installing-halcyon) for details.


### Deploying

Halcyon speeds up deployment by archiving dependencies in _layers_.

GHC, _cabal-install_ and the Cabal package database, the application sandbox—once built, each of these layers is archived separately from the application build and install directories.


#### Deploying an application

[`halcyon deploy`](/reference/#deploy) accepts directories, Cabal packages, and _git_ URLs.

With an application install archive available, deploying an application is expected to take less than 10 seconds.

<div class="toggle">
<a class="toggle-button" data-target="deploy1" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="deploy1"><code># halcyon deploy <a href="https://github.com/mietek/hello/">https://github.com/mietek/hello</a>
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


#### Deploying an environment

[`halcyon deploy`](/reference/#deploy) can also install a full Haskell development environment.  With layer archives available, this is expected to take less than 20 seconds.

<div class="toggle">
<a class="toggle-button" data-target="deploy2" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="deploy2"><code># halcyon deploy
-----> Deploying environment
       GHC version:                              <b>7.8.3</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>
       External storage:                         <b>public</b>

-----> Restoring GHC layer
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.3.tar.gz... done
       Extracting halcyon-ghc-7.8.3.tar.gz... done, 701MB

-----> Locating Cabal layers
       Listing s3://s3.halcyon.sh/?prefix=linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-... done
-----> Restoring Cabal layer
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2014-11-19.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-11-19.tar.gz... done, 169MB

-----> Environment deployed
</code></pre>
</div>


### Documentation

<div><nav>
<ul class="menu open">
<li><a href="/guide/">User’s guide</a></li>
<li><a href="/reference/">Programmer’s reference</a></li>
<li><a href="https://github.com/mietek/halcyon/">Source code</a></li>
<li><a href="https://bashmenot.mietek.io/reference/">_bashmenot_ programmer’s reference</a></li>
<li><a href="https://github.com/mietek/bashmenot/">_bashmenot_ source code</a></li>
</ul>
</nav></div>

Halcyon is built with [_bashmenot_](https://bashmenot.mietek.io/), a library of shell functions.


About
-----

<span id="mietek"></span>

My name is [Miëtek Bak](https://mietek.io/).  I make software, and Halcyon is one of [my projects](https://mietek.io/projects/).

This work is published under the [MIT X11 license](/license/), and supported by my company, [Least Fixed](https://leastfixed.com/).

Like my work?  I am available for consulting.  Say <a class="hello" href="">hello</a>, or follow <a href="https://twitter.com/mietek">@mietek</a>.


### Acknowledgments

Thanks to [CircuitHub](https://circuithub.com/), [Purely Agile](http://purelyagile.com/), and [Tweag I/O](http://tweag.io/) for advice and assistance.

The monospaced font used in this website is [PragmataPro](http://fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).

The welcome image is based on [Altocumulus Cloud](https://flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://flickr.com/photos/kubina/).

Website built with [_cannot_](https://cannot.mietek.io/).
