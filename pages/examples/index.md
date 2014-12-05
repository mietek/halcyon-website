---
title: Example applications
page-class: tweak-gallery tweak-listings
page-head: |
  <style>
    header a.link-examples {
      color: #3f96f0;
    }
  </style>
---


Example applications { .with-toc }
====================

Real-world Haskell applications, demonstrating advanced Halcyon features.


</section></div>
<div class="gallery-background">
<div class="wrapper">
<div class="gallery-frame" id="examples-gallery">
<div class="gallery-contents">
<a href="#circuithub" class="gallery-item" id="item-circuithub">CircuitHub</a>
<a href="#how-i-start" class="gallery-item" id="item-howistart">How I Start</a>
<a href="#haskell-language" class="gallery-item" id="item-hl">Haskell Language</a>
<a href="#try-haskell" class="gallery-item" id="item-tryhaskell">Try Haskell</a>
<a href="#try-idris" class="gallery-item" id="item-tryidris">Try Idris</a>
<a href="#try-purescript" class="gallery-item" id="item-trypurescript">Try PureScript</a>
<a href="#try-haste" class="gallery-item" id="item-tryhaste">Try Haste</a>
<a href="#gitit" class="gallery-item" id="item-gitit">Gitit</a>
</div></div></div></div>
<div class="wrapper"><section class="level1">

<div id="gallery-links"><nav>
<ul class="menu open">
<li><a class="gallery-link" href="#circuithub" id="link-circuithub">CircuitHub</a></li>
<li><a class="gallery-link" href="#how-i-start" id="link-howistart">How I Start</a></li>
<li><a class="gallery-link" href="#haskell-language" id="link-hl">Haskell Language</a></li>
<li><a class="gallery-link" href="#try-haskell" id="link-tryhaskell">Try Haskell</a></li>
<li><a class="gallery-link" href="#try-idris" id="link-tryidris">Try Idris</a></li>
<li><a class="gallery-link" href="#try-purescript" id="link-trypurescript">Try PureScript</a></li>
<li><a class="gallery-link" href="#try-haste" id="link-tryhaste">Try Haste</a></li>
<li><a class="gallery-link" href="#gitit" id="link-gitit">Gitit</a></li>
</ul>
</nav></div>

For simple applications, see the [shootout](/shootout/).


CircuitHub
----------

