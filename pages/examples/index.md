---
title: Example applications
page-class: tweak-gallery tweak-listings
page-head: |
  <meta name="twitter:widgets:link-color" content="#3f96f0">
  <style>
    header a.link-examples {
      color: #3f96f0;
    }
  </style>
---


Example applications { .with-toc }
====================

Real-world Haskell applications, demonstrating advanced Halcyon features.


</section></section></section></div>
<div class="gallery-background">
<div class="wrapper">
<div class="gallery-frame" id="examples-gallery">
<div class="gallery-contents">
<a href="#circuithub" class="gallery-item" id="item-circuithub">CircuitHub</a>
<a href="#how-i-start" class="gallery-item" id="item-howistart">How I Start</a>
<a href="#haskell-language" class="gallery-item" id="item-haskell-lang">Haskell Language</a>
<a href="#try-haskell" class="gallery-item" id="item-tryhaskell">Try Haskell</a>
<a href="#try-idris" class="gallery-item" id="item-tryidris">Try Idris</a>
<a href="#try-purescript" class="gallery-item" id="item-trypurescript">Try PureScript</a>
<a href="#try-haste" class="gallery-item" id="item-tryhaste">Try Haste</a>
<a href="#gitit" class="gallery-item" id="item-gitit">Gitit</a>
</div></div></div></div>
<div class="wrapper"><section><section><section>

<div id="gallery-links"><nav>
<ul class="menu open">
<li><a class="gallery-link" href="#circuithub" id="link-circuithub">CircuitHub</a></li>
<li><a class="gallery-link" href="#how-i-start" id="link-howistart">How I Start</a></li>
<li><a class="gallery-link" href="#haskell-language" id="link-haskell-lang">Haskell Language</a></li>
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

