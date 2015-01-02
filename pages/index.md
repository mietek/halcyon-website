---
title: System for installing Haskell applications
page-description: Halcyon is a system for installing Haskell applications.
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
  <p>Install any Haskell application.  Instantly.</p>
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

Halcyon is a system for installing Haskell applications.


#### Simple

- Halcyon uses regular Cabal packages, sandboxes, and repositories, such as Hackage.

- Halcyon does not require GHC to be installed, as it can install the right version of GHC for the application.

- Halcyon supports most recent GHC versions, including GHC 7.8.4.  [More…](/reference/#halcyon_ghc_version)

- Halcyon can install applications directly from _git_ repositories.  [More…](/guide/#basic-usage)


#### Fast

- Halcyon automatically archives, caches, and restores all build products, using both local and remote storage. [More…](/guide/#storage-and-caching)

- Halcyon can reuse previously built Cabal sandboxes as a base for building new sandboxes. [More…](/shootout/#shootout-results)

- Halcyon runs on most recent Linux distributions, including CentOS 7, Debian 7, Fedora 20, and Ubuntu 14.04.  [More…](/guide/#setting-up-a-machine)

- Halcyon can use the same archives on multiple systems, from development, to continuous integration and deployment.  [More…](/guide/#setting-up-multiple-machines)


<aside>
<a class="micro face mietek" href="#about"></a>
<blockquote>_“If Halcyon is not helping you install applications easily, there is a bug in Halcyon.”_</blockquote>
<p>[— Miëtek Bak](#about), with apologies to [Jordan Sissel](https://github.com/jordansissel/fpm)</p>
</aside>


#### Reliable

- Halcyon has been used in production since June 2014.  [More…](/examples/#circuithub)

- Halcyon includes workarounds for many _cabal-install_ issues, including [#220](https://github.com/haskell/cabal/issues/220),
[#713](https://github.com/haskell/cabal/issues/713), [#779](https://github.com/haskell/cabal/issues/779), [#784](https://github.com/haskell/cabal/issues/784), [#1883](https://github.com/haskell/cabal/issues/1883), [#1908](https://github.com/haskell/cabal/issues/1908), [#1915](https://github.com/haskell/cabal/issues/1915), [#1992](https://github.com/haskell/cabal/issues/1992), [#2265](https://github.com/haskell/cabal/issues/2265), and [#2309](https://github.com/haskell/cabal/issues/2309).

- Halcyon can automatically install dependencies which cause problems for _cabal-install_, such as _alex_ and _happy_.  [More…](/guide/#sandbox-extra-apps)

- Halcyon supports declaring dependencies and version constraints in a format easy to integrate with other tools.  [More…](/guide/#declaring-dependencies)


#### Powerful

- Halcyon can be used to construct deployment systems, such as [Haskell on DigitalOcean](https://halcyon.sh/deploy/), or [Haskell on Heroku](https://haskellonheroku.com/).

- Halcyon allows _git_ repositories to be declared as sandbox sources.  [More…](/guide/#sandbox-sources)

- Halcyon includes hooks for complete control over the build process.  [More…](/guide/#advanced-usage)

- Halcyon allows native OS packages to be declared and installed in a cross-platform fashion.  [More…](/guide/#sandbox-extra-os-packages)


<aside>
<a class="micro face tristan-sloughter" href="https://twitter.com/t_sloughter/status/539168929131003904"></a>
<blockquote>_“[Miëtek’s](#about) [Haskell on Heroku](https://haskellonheroku.com/) and Halcyon has made deploying [How I Start](https://howistart.org/) fast and simple!  Thanks!”_</blockquote>
<p>[— Tristan Sloughter](https://twitter.com/t_sloughter/status/539168929131003904), [How I Start](https://howistart.org/) author</p>
</aside>


### Support

The <a href="irc://chat.freenode.net/haskell-deployment">#haskell-deployment</a> IRC channel on [freenode](https://freenode.net/) is a good place to ask questions and find answers.

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

Need commercial support?  Contact the [author](#about) directly.


Usage
-----

The [`halcyon install`](/guide/#basic-usage) command is intended to be used instead of `cabal install`.  [More…](/guide/#basic-usage)

<div class="toggle">
<a class="toggle-button" data-target="log1" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log1"><code>$ halcyon install <a href="https://github.com/mietek/howistart">https://github.com/mietek/howistart</a>
-----> Cloning https://github.com/mietek/howistart... done, cc48e01
-----> Installing app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>howistart-0.1</b>
       Source hash:                              <b>bcfc50f</b>
       External storage:                         <b>private and public</b>

-----> Restoring install directory
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-install-bcfc50f-howistart-0.1.tar.gz... done
       Extracting halcyon-install-bcfc50f-howistart-0.1.tar.gz... done, 30MB
-----> Install directory restored
-----> Installing app into /app... done

-----> App installed:                            <b>howistart-0.1</b>
</code></pre>
</div>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/howistart">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/howistart">Deploy to Heroku</a>


### Installation

Halcyon can be installed in one command on most recent Linux distributions.  [More…](/guide/#setting-up-a-machine)

```
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
```


Examples
--------

All examples can be installed in one command on regular machines running most recent Linux distributions.  [More…](/guide/#setting-up-a-machine)

Additionally, all examples can be deployed in one click to a new [DigitalOcean](https://digitalocean.com/) droplet, using the prototype [Haskell on DigitalOcean](https://halcyon.sh/deploy/) interface, or to the [Heroku](https://heroku.com/) web application platform, using the [Haskell on Heroku](https://haskellonheroku.com/) buildpack.


### Example applications

[Real-world Haskell applications](/examples/), demonstrating advanced usage of Halcyon.

</section></section></div>
<div class="gallery-background">
<div class="wrapper">
<div class="gallery-frame" id="examples-gallery">
<div class="gallery-contents">
<a href="/examples/#circuithub" class="gallery-item" id="item-circuithub">CircuitHub</a>
<a href="/examples/#how-i-start" class="gallery-item" id="item-howistart">How I Start</a>
<a href="/examples/#haskell-language" class="gallery-item" id="item-hl">Haskell Language</a>
<a href="/examples/#try-haskell" class="gallery-item" id="item-tryhaskell">Try Haskell</a>
<a href="/examples/#try-idris" class="gallery-item" id="item-tryidris">Try Idris</a>
<a href="/examples/#try-purescript" class="gallery-item" id="item-trypurescript">Try PureScript</a>
<a href="/examples/#try-haste" class="gallery-item" id="item-tryhaste">Try Haste</a>
<a href="/examples/#gitit" class="gallery-item" id="item-gitit">Gitit</a>
</div></div></div></div>
<div class="wrapper"><section><section>

<div id="gallery-links"><nav>
<ul class="menu open">
<li><a class="gallery-link" href="/examples/#circuithub" id="link-circuithub">CircuitHub</a></li>
<li><a class="gallery-link" href="/examples/#how-i-start" id="link-howistart">How I Start</a></li>
<li><a class="gallery-link" href="/examples/#haskell-language" id="link-hl">Haskell Language</a></li>
<li><a class="gallery-link" href="/examples/#try-haskell" id="link-tryhaskell">Try Haskell</a></li>
<li><a class="gallery-link" href="/examples/#try-idris" id="link-tryidris">Try Idris</a></li>
<li><a class="gallery-link" href="/examples/#try-purescript" id="link-trypurescript">Try PureScript</a></li>
<li><a class="gallery-link" href="/examples/#try-haste" id="link-tryhaste">Try Haste</a></li>
<li><a class="gallery-link" href="/examples/#gitit" id="link-gitit">Gitit</a></li>
</ul>
</nav></div>


### “Hello, world!” shootout

[Simple applications](/shootout/), intended to compare build times and sizes across most Haskell web frameworks.

<div><nav><ul class="toc menu open">
<li class="space"><a href="/shootout/#shootout-results">Shootout results</a></li>
<li><a href="/shootout/#hello-apiary"><i>hello-apiary</i></a></li>
<li><a href="/shootout/#hello-happstack"><i>hello-happstack</i></a></li>
<li><a href="/shootout/#hello-mflow"><i>hello-mflow</i></a></li>
<li><a href="/shootout/#hello-miku"><i>hello-miku</i></a></li>
<li><a href="/shootout/#hello-scotty"><i>hello-scotty</i></a></li>
<li><a href="/shootout/#hello-simple"><i>hello-simple</i></a></li>
<li><a href="/shootout/#hello-snap"><i>hello-snap</i></a></li>
<li><a href="/shootout/#hello-spock"><i>hello-spock</i></a></li>
<li><a href="/shootout/#hello-wai"><i>hello-wai</i></a></li>
<li><a href="/shootout/#hello-wheb"><i>hello-wheb</i></a></li>
<li><a href="/shootout/#hello-yesod"><i>hello-yesod</i></a></li>
</ul></nav></div>


<aside>
<a class="micro face brian-mckenna" href=""></a>
<blockquote>_“Deployment of Haskell applications is getting interesting due to Miëtek’s Halcyon project.”_</blockquote>
<p>[— Brian McKenna](https://twitter.com/puffnfresh/status/527902645928087553), [Try Idris](/examples/#try-idris) author and [inspiration](http://brianmckenna.org/blog/haskell_buildpack_heroku) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>


Documentation
-------------

<div><nav>
<ul class="menu open">
<li><a href="/guide/">User’s guide</a></li>
<li><a href="/reference/">User’s reference</a></li>
</ul>
</nav></div>


### Internal documentation

Halcyon is written in [GNU _bash_](https://gnu.org/software/bash/), using the [_bashmenot_](https://bashmenot.mietek.io/) shell function library.

<div><nav>
<ul class="menu open">
<li><a href="https://github.com/mietek/halcyon">Source code</a></li>
<li><a href="https://bashmenot.mietek.io/reference/">_bashmenot_ programmer’s reference</a></li>
<li><a href="https://github.com/mietek/bashmenot">_bashmenot_ source code</a></li>
</ul>
</nav></div>


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

Thanks to [Joe Nelson](http://begriffs.com/), [Brian McKenna](http://brianmckenna.org/), and [Neuman Vong](https://github.com/luciferous/) for initial work on Haskell deployment.  Thanks to [CircuitHub](https://circuithub.com/), [Purely Agile](http://purelyagile.com/), and [Tweag I/O](http://tweag.io/) for advice and assistance.

The welcome image is based on [Altocumulus Cloud](https://flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://flickr.com/photos/kubina/).  The monospaced font is [PragmataPro](http://fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).  Website built with [_cannot_](https://cannot.mietek.io/).

This project is not affiliated with [DigitalOcean](https://digitalocean.com/) or [Heroku](https://heroku.com/).


<aside>
<a class="micro face joe-nelson" href="https://twitter.com/begriffs/status/522811714325475329"></a>
<blockquote>_“Check out Miëtek’s [Haskell on Heroku](https://haskellonheroku.com/) buildpack — it dynamically selects a pre-made Cabal sandbox for build speed.”_</blockquote>
<p>[— Joe Nelson](https://twitter.com/begriffs/status/522811714325475329), [inspiration](https://begriffs.com/posts/2013-08-22-haskell-on-heroku-omg-lets-get-this.html) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>
