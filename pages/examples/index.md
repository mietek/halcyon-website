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

Real-world Haskell applications, demonstrating advanced usage of Halcyon.


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

All examples can be installed in one command on regular machines running most recent Linux distributions.

Additionally, all examples can be deployed in one click to a new [DigitalOcean](https://digitalocean.com/) droplet, or to the [Heroku](https://heroku.com/) web application platform.

For simple applications, see the [shootout](/shootout/).


CircuitHub
----------

> ---------------------|---
> Website:             | [CircuitHub](https://circuithub.com/)
> Author:              | [CircuitHub team](https://circuithub.com/about/team)
> Framework:           | [Yesod](http://yesodweb.com/) 1.2.19
> Source code:         | _private_

Electronics manufacturing service, built for hardware startups.

Using Halcyon in production since June 2014.


#### Extra dependencies

- _alex_, as a [sandbox extra app](/guide/#sandbox-extra-apps), with version constraints
- _libpcre_, as a [sandbox extra OS package](/guide/#sandbox-extra-os-packages)
- Private Cabal packages, as [sandbox sources](/guide/#sandbox-sources)


<aside>
<a class="micro face andrew-seddon" href="http://www.reddit.com/r/haskell/comments/2ogoot/deploy_any_haskell_application_instantly/"></a>
<blockquote>_“Thanks for all the hard work on Halcyon, [Miëtek](/#about). Rehno tells me this is making our lives much easier!”_</blockquote>
<p>[— Andrew Seddon](http://www.reddit.com/r/haskell/comments/2ogoot/deploy_any_haskell_application_instantly/), [CircuitHub](https://circuithub.com/) co-founder</p>
<a class="micro face rehno-lindeque" href="https://twitter.com/RehnoLindeque/status/536954909506437120"></a>
<blockquote>_“[Miëtek](/#about), you are a badass. Deploying [CircuitHub](https://circuithub.com/) is so slick now, I barely stop to think about it!”_</blockquote>
<p>[— Rehno Lindeque](https://twitter.com/RehnoLindeque/status/536954909506437120), [CircuitHub](https://circuithub.com/) co-founder</p>
</aside>


How I Start
-----------

> ---------------------|---
> Website:             | [How I Start](https://howistart.org/)
> Author:              | [Tristan Sloughter](https://github.com/howistart/howistart.org)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_howistart_](https://github.com/mietek/howistart)

Collection of software development tutorials.

Using Halcyon in production since July 2014.


#### Extra dependencies

- _alex_, as a [sandbox extra app](/guide/#sandbox-extra-apps), with version constraints
- Static website content, as [extra data files](/guide/#extra-data-files)


<aside>
<a class="micro face tristan-sloughter" href="https://twitter.com/t_sloughter/status/539168929131003904"></a>
<blockquote>_“[Miëtek’s](/#about) [Haskell on Heroku](https://haskellonheroku.com/) and Halcyon has made deploying [How I Start](https://howistart.org/) fast and simple!  Thanks!”_</blockquote>
<p>[— Tristan Sloughter](https://twitter.com/t_sloughter/status/539168929131003904), [How I Start](https://howistart.org/) author</p>
</aside>


### Usage

```
$ PORT=8080 howistart
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/howistart">https://github.com/mietek/howistart</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/howistart">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/howistart">Deploy to Heroku</a>


Haskell Language
----------------

> ---------------------|---
> Website:             | [Haskell Language](http://haskell-lang.org/)
> Author:              | [Haskell Infrastructure team](https://github.com/haskell-infra/hl)
> Framework:           | [Yesod](http://yesodweb.com/) 1.4.3
> Source code:         | [_hl_](https://github.com/mietek/hl)

Introduction to Haskell, featuring [Try Haskell](#try-haskell).


#### Extra dependencies

- _alex_ and _happy_, as [sandbox extra apps](/guide/#sandbox-extra-apps), with version constraints
- _libicu_, for build-time and run-time use, as a [sandbox extra OS package](/guide/#sandbox-extra-os-packages) and an [extra OS package](/guide/#extra-os-packages)
- Patched version of _text-icu_, as a [sandbox source](/guide/#sandbox-sources)
- Static website content, as [extra data files](/guide/#extra-data-files)

**Note:**  The patched version of _text-icu_ is needed to work around Cabal issue [#2207](https://github.com/haskell/cabal/issues/2207).


### Usage

```
$ PORT=8080 hl
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/hl">https://github.com/mietek/hl</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/hl">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/hl">Deploy to Heroku</a>


Try Haskell
-----------

> ---------------------|---
> Website:             | [Try Haskell](http://tryhaskell.org/)
> Author:              | [Chris Done](https://github.com/chrisdone/tryhaskell)
> Framework:           | [Snap](http://snapframework.com/) 0.9.6.3
> Source code:         | [_tryhaskell_](https://github.com/mietek/tryhaskell)

Interactive Haskell tutorial, powered by [_mueval_](https://github.com/gwern/mueval).


#### Extra dependencies

- Current version of _mueval_, as a [sandbox source](/guide/#sandbox-sources)
- [Sandbox post-build hook](/reference/#halcyon_sandbox_post_build_hook), to set up paths for _mueval_
- GHC and sandbox directories, as [extra dependencies](/guide/#extra-dependencies)
- Static website content, as [extra data files](/guide/#extra-data-files)

**Note:**  Deploying Try Haskell may take longer than expected, because including GHC for use at run-time balloons the install directory to just under 1 GB.


### Usage

```
$ MUEVAL_TIMEOUT=8 PORT=8080 tryhaskell
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/tryhaskell">https://github.com/mietek/tryhaskell</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/tryhaskell">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/tryhaskell">Deploy to Heroku</a>


Try Idris
---------

> ---------------------|---
> Website:             | [Try Idris](http://tryidris.org/)
> Author:              | [Brian McKenna](https://github.com/puffnfresh/tryidris)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty) 0.9.0
> Source code:         | [_tryidris_](https://github.com/mietek/tryidris)

[Idris](http://idris-lang.org/) compiler on a webpage.


#### Extra dependencies

- [Pre-install hook](/reference/#halcyon_pre_install_hook), using Halcyon recursively to install Idris, with version constraints and extra dependencies:
    - _alex_, as a [sandbox extra app](/guide/#sandbox-extra-apps), with version constraints
- Static website content, as [extra data files](/guide/#extra-data-files)

**Note:**  Try Idris requires a machine with at least 1 GB of memory in order to run.


<aside>
<a class="micro face brian-mckenna" href="https://twitter.com/puffnfresh/status/527902645928087553"></a>
<blockquote>_“[Miëtek](/#about), you are absolutely amazing. Thank you!”_</blockquote>
<p>[— Brian McKenna](https://twitter.com/puffnfresh/status/527902645928087553), [Try Idris](/examples/#try-idris) author and [inspiration](http://brianmckenna.org/blog/haskell_buildpack_heroku) for [Haskell on Heroku](https://haskellonheroku.com/)</p>
</aside>


### Usage

```
$ tryidris 8080
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/tryidris">https://github.com/mietek/tryidris</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/tryidris">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/tryidris">Deploy to Heroku</a>


Try PureScript
--------------

> ---------------------|---
> Website:             | [Try PureScript](http://try.purescript.org/)
> Author:              | [Phil Freeman](https://github.com/purescript/trypurescript)
> Framework:           | [Scotty](https://github.com/scotty-web/scotty) 0.9.0
> Source code:         | [_trypurescript_](https://github.com/mietek/trypurescript)

[PureScript](http://purescript.org/) compiler on a webpage.


#### Extra dependencies

> _None_


<aside>
<a class="micro face phil-freeman" href="https://twitter.com/paf31/status/527900905900085248"></a>
<blockquote>_“[Miëtek’s](/#about) [Haskell on Heroku](https://haskellonheroku.com/) looks excellent.”_</blockquote>
<p>[— Phil Freeman](https://twitter.com/paf31/status/527900905900085248), [PureScript](http://purescript.org/) and [Try PureScript](http://try.purescript.org/) author</p>
</aside>


### Usage

```
$ trypurescript -p 8080
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/trypurescript">https://github.com/mietek/trypurescript</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/trypurescript">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/trypurescript">Deploy to Heroku</a>


Try Haste
---------

> ---------------------|---
> Website:             | [Try Haste](https://tryplayg.herokuapp.com/)
> Author:              | [Alberto G. Corona](https://github.com/agocorona/tryhplay)
> Framework:           | [MFlow](https://github.com/agocorona/MFlow) 0.4.5.9
> Source code:         | [_tryhaste_](https://github.com/mietek/tryhaste)

[Haste](http://haste-lang.org/) development environment on a webpage.


#### Extra dependencies

- _cpphs_, as a [sandbox extra app](/guide/#sandbox-extra-apps), with version constraints
- [Pre-install hook](/reference/#halcyon_pre_install_hook), using Halcyon recursively to install Haste, with version constraints and extra dependencies:
    - _libbz2_ and _libgmp_, as [sandbox extra OS packages](/guide/#sandbox-extra-os-packages)
    - [Extra configure flags](/reference/#halcyon_extra_configure_flags) for Haste
    - [Pre-install hook](/reference/#halcyon_pre_install_hook) to bootstrap Haste
- GHC and Cabal directories, as [extra dependencies](/guide/#extra-dependencies)
- Static website content, as [extra data files](/guide/#extra-data-files)

**Note:**  Deploying Try Haste may take longer than expected, because including GHC and Haste for run-time use balloons the install directory to well over 1 GB.


<aside>
<a class="micro face anton-ekblad" href="https://github.com/valderman/haste-compiler"></a>
<blockquote>_“Building Haste yourself is not recommended.  Why jump through hoops if you don't have to?”_</blockquote>
<p>[— Anton Ekblad](https://github.com/valderman/haste-compiler), [Haste](http://haste-lang.org/) author</p>
<a class="micro face alberto-g-corona" href="https://twitter.com/AGoCorona/status/527731803432714240"></a>
<blockquote>_“The app needs GHC and Haste running in the instance to compile programs.  That is the difficult thing.”_</blockquote>
<p>[— Alberto G. Corona](https://twitter.com/AGoCorona/status/527731803432714240), [MFlow](https://github.com/agocorona/MFlow) and [Try Haste](https://tryplayg.herokuapp.com/) author</p>
</aside>


### Usage

```
$ tryplayground 8080
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/tryhaste">https://github.com/mietek/tryhaste</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/tryhaste">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/tryhaste">Deploy to Heroku</a>


Gitit
-----

> ---------------------|---
> Website:             | [Gitit demo](http://gitit.net/)
> Author:              | [John MacFarlane](https://github.com/jgm/gitit)
> Framework:           | [Happstack](http://happstack.com/) 7.3.9
> Source code:         | [_gitit_](https://github.com/mietek/gitit)

Wiki with _git_ file storage.


#### Extra dependencies

> _None_


<aside>
<a class="micro face kiwamu-okabe" href="https://twitter.com/masterq_mogumog/status/532183331148804096"></a>
<blockquote>_“[Miëtek](/#about), woo-hoo!  I can login to Gitit using a GitHub account!  It’s really magic!”_</blockquote>
<p>[— Kiwamu Okabe](https://twitter.com/masterq_mogumog/status/532183331148804096), [Metasepi Project](http://metasepi.org/) founder</p>
</aside>


### Usage

```
$ gitit -p 8080
```

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">halcyon install <a href="https://github.com/mietek/gitit">https://github.com/mietek/gitit</a></span>
</code></pre>

<a class="digitalocean-button" href="https://halcyon.sh/deploy/?url=https://github.com/mietek/gitit">Deploy to DigitalOcean</a>
<a class="heroku-button" href="https://heroku.com/deploy?template=https://github.com/mietek/gitit">Deploy to Heroku</a>