Using Halcyon in production since June 2014, via [Haskell on Heroku](https://haskellonheroku.com/).

```
$ halcyon deploy circuithub-api
```


<div class="tweet">
<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/mietek">@mietek</a> you are a badass. Deploying <a href="http://t.co/gdTCjXQDAO">http://t.co/gdTCjXQDAO</a> is so slick now, I barely stop to think about it! <a href="https://twitter.com/hashtag/Halcyon?src=hash">#Halcyon</a> <a href="https://twitter.com/hashtag/HaskellOnHeroku?src=hash">#HaskellOnHeroku</a></p>&mdash; Rehno Lindeque (@RehnoLindeque) <a href="https://twitter.com/RehnoLindeque/status/536954909506437120">November 24, 2014</a></blockquote>
</div>


How I Start
-----------

> ---------------------|---
> Website:             | [How I Start](https://howistart.org/)
> Author:              | [Tristan Sloughter](https://github.com/howistart/howistart.org/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_howistart.org_](https://github.com/mietek/howistart.org/)

Collection of development tutorials.

Using Halcyon in production since July 2014, via [Haskell on Heroku](https://haskellonheroku.com/).

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/howistart.org/">https://github.com/mietek/howistart.org</a></span>
<span class="prompt">$</span> <span class="input">PORT=8080 howistart</span>
</code></pre>


#### Dependencies

Includes [magic files](https://github.com/mietek/howistart.org/tree/master/.halcyon-magic/) to declare:

- build-time dependency on _alex_
- version constraints for dependencies of _alex_
- additional run-time data files

For details, see:

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps)
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps)
- [`extra-data-files`](/reference/#halcyon_extra_data_files)


<div class="tweet">
<blockquote class="twitter-tweet"><p>.<a href="https://twitter.com/mietek">@mietek</a>&#39;s <a href="https://t.co/ojcH0h2Ul4">https://t.co/ojcH0h2Ul4</a> and <a href="https://t.co/tURlOiJMKc">https://t.co/tURlOiJMKc</a> has made deploying <a href="https://twitter.com/How_I_Start">@How_I_Start</a> fast &amp; simple! Thanks!</p>&mdash; Erlang Accessories (@t_sloughter) <a href="https://twitter.com/t_sloughter/status/539168929131003904">November 30, 2014</a></blockquote>
</div>


Haskell Language
----------------

> ---------------------|---
> Website:             | [Haskell Language](http://haskell-lang.org/)
> Author:              | [Haskell Infrastructure team](https://github.com/haskell-infra/hl/)
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.3
> Source code:         | [_hl_](https://github.com/mietek/hl/)

Introduction to Haskell, featuring [Try Haskell](#try-haskell).

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/hl/">https://github.com/mietek/hl</a></span>
<span class="prompt">$</span> <span class="input">PORT=8080 hl</span>
</code></pre>


#### Dependencies

Includes [magic files](https://github.com/mietek/hl/tree/master/.halcyon-magic/) to declare:

- build-time dependencies on _alex_, _happy_, the OS _libicu_ library, and a patched version of _text-icu_
- version constraints for dependencies of _alex_ and _happy_
- additional run-time data files

For details, see:

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps)
- [`sandbox-extra-libs`](/reference/#halcyon_sandbox_extra_libs)
- [`sandbox-sources`](/reference/#halcyon_sandbox_sources)
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps)
- [`extra-data-files`](/reference/#halcyon_extra_data_files)

**Note:**  The patched version of `text-icu` is needed to work around `text-icu` issue [#9](https://bitbucket.org/bos/text-icu/issue/9/ghc-78-and-fpic) and Cabal issue [#2207](https://github.com/haskell/cabal/issues/2207).


Try Haskell
-----------

> ---------------------|---
> Website:             | [Try Haskell](http://tryhaskell.org/)
> Author:              | [Chris Done](https://github.com/chrisdone/tryhaskell/)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_tryhaskell_](https://github.com/mietek/tryhaskell/)

Interactive Haskell tutorial, powered by [_mueval_](https://github.com/gwern/mueval/), and featured in [Haskell Language](#haskell-language).

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/tryhaskell/">https://github.com/mietek/tryhaskell</a></span>
<span class="prompt">$</span> <span class="input">MUEVAL_TIMEOUT=4 PORT=8080 tryhaskell</span>
</code></pre>


#### Dependencies

Includes [magic files](https://github.com/mietek/tryhaskell/tree/master/.halcyon-magic/) to declare:

- build-time dependency on the current version of _mueval_
- custom script to run after building the sandbox
- run-time dependency on the GHC, Cabal, and sandbox layers
- additional run-time data files

For details, see:

- [`sandbox-sources`](/reference/#halcyon_sandbox_sources)
- [`sandbox-post-build-hook`](/reference/#halcyon_sandbox_post_build_hook)
- [`include-layers`](/reference/#halcyon_include_layers)
- [`extra-data-files`](/reference/#halcyon_extra_data_files)


Try Idris
---------

> ---------------------|---
> Website:             | [Try Idris](http://tryidris.org/)
> Author:              | [Brian McKenna](https://github.com/puffnfresh/tryidris/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Source code:         | [_tryidris_](https://github.com/mietek/tryidris/)

[Idris](http://idris-lang.org/) compiler on a webpage.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/tryidris/">https://github.com/mietek/tryidris</a></span>
<span class="prompt">$</span> <span class="input">tryidris 8080</span>
</code></pre>


#### Dependencies

Includes [magic files](https://github.com/mietek/tryidris/tree/master/.halcyon-magic/) to declare:

- custom script to run before archiving the [install directory](/guide/#install-directory), installing Idris as a run-time dependency with a recursive invocation of Halcyon, and declaring:
    - build-time dependency for Idris on _alex_
    - version constraints for dependencies of Idris and _alex_
    - additional Idris packages
- additional run-time data files

For details, see:

- [`pre-install-hook`](/reference/#halcyon_pre_install_hook)
- [`constraints`](/reference/#halcyon_constraints)
- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps_constraints)
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints)
- [`extra-data-files`](/reference/#halcyon_extra_data_files)


<div class="tweet">
<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/mietek">@mietek</a> you are absolutely amazing. Thank you!</p>&mdash; Brian McKenna (@puffnfresh) <a href="https://twitter.com/puffnfresh/status/527902645928087553">October 30, 2014</a></blockquote>
</div>


Try PureScript
--------------

> ---------------------|---
> Website:             | [Try PureScript](http://try.purescript.org/)
> Author:              | [Phil Freeman](https://github.com/purescript/trypurescript/)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty/) 0.9.0
> Source code:         | [_trypurescript_](https://github.com/mietek/trypurescript/)

[PureScript](http://purescript.org/) compiler on a webpage.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/trypurescript/">https://github.com/mietek/trypurescript</a></span>
<span class="prompt">$</span> <span class="input">trypurescript -p 8080</span>
</code></pre>


<div class="tweet">
<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/mietek">@mietek</a> &#39;s HaskellOnHeroku looks excellent <a href="http://t.co/qjFh5rKVE7">http://t.co/qjFh5rKVE7</a></p>&mdash; Phil Freeman (@paf31) <a href="https://twitter.com/paf31/status/527900905900085248">October 30, 2014</a></blockquote>
</div>


Try Haste
---------

> ---------------------|---
> Website:             | [Try Haste](https://tryplayg.herokuapp.com/)
> Author:              | [Alberto G. Corona](https://github.com/agocorona/tryhplay/)
> Framework:           | [MFlow](https://github.com/agocorona/MFlow/) 0.4.5.9
> Source code:         | [_tryhplay_](https://github.com/mietek/tryhplay/)

[Haste](http://haste-lang.org/) development environment on a webpage.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/tryhplay/">https://github.com/mietek/tryhplay</a></span>
<span class="prompt">$</span> <span class="input">tryplayground 8080</span>
</code></pre>


#### Dependencies

Includes [magic files](https://github.com/mietek/hello-mflow/tree/master/.halcyon-magic/) to declare:

- build-time dependency on _cpphs_
- version constraints for dependencies of _cpphs_
- custom script to run before archiving the [install directory](/guide/#install-directory), installing Haste as a run-time dependency with a recursive invocation of Halcyon, and declaring:
    - build-time dependency for Haste on _libbz2_ and _libgmp_
    - additional build-time flags for Haste, passed to `cabal configure`
    - custom script to run before archiving the Haste install directory, used to bootstrap Haste
    - additional Haste packages
- run-time dependency on the GHC, Cabal, and sandbox layers
- additional run-time data files

For details, see:

- [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps_constraints)
- [`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints)
- [`pre-install-hook`](/reference/#halcyon_pre_install_hook)
- [`constraints`](/reference/#halcyon_constraints)
- [`sandbox-extra-libs`](/reference/#halcyon_sandbox_extra_libs)
- [`include-layers`](/reference/#halcyon_include_layers)
- [`extra-data-files`](/reference/#halcyon_extra_data_files)


<div class="tweet">
<blockquote class="twitter-tweet" data-conversation="none"><p><a href="https://twitter.com/mietek">@mietek</a> The idea is fantastic!. But It need ghc and haste running in the instance to compile programs. That is the difficult thing</p>&mdash; Alberto G. Corona (@AGoCorona) <a href="https://twitter.com/AGoCorona/status/527731803432714240">October 30, 2014</a></blockquote>
</div>


Gitit
-----

> ---------------------|---
> Website:             | [Gitit demo](http://gitit.net/)
> Author:              | [John MacFarlane](https://github.com/jgm/gitit/)
> Framework:           | [Happstack](http://happstack.com/) 7.3.9
> Source code:         | [_gitit_](https://github.com/mietek/gitit/)

Wiki with _git_ file storage.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon deploy <a href="https://github.com/mietek/gitit/">https://github.com/mietek/gitit</a></span>
<span class="prompt">$</span> <span class="input">gitit -p 8080</span>
</code></pre>


<div class="tweet">
<blockquote class="twitter-tweet" lang="en" data-conversation="none"><p><a href="https://twitter.com/mietek">@mietek</a> Woo-hoo! I can login gitit using github account! It&#39;s really magic!!!!!! <a href="https://t.co/WH0HGre790">https://t.co/WH0HGre790</a></p>&mdash; Myu-Myu- ATS-tan! (@masterq_mogumog) <a href="https://twitter.com/masterq_mogumog/status/532183331148804096">November 11, 2014</a></blockquote>
</div>


<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
