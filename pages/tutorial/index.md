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

This tutorial shows how to use Halcyon while writing a new Haskell web app.

<div><nav id="main-toc"></nav></div>


Set up
------

The tutorial assumes you are using a [supported Linux system](/guide/#supported-platforms) with at least 4 GB RAM, and a [GNU _bash_](https://gnu.org/software/bash/) shell.

Run the [setup script](https://github.com/mietek/halcyon/raw/master/setup.sh) to install Halcyon:

```
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
-----> Welcome to Halcyon
[sudo] password for yourself:
-----> Creating base directory: /app
-----> Installing OS packages
-----> Installing Halcyon in /app/halcyon... done, 9d37342
-----> Installing bashmenot in /app/halcyon/lib/bashmenot... done, 8bd8ea3
-----> Extending .bash_profile
```

Halcyon is now installed and ready to use:

```
$ which halcyon
/app/halcyon/halcyon
```


### Tips

By default, Halcyon is installed in the `halcyon` subdirectory of the base directory, which defaults to `/app`.  If you want to install Halcyon somewhere else, set the [`HALCYON_DIR`](/reference/#halcyon_dir) environment variable before running the setup script.

If you do not want your `.bash_profile` to be modified, set [`HALCYON_NO_MODIFY_HOME`](/reference/#halcyon_no_modify_home) to `1` before running the setup script.  In the future, you will need to activate Halcyon manually before each use:

```
$ source <( /app/halcyon/halcyon paths )
```

Using a custom base directory is not recommended, because it forces Halcyon to build everything from scratch, and prevents you from getting started as quickly as possible.  If you still want to do it, set [`HALCYON_BASE`](/reference/#halcyon_base) before running the setup script.


Install GHC and Cabal
---------------------

Run [`halcyon install`](/reference/#halcyon-install) to install GHC and Cabal:

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

In this step, Halcyon restores a _GHC directory archive_ and a _Cabal directory archive_, which are downloaded from public storage.

GHC and Cabal are now ready to use:

```
$ which ghc
/app/ghc/bin/ghc
$ which cabal
/app/cabal/bin/cabal
```


### Tips

Halcyon defaults to GHC 7.8.4 and _cabal-install_ 1.20.0.3.  You can change this with the [`--ghc-version=…`](/reference/#halcyon_ghc_version) and [`--cabal-version=…`](/reference/#halcyon_cabal_version) options.

If the current directory contains a Haskell app, running [`halcyon install`](/reference/#halcyon-install) will install the app, unless you use the [`--no-app`](/reference/#halcyon_no_app) option.


Install the app
---------------

Install the [tutorial app](https://github.com/mietek/halcyon-tutorial) directly from the _git_ repository:

```
$ halcyon install https://github.com/mietek/halcyon-tutorial
-----> Examining cache contents
       halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz
       halcyon-ghc-7.8.4.tar.gz

-----> Cloning https://github.com/mietek/halcyon-tutorial... done, f079321
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

In this step, Halcyon restores an _install directory archive_ from public storage.  The correct install directory to use is determined by calculating a _source hash_ of the source directory.

The app is now ready to run:

```
$ which halcyon-tutorial
/app/bin/halcyon-tutorial
```


### Tips

By default, the app is installed in the `/app` directory.  You can change this with the [`--prefix=…`](/reference/#halcyon_prefix) option.


Run the app
-----------

The tutorial app is a simple in-memory noteboard, exposing one HTTP endpoint, `/notes`, which accepts `GET` and `POST` requests.

Start the app in one shell:

```
$ halcyon-tutorial
```

By default, the app listens on port 8080.  You can change this by setting the `PORT` environment variable.

In another shell, make a `GET` request to see the empty noteboard:

```
$ curl localhost:8080/notes
[]
```

Notes are JSON objects with a single text field, `contents`.

Make a couple `POST` requests to add some notes:

```
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!"}]
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello?" }'
[{"contents":"Hello?"},{"contents":"Hello, world!"}]
```

The app always responds with the contents of the entire noteboard.  The notes are also logged to the original shell:

```
$ halcyon-tutorial
Hello, world!
Hello?
```

Press `control-C` to stop the app.


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
