---
title: Haskell application deployment
page-class: hero tweak-listings
header-class: hero
main-class: hero
hero: |
  <h1 class="logotype">Halcyon</h1>
  <p>One command.  Less than 30 seconds.</p>
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

Halcyon is a system for deploying Haskell applications, used by [Haskell on Heroku](https://haskellonheroku.com/).

**Pre-release version.  For updates, please sign up to the [Halcyon announcements list](http://eepurl.com/8KXr9), or follow <a href="https://twitter.com/mietek">@mietek</a>.**


Overview
--------

Halcyon is designed to minimise the time and effort needed to deploy Haskell applications, while achieving 100% reproducible results.

Any Haskell application can be deployed with a [single command](#deploying-an-application), using explicitly declared versions of GHC, libraries, build-tools, and other dependencies.

Halcyon speeds up builds by archiving dependencies in _layers_.  GHC, _cabal-install_ and the Cabal package database, the application sandbox—each of these layers is archived separately from the application build and install directories.

All archives are cached locally.  Additionally, archives can be uploaded to [private storage](options/#private-storage-options), enabling distributed workflows by simply sharing the same storage configuration.

Many commonly used archives are also provided in [public storage](options/#public-storage-options), making it possible to deploy any of the [example applications](#examples) in under 30 seconds.

The build process is completely customizable, with _hooks_ allowing custom scripts to execute at every stage.  All used hooks are hashed and tracked as explicit dependencies.


### Support

- [Ubuntu 10.04 LTS](http://releases.ubuntu.com/10.04/), [Ubuntu 12.04 LTS](http://releases.ubuntu.com/12.04/), and [Ubuntu 14.04 LTS](http://releases.ubuntu.com/14.04/)
- [GHC 7.0.4](https://haskell.org/ghc/download_ghc_7_0_4), [GHC 7.2.2](https://haskell.org/ghc/download_ghc_7_2_2), [GHC 7.4.2](https://haskell.org/ghc/download_ghc_7_4_2), [GHC 7.6.1](https://haskell.org/ghc/download_ghc_7_6_1), [GHC 7.6.3](https://haskell.org/ghc/download_ghc_7_6_3), [GHC 7.8.2](https://haskell.org/ghc/download_ghc_7_8_2), and [GHC 7.8.3](https://haskell.org/ghc/download_ghc_7_8_3)
- [_cabal-install_ 1.20.0.0](https://haskell.org/cabal/download.html) or newer

Please report any problems with Halcyon on the [issue tracker](https://github.com/mietek/halcyon/issues/).  There is a [separate issue tracker](https://github.com/mietek/halcyon-website/issues/) for problems with the documentation.

The <a href="irc://chat.freenode.net/haskell-deployment">#haskell-deployment</a> IRC channel on [freenode](https://freenode.net/) is a good place to ask questions and find answers.

Need commercial support?  Contact the [author of this project](#about) directly.


Usage
-----

Halcyon is installed by cloning the source repository, and updates itself automatically when a command is executed.  The necessary environment variables can be set by using the [`halcyon paths`](commands/#halcyon-paths) command—ideally, in a `.profile` script.

```
$ git clone https://github.com/mietek/halcyon
$ source <( halcyon/halcyon paths )
```

To disable automatic updates, set [`HALCYON_NO_AUTOUPDATE`](options/#halcyon_no_autoupdate) to `1`.

Halcyon keeps all files in the `/app` directory.  Changing this is possible, but not recommended, as it will prevent using public archives.  To learn more, see [`HALCYON_APP_DIR`](options/#halcyon_app_dir).


### Deploying an environment

The [`halcyon deploy`](commands/#halcyon-deploy) command is used to deploy Haskell applications, and can also be used to install a full Haskell development environment.

<div class="toggle">
<a class="toggle-button" data-target="log1" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log1"><code>$ halcyon deploy
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

The above command installs GHC 7.8.3, _cabal-install_ 1.20.0.3, and an up-to-date Cabal package database.  With public archives, this is expected to take less than 20 seconds.

To select other versions of GHC or _cabal-install_, or to use a different Cabal repository, specify [`--ghc-version`](options/#halcyon_ghc_version), [`--cabal-version`](options/#halcyon_cabal_version), or [`--cabal-repo`](options/#halcyon_cabal_repo).

If an application is detected in the current directory, it will be deployed instead.  To avoid this, specify [`--no-app`](options/#halcyon_no_app).


### Deploying an application

The [`halcyon deploy`](commands/#halcyon-deploy) command accepts one argument, specifying the application to deploy.  This can be a local directory path, a Cabal package `name-version` label, or a _git_ repository URL.

<div class="toggle">
<a class="toggle-button" data-target="log2" href="" title="Toggle">Toggle</a>
<pre class="toggle" id="log2"><code>$ halcyon deploy https://github.com/mietek/hello
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

Executing the above command will install an example Haskell application to `/app/bin/hello`.  This should finish in under 10 seconds, as Halcyon only needs to restore the archived application install directory from public storage.

To install in another location, specify [`--prefix`](options/#halcyon_prefix).  Halcyon will then restore all layers, reconfigure the application, and complete an incremental build.  With public archives, the expected time is less than 30 seconds.


Examples
--------

_Work in progress._

Please check the Haskell on Heroku website for examples of [real-world](https://haskellonheroku.com/apps/) and [“Hello, world!”](https://haskellonheroku.com/examples/) Haskell web applications.

Each example can be deployed both to Heroku and on regular machines running one of the supported software stacks.


Documentation
-------------

_Work in progress._

- [Command reference](commands/)
- [Option reference](options/)
- [Source code](https://github.com/mietek/halcyon/)

Halcyon is built with [_bashmenot_](https://bashmenot.mietek.io/), a library of shell functions for [GNU _bash_](https://gnu.org/software/bash/).

- [_bashmenot_ function reference](https://bashmenot.mietek.io/functions/)
- [_bashmenot_ option reference](https://bashmenot.mietek.io/options/)
- [_bashmenot_ source code](https://github.com/mietek/bashmenot/)


About
-----

<span id="mietek"><a class="hello" href=""></a></span>

My name is [Miëtek Bak](https://mietek.io/).  I make software, and Halcyon is one of [my projects](https://mietek.io/projects/).

This work is published under the [MIT X11 license](license/), and supported by my company, [Least Fixed](https://leastfixed.com/).

Like my work?  I am available for consulting.  Say <a class="hello" href="">hello</a>, or follow <a href="https://twitter.com/mietek">@mietek</a>.


### Acknowledgments

Thanks to [CircuitHub](https://circuithub.com/), [Tweag I/O](http://tweag.io/), and [Purely Agile](http://purelyagile.com/) for advice and assistance.

The monospaced font used in this website is [PragmataPro](http://fsd.it/fonts/pragmatapro.htm), by [Fabrizio Schiavi](http://fsd.it/).  The sans-serif font is [Concourse](http://practicaltypography.com/concourse.html), by [Matthew Butterick](http://practicaltypography.com/).  The welcome image is based on [Altocumulus Cloud](https://flickr.com/photos/kubina/146306532/), by [Jeff Kubina](https://flickr.com/photos/kubina/).  Website built with [_cannot_](https://cannot.mietek.io/).