> ---------------------|---
> Website:             | [CircuitHub](https://circuithub.com/)
> Author:              | [CircuitHub team](https://circuithub.com/about/team)
> Framework:           | [Yesod](http://yesodweb.com/) 1.2.19
> Source code:         | _private_

Electronics manufacturing service, built for hardware startups.

Using Halcyon in production since June 2014, via [Haskell on Heroku](https://haskellonheroku.com/).


#### Magic files

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) — build-time dependency on _alex_
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) — version constraints for dependencies of _alex_
- [`sandbox-extra-os-packages`](/reference/#halcyon_sandbox_extra_os_packages) — build-time dependency on the OS _libpcre_ library
- [`sandbox-sources`](/reference/#halcyon_sandbox_sources) — build-time dependencies on private packages

<aside>
<a class="micro face rehno-lindeque" href="https://twitter.com/RehnoLindeque/status/536954909506437120"></a>
<blockquote>_“[Miëtek](/#about), you are a badass. Deploying [CircuitHub](https://circuithub.com/) is so slick now, I barely stop to think about it!”_</blockquote>
<p>[— Rehno Lindeque](https://twitter.com/RehnoLindeque/status/536954909506437120)</p>
</aside>


How I Start
-----------

> ---------------------|---
> Website:             | [How I Start](https://howistart.org/)
> Author:              | [Tristan Sloughter](https://github.com/howistart/howistart.org/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_howistart_](https://github.com/mietek/howistart/)

Collection of development tutorials.

Using Halcyon in production since July 2014, via [Haskell on Heroku](https://haskellonheroku.com/).


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/howistart/">https://github.com/mietek/howistart</a></span>
<span class="prompt">$</span> <span class="input">PORT=8080 howistart</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/howistart">Deploy How I Start to Heroku</a>


#### Magic files

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) — build-time dependency on _alex_
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) — version constraints for dependencies of _alex_
- [`extra-data-files`](/reference/#halcyon_extra_data_files) — additional run-time data files


<aside>
<a class="micro face tristan-sloughter" href="https://twitter.com/t_sloughter/status/539168929131003904"></a>
<blockquote>_“[Miëtek](/#about)’s [Haskell on Heroku](https://haskellonheroku.com/) and Halcyon has made deploying [How I Start](https://howistart.org/) fast and simple!  Thanks!”_</blockquote>
<p>[— Tristan Sloughter](https://twitter.com/t_sloughter/status/539168929131003904)</p>
</aside>


Haskell Language
----------------

> ---------------------|---
> Website:             | [Haskell Language](http://haskell-lang.org/)
> Author:              | [Haskell Infrastructure team](https://github.com/haskell-infra/hl/)
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.3
> Source code:         | [_hl_](https://github.com/mietek/hl/)

Introduction to Haskell, featuring [Try Haskell](#try-haskell).


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/hl/">https://github.com/mietek/hl</a></span>
<span class="prompt">$</span> <span class="input">PORT=8080 hl</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hl">Deploy Haskell Language to Heroku</a>


#### Magic files

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) — build-time dependencies on _alex_ and _happy_
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) — version constraints for dependencies of _alex_ and _happy_
- [`sandbox-extra-os-packages`](/reference/#halcyon_sandbox_extra_os_packages) — build-time dependency on the OS _libicu_ library
- [`sandbox-sources`](/reference/#halcyon_sandbox_sources) — build-time dependency on a patched version of _text-icu_
- [`extra-os-packages`](/reference/#halcyon_extra_os_packages) — run-time dependency on the OS _libicu_ library
- [`extra-data-files`](/reference/#halcyon_extra_data_files) — additional run-time data files

**Note:**  The patched version of _text-icu_ is needed to work around Cabal issue [#2207](https://github.com/haskell/cabal/issues/2207).


Try Haskell
-----------

> ---------------------|---
> Website:             | [Try Haskell](http://tryhaskell.org/)
> Author:              | [Chris Done](https://github.com/chrisdone/tryhaskell/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_tryhaskell_](https://github.com/mietek/tryhaskell/)

Interactive Haskell tutorial, powered by [_mueval_](https://github.com/gwern/mueval/).


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/tryhaskell/">https://github.com/mietek/tryhaskell</a></span>
<span class="prompt">$</span> <span class="input">MUEVAL_TIMEOUT=4 PORT=8080 tryhaskell</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/tryhaskell">Deploy Try Haskell to Heroku</a>


#### Magic files

- [`sandbox-sources`](/reference/#halcyon_sandbox_sources) — build-time dependency on the current version of _mueval_
- [`sandbox-post-build-hook`](/reference/#halcyon_sandbox_post_build_hook) — custom script to run after building the sandbox
- [`include-layers`](/reference/#halcyon_include_layers) — run-time dependency on the GHC, Cabal, and sandbox layers
- [`extra-data-files`](/reference/#halcyon_extra_data_files) — additional run-time data files

**Note:**  Deploying this example may take longer than expected, because including GHC as a run-time dependency balloons the [install directory](/guide/#install-directory) to just over 1GB.


Try Idris
---------

> ---------------------|---
> Website:             | [Try Idris](http://tryidris.org/)
> Author:              | [Brian McKenna](https://github.com/puffnfresh/tryidris/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Source code:         | [_tryidris_](https://github.com/mietek/tryidris/)

[Idris](http://idris-lang.org/) compiler on a webpage.


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/tryidris/">https://github.com/mietek/tryidris</a></span>
<span class="prompt">$</span> <span class="input">tryidris 8080</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/tryidris">Deploy Try Idris to Heroku</a>


#### Magic files

- [`pre-install-hook`](/reference/#halcyon_pre_install_hook) — custom script to install run-time dependencies
- [`extra-data-files`](/reference/#halcyon_extra_data_files) — additional run-time data files

The custom script installs Idris with a recursive invocation of Halcyon, which declares:

- [`constraints`](/reference/#halcyon_constraints) — version constraints for dependencies of Idris
- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) — build-time dependency for Idris on _alex_
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) — version constraints for dependencies of _alex_


<aside>
<a class="micro face brian-mckenna" href="https://twitter.com/puffnfresh/status/527902645928087553"></a>
<blockquote>_“[Miëtek](/#about), you are absolutely amazing. Thank you!”_</blockquote>
<p>[— Brian McKenna](https://twitter.com/puffnfresh/status/527902645928087553)</p>
</aside>


Try PureScript
--------------

> ---------------------|---
> Website:             | [Try PureScript](http://try.purescript.org/)
> Author:              | [Phil Freeman](https://github.com/purescript/trypurescript/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Source code:         | [_trypurescript_](https://github.com/mietek/trypurescript/)

[PureScript](http://purescript.org/) compiler on a webpage.


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/trypurescript/">https://github.com/mietek/trypurescript</a></span>
<span class="prompt">$</span> <span class="input">trypurescript -p 8080</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/trypurescript">Deploy Try PureScript to Heroku</a>


#### Magic files

None.


<aside>
<a class="micro face phil-freeman" href="https://twitter.com/paf31/status/527900905900085248"></a>
<blockquote>_“[Miëtek’s](/#about) [Haskell on Heroku](https://haskellonheroku.com/) looks excellent.”_</blockquote>
<p>[— Phil Freeman](https://twitter.com/paf31/status/527900905900085248)</p>
</aside>


Try Haste
---------

> ---------------------|---
> Website:             | [Try Haste](https://tryplayg.herokuapp.com/)
> Author:              | [Alberto G. Corona](https://github.com/agocorona/tryhplay/)
> Framework:           | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> Source code:         | [_tryhaste_](https://github.com/mietek/tryhaste/)

[Haste](http://haste-lang.org/) development environment on a webpage.


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/tryhaste/">https://github.com/mietek/tryhaste</a></span>
<span class="prompt">$</span> <span class="input">tryplayground 8080</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/tryhaste">Deploy Try Haste to Heroku</a>


#### Magic files

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) — build-time dependency on _cpphs_
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) — version constraints for dependencies of _cpphs_
- [`pre-install-hook`](/reference/#halcyon_pre_install_hook) — custom script to install run-time dependencies
- [`include-layers`](/reference/#halcyon_include_layers) — run-time dependency on the GHC, Cabal, and sandbox layers
- [`extra-data-files`](/reference/#halcyon_extra_data_files) — additional run-time data files

The custom script installs Haste with a recursive invocation of Halcyon, which declares:

- [`constraints`](/reference/#halcyon_constraints) — version constraints for dependencies of Haste
- [`sandbox-extra-os-packages`](/reference/#halcyon_sandbox_extra_os_packages) — build-time dependency for Haste on the OS _libbz2_ and _libgmp_ libraries
- [`extra-configure-flags`](/reference/#halcyon_extra_configure_flags) — additional build-time flags for Haste
- [`pre-install-hook`](/reference/#halcyon_pre_install_hook) — custom script to bootstrap Haste

**Note:**  Deploying this example may take longer than expected, because including GHC and Haste as run-time dependencies balloons the [install directory](/guide/#install-directory) to well over 1GB.


<aside>
<a class="micro face alberto-g-corona" href="https://twitter.com/AGoCorona/status/527731803432714240"></a>
<blockquote>_“The idea is fantastic! But it needs GHC and Haste running in the instance to compile programs. That is the difficult thing.”_</blockquote>
<p>[— Alberto G. Corona](https://twitter.com/AGoCorona/status/527731803432714240)</p>
</aside>


Gitit
-----

> ---------------------|---
> Website:             | [Gitit demo](http://gitit.net/)
> Author:              | [John MacFarlane](https://github.com/jgm/gitit/)
> Framework:           | [Happstack](http://happstack.com/) 7.3.9
> Source code:         | [_gitit_](https://github.com/mietek/gitit/)

Wiki with _git_ file storage.


#### Deploying

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/gitit/">https://github.com/mietek/gitit</a></span>
<span class="prompt">$</span> <span class="input">gitit -p 8080</span>
</code></pre>

<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/gitit">Deploy Gitit to Heroku</a>


#### Magic files

None.


<aside>
<a class="micro face kiwamu-okabe" href="https://twitter.com/masterq_mogumog/status/532183331148804096"></a>
<blockquote>_“[Miëtek](/#about), woo-hoo!  I can login to Gitit using a GitHub account!  It’s really magic!”_</blockquote>
<p>[— Kiwamu Okabe](https://twitter.com/masterq_mogumog/status/532183331148804096)</p>
</aside>
