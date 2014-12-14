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


### Features

- **Simple.**  Halcyon can install any Haskell application with a single command, building all required dependencies on the fly.

- **Fast.**  All build results are archived in _layers,_ which means incremental builds can be ready in under 30 seconds.

- **Reliable.**  Halcyon allows all build-time and run-time dependencies to be explicitly declared, aiming to achieve 100% reproducible results.


### Support

_**Work in progress.**  For updates, please sign up to the [Halcyon announcements list](http://eepurl.com/8N3tj), or follow <a href="https://twitter.com/mietek">@mietek</a>._

The <a href="irc://chat.freenode.net/haskell-deployment">#haskell-deployment</a> IRC channel on [freenode](https://freenode.net/) is a good place to ask questions and find answers.

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

Need commercial support?  Contact the [author](#about) directly.


<aside>
<a class="micro face mietek" href="#about"></a>
<blockquote>_“If Halcyon is not helping you deploy applications easily, there is a bug in Halcyon.”_</blockquote>
<p>[— Miëtek Bak](#about), with apologies to [Jordan Sissel](https://github.com/jordansissel/fpm)</p>
</aside>


Examples
--------

Halcyon is being used in production since June 2014, enabling push-button deployment of Haskell applications to the [Heroku](https://heroku.com/) web application platform, as [Haskell on Heroku](https://haskellonheroku.com/).

All examples can be deployed to Heroku just by pushing a button.


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


<aside>
<a class="micro face tristan-sloughter" href="https://twitter.com/t_sloughter/status/539168929131003904"></a>
<blockquote>_“[Miëtek’s](#about) [Haskell on Heroku](https://haskellonheroku.com/) and Halcyon has made deploying [How I Start](https://howistart.org/) fast and simple!  Thanks!”_</blockquote>
<p>[— Tristan Sloughter](https://twitter.com/t_sloughter/status/539168929131003904), [How I Start](https://howistart.org/) author</p>
</aside>


Usage
-----

Halcyon is installed with _git_, and automatically updates itself before executing any command.

The [`halcyon paths`](/reference/#halcyon-paths) command helps set the needed environment variables.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">git clone <a href="https://github.com/mietek/halcyon">https://github.com/mietek/halcyon</a></span>
<span class="prompt">$</span> <span class="input">source &lt;( halcyon/halcyon paths )</span>
</code></pre>

See the [user’s guide](/guide/) for details.


### Installing applications

The [`halcyon install`](/reference/#halcyon-install) command accepts directories, Cabal packages, and _git_ URLs.

Installing a previously built application usually takes less than 10 seconds.

<div class="toggle">
<a class="toggle-button" data-target="log1" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log1"><code>$ halcyon install <a href="https://github.com/mietek/howistart">https://github.com/mietek/howistart</a>
-----> Cloning https://github.com/mietek/howistart... done, cc48e01
-----> Installing app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>howistart-0.1</b>
       Source hash:                              <b>bcfc50f</b>
       External storage:                         <b>private and public</b>

-----> Restoring install
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-install-bcfc50f-howistart-0.1.tar.gz... done
       Extracting halcyon-install-bcfc50f-howistart-0.1.tar.gz... done, 30MB
-----> Install restored
-----> Installing app into /app... done

-----> App installed:                            <b>howistart-0.1</b>
</code></pre>
</div>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/howistart">Deploy **How I Start** to Heroku</a>


#### Installing GHC and Cabal only

The [`halcyon install`](/reference/#halcyon-install) command can also install a previously built Haskell development environment in under 20 seconds.

<div class="toggle">
<a class="toggle-button" data-target="log2" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log2"><code>$ halcyon install
-----> Installing GHC and Cabal layers
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
       Downloading s3://s3.halcyon.sh/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2014-12-01.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2014-12-01.tar.gz... done, 172MB

-----> GHC and Cabal layers installed
</code></pre>
</div>


### Documentation

<div><nav>
<ul class="menu open">
<li><a href="/guide/">User’s guide</a></li>
<li><a href="/reference/">User’s reference</a></li>
</ul>
</nav></div>


#### Internal documentation

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

This project is not affiliated with [Heroku](https://heroku.com/), [DigitalOcean](https://digitalocean.com/), or [Amazon](https://amazon.com/).


<aside>
<a class="micro face brian-mckenna" href=""></a>
<blockquote>_“Deployment of Haskell applications is getting interesting due to Miëtek’s Halcyon project.”_</blockquote>
<p>[— Brian McKenna](https://twitter.com/puffnfresh/status/527902645928087553), [Try Idris](/examples/#try-idris) author and [inspiration](http://brianmckenna.org/blog/haskell_buildpack_heroku) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
<a class="micro face joe-nelson" href="https://twitter.com/begriffs/status/522811714325475329"></a>
<blockquote>_“Check out Miëtek’s [Haskell on Heroku](https://haskellonheroku.com/) buildpack — it dynamically selects a pre-made Cabal sandbox for build speed.”_</blockquote>
<p>[— Joe Nelson](https://twitter.com/begriffs/status/522811714325475329), [inspiration](https://begriffs.com/posts/2013-08-22-haskell-on-heroku-omg-lets-get-this.html) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>
