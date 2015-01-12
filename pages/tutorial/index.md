---
title: Tutorial
page-class: add-main-toc tweak-listings
page-data:
- key: max-section-toc-level
  value: 1
page-head: |
  <style>
    header a.link-tutorial {
      color: #3f96f0;
    }
  </style>
---


Tutorial
========

This tutorial shows how use Halcyon while writing a new Haskell web app.

<div><nav id="main-toc"></nav></div>

You will use Halcyon to install GHC and Cabal, declare and install dependencies, and finally, install the app itself.

The tutorial assumes you are using a [supported Linux system](/guide/#supported-platforms) with at least 4 GB RAM, and a [GNU _bash_](https://gnu.org/software/bash/) shell.


Set up
------

Run the [setup script](https://github.com/mietek/halcyon/raw/master/setup.sh) to install Halcyon:

```
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
-----> Welcome to Halcyon
[sudo] password for $USER:
-----> Creating base directory: /app
-----> Installing OS packages
       …
       
-----> Installing Halcyon in /app/halcyon... done, 9d37342
-----> Installing bashmenot in /app/halcyon/lib/bashmenot... done, 8bd8ea3
-----> Extending .bash_profile
```
```
$ which halcyon
/app/halcyon/halcyon
```

Halcyon is now ready to use.


### Tips

By default, Halcyon is installed in the `halcyon` subdirectory of the base directory, which defaults to `/app`.  If you want to install Halcyon somewhere else, set the [`HALCYON_DIR`](/reference/#halcyon_dir) environment variable before running the setup script.

If you do not want your `.bash_profile` to be modified, set [`HALCYON_NO_MODIFY_HOME`](/reference/#halcyon_no_modify_home) to `1` before running the setup script.  In the future, you will need to activate Halcyon manually before each use:

```
$ source <( /app/halcyon/halcyon paths )
```

Using a custom base directory is not recommended, because it will require Halcyon to build everything from scratch, and prevent you from getting started as quickly as possible.  If you still want to do it, set [`HALCYON_BASE`](/reference/#halcyon_base) before running the setup script.


Install GHC and Cabal
---------------------

Run the [`halcyon install`](/reference/#halcyon-install) command to install GHC and Cabal:

```
$ halcyon install
-----> Installing GHC and Cabal
       External storage:                         public
       GHC version:                              7.8.4
       Cabal version:                            1.20.0.3
       Cabal repository:                         Hackage

-----> Restoring GHC directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.4.tar.gz... done
       Extracting halcyon-ghc-7.8.4.tar.gz... done, 701MB

-----> Locating Cabal directories
       Listing https://halcyon.global.ssl.fastly.net/... done
-----> Restoring Cabal directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz... done, 180MB

-----> GHC and Cabal installed                   

-----> Examining cache changes
       + halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz
       + halcyon-ghc-7.8.4.tar.gz
```
```
$ which ghc
/app/ghc/bin/ghc
```
```
$ which cabal
/app/cabal/bin/cabal
```

GHC and Cabal are now ready to use.


### Tips

When you want to install GHC and Cabal, and the current directory contains a Haskell app, you can use the [`--no-app`](/reference/#halcyon_no_app) option.

By default, Halcyon uses GHC 7.8.4 and _cabal-install_ 1.20.0.3.  You can change this with the [`--ghc-version=…`](/reference/#halcyon_ghc_version) and [`--cabal-version=…`](/reference/#halcyon_cabal_version) options.


Prepare the app
---------------

Use _git_ to make a local copy of the [tutorial app](https://github.com/mietek/halcyon-tutorial) repository:

```
$ git clone https://github.com/mietek/halcyon-tutorial
Cloning into 'halcyon-tutorial'...
remote: Counting objects: 38, done.
remote: Compressing objects: 100% (29/29), done.
remote: Total 38 (delta 14), reused 9 (delta 3)
Unpacking objects: 100% (38/38), done.
Checking connectivity... done.
```
```
$ cd halcyon-tutorial
```

The app is now ready to be installed.


Install the app
---------------

Run the [`halcyon install`](/reference/#halcyon_install) comand to install the app:

```
$ halcyon install
-----> Examining cache contents
       halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz
       halcyon-ghc-7.8.4.tar.gz

-----> Installing halcyon-tutorial-1.0
       Label:                                    halcyon-tutorial-1.0
       Prefix:                                   /app
       Source hash:                              161d7b4
       External storage:                         public
       GHC version:                              7.8.4

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-161d7b4-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-install-161d7b4-halcyon-tutorial-1.0.tar.gz... done, 8.8MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            halcyon-tutorial-1.0

-----> Examining cache changes
       + halcyon-install-161d7b4-halcyon-tutorial-1.0.tar.gz
```
```
$ which halcyon-tutorial
/app/bin/halcyon-tutorial
```

The app is now ready to run.


### Tips

By default, the app is installed in the `/app` directory.  You can change this with the [`--prefix=…`](/reference/#halcyon_prefix) option.


Run the app
-----------

TODO


Make a change
-------------

TODO


Build the app
-------------

TODO


Add a dependency
----------------

TODO


Next steps
----------

TODO


---

_**Work in progress.**  For updates, please follow <a href="https://twitter.com/mietek">@mietek</a>._

For more information, please see the [user’s guide](/guide/).
