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


Halcyon tutorial
================

Halcyon is a system for installing [Haskell](https://haskell.org/) apps and development tools, including [GHC](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/) and [Cabal](https://haskell.org/cabal/users-guide/).

This tutorial shows how to develop a simple Haskell web app using Halcyon.

<div><nav id="main-toc"></nav></div>


Set up
------

Halcyon can be installed by cloning the [_git_ repository](https://github.com/mietek/halcyon), or by running the [setup script](https://github.com/mietek/halcyon/blob/master/setup.sh), which also installs the necessary OS packages and sets up the environment.

The tutorial assumes you’re using a Linux system with at least 4 GB RAM and GNU _bash_ 4 or newer.

Run the setup script to install Halcyon:

```
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
-----> Welcome to Halcyon
[sudo] password for fnord:
-----> Creating base directory: /app
-----> Installing OS packages
       ...
-----> Installing Halcyon... done, 9d37342
-----> Installing bashmenot... done, 8bd8ea3
-----> Extending .bash_profile
```

Halcyon is now ready to use:

```
$ which halcyon
/app/halcyon/halcyon
```


### Options

You can change where Halcyon is installed by setting the [`HALCYON_DIR`](/reference/#halcyon_dir) environment variable before running the script.

If you don’t want your `.bash_profile` to be extended, set [`HALCYON_NO_MODIFY_HOME`](/reference/#halcyon_no_modify_home) to `1` before running the script.  You’ll then need to activate Halcyon manually before each use:

```
$ source <( /app/halcyon/halcyon paths )
```

Halcyon installs development tools and other dependencies in the _base directory,_ which defaults to `/app`.  Changing this path isn’t recommended, because it’ll require all dependencies to be built from scratch.  If you still want to do it, set [`HALCYON_BASE`](/reference/#halcyon_base) before running the script.


Install GHC and Cabal
---------------------

Execute the Halcyon [`install`](/reference/#halcyon-install) command to install GHC and Cabal:

<div class="toggle">
<a class="toggle-button" data-target="install-ghc-and-cabal-log" href="" title="Toggle">Toggle</a>
``` { #install-ghc-and-cabal-log .toggle }
$ halcyon install
-----> Installing GHC and Cabal
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.4.tar.gz... done
       Extracting halcyon-ghc-7.8.4.tar.gz... done, 701MB

-----> Locating Cabal directories
       Listing https://halcyon.global.ssl.fastly.net/... done
-----> Restoring Cabal directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz... done, 180MB

-----> GHC and Cabal installed

-----> Examining cache changes
       + halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       + halcyon-ghc-7.8.4.tar.gz
```
</div>

> ---------------------|---
> _Expected time:_     | _20–30 seconds_

In this step, Halcyon restores a _GHC directory_ and a _Cabal directory_ by extracting archives downloaded from _public storage,_ which is an external cache for previously-built apps and dependencies.

All downloaded archives are cached in the Halcyon _cache directory._

GHC and Cabal are now ready to use:

```
$ which ghc
/app/ghc/bin/ghc
```
```
$ which cabal
/app/cabal/bin/cabal
```


### Options

All Halcyon options can be specified by setting an _environment variable._  You can also specify most options with a _command-line argument._

By default, Halcyon installs GHC 7.8.4 and _cabal-install_ 1.20.0.3.  You can change this with the [`HALCYON_GHC_VERSION`](/reference/#halcyon_ghc_version) and [`HALCYON_CABAL_VERSION`](/reference/#halcyon_cabal_version) options.

The cache directory defaults to `/var/tmp/halcyon-cache`, and can be changed with the [`HALCYON_CACHE`](/reference/#halcyon_cache) option.


Install the app
---------------

The [tutorial app](https://github.com/mietek/halcyon-tutorial) is a simple web service for storing notes, built with [Servant](http://haskell-servant.github.io/).

The app includes a Cabal _package description file,_ [`halcyon-tutorial.cabal`](https://github.com/mietek/halcyon-tutorial/blob/master/halcyon-tutorial.cabal) file, used to declare dependencies, and a Halcyon _constraints file,_ [`.halcyon/constraints`](https://github.com/mietek/halcyon-tutorial/blob/master/.halcyon/constraints) file, used to declare version constraints.

Use the Halcyon [`install`](/reference/#halcyon-install) command to install the app directly from the _git_ repository:

<div class="toggle">
<a class="toggle-button" data-target="install-the-app-log" href="" title="Toggle">Toggle</a>
``` { #install-the-app-log .toggle }
$ halcyon install https://github.com/mietek/halcyon-tutorial
-----> Examining cache contents
       halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       halcyon-ghc-7.8.4.tar.gz

-----> Cloning https://github.com/mietek/halcyon-tutorial... done, af1461f
-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **0c985ba**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-0c985ba-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-install-0c985ba-halcyon-tutorial-1.0.tar.gz... done, 8.8MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**

-----> Examining cache changes
       + halcyon-install-0c985ba-halcyon-tutorial-1.0.tar.gz
```
</div>

> ---------------------|---
> _Expected time:_     | _5–10 seconds_

In this step, Halcyon restores the tutorial app’s _install directory_ by using an archive from public storage.

The right archive to restore is determined by calculating a _source hash_ of the app’s _source directory._

Your app is now ready to run:

```
$ which halcyon-tutorial
/app/bin/halcyon-tutorial
```


### Options

Some Halcyon options, such as [`HALCYON_CONSTRAINTS`](/reference/#halcyon_constraints), can be specified by including a _magic file_ in your app’s source directory.  Command-line arguments take precedence over environment variables, which in turn take precedence over magic files.

Using magic files is the recommended way of specifing options, as it doesn’t require the user to perform any additional actions when installing your app.

Halcyon installs apps in the _prefix directory_, which defaults to `/app`.  You can change this with the [`HALCYON_PREFIX`](/reference/#halcyon_prefix) option.


Run the app
-----------

The tutorial app exposes one HTTP endpoint, `/notes`, which accepts `GET` and `POST` requests.

Notes are JSON objects with a single text field, `contents`.  The app responds to each request with a list of all existing notes.

Start your app in one shell:

```
$ halcyon-tutorial
```

In another shell, make a `GET` request to see an empty list of notes:

```
$ curl http://localhost:8080/notes
[]
```

Make a couple `POST` requests to add some notes:

```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!"}]
```
```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello?" }'
[{"contents":"Hello?"},{"contents":"Hello, world!"}]
```

Incoming notes are logged in the original shell:

```
$ halcyon-tutorial
Hello, world!
Hello?
```

Press `control-C` to stop your app.


### Options

By default, the tutorial app listens on port 8080.  You can change this by setting the `PORT` environment variable:

```
$ PORT=4040 halcyon-tutorial
```


Make a change
-------------

Let’s change the tutorial app so that each note can contain a timestamp.

The [`step2`](https://github.com/mietek/halcyon-tutorial/tree/step2) version of the app includes a new `dateTime` field in each note.

Clone the app:

```
$ git clone -q https://github.com/mietek/halcyon-tutorial
$ cd halcyon-tutorial
```

Check out `step2`, and install it with the Halcyon [`install`](/reference/#halcyon-install) command:

<div class="toggle">
<a class="toggle-button" data-target="make-a-change-log" href="" title="Toggle">Toggle</a>
``` { #make-a-change-log .toggle }
$ git checkout -q step2
$ halcyon install
-----> Examining cache contents
       halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       halcyon-ghc-7.8.4.tar.gz
       halcyon-install-0c985ba-halcyon-tutorial-1.0.tar.gz

-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **56bdea7**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-56bdea7-halcyon-tutorial-1.0.tar.gz... 404 (not found)

-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **56bdea7**
       Constraints hash:                         **becfd1b**
       Magic hash:                               **c7b5b77**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC

-----> Using existing Cabal directory

-----> Restoring sandbox directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... done, 140MB

-----> Restoring build directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-build-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 9.4MB
-----> Examining source changes
       * Main.hs
-----> Building app
       Building halcyon-tutorial-1.0...
       Preprocessing executable 'halcyon-tutorial' for halcyon-tutorial-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/halcyon-tutorial/halcyon-tutorial-tmp/Main.o )
       Linking dist/build/halcyon-tutorial/halcyon-tutorial ...
-----> App built, 12MB
       Stripping app... done, 9.4MB
-----> Archiving build directory
       Creating halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 2.1MB

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-56bdea7-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 8.8MB
-----> Archiving install directory
       Creating halcyon-install-56bdea7-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**

-----> Examining cache changes
       + halcyon-build-halcyon-tutorial-1.0.tar.gz
       - halcyon-install-0c985ba-halcyon-tutorial-1.0.tar.gz
       + halcyon-install-56bdea7-halcyon-tutorial-1.0.tar.gz
       + halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz
```
</div>

> ---------------------|---
> _Expected time:_     | _30–40 seconds_

In this step, Halcyon tries to restore the tutorial app’s install directory by using an archive from public storage.  This fails, and so Halcyon falls back to building the app:

1.  First, the existing GHC and Cabal directories are reused, and the app’s _sandbox directory_ is restored from public storage.

2.  Next, Halcyon restores the app’s _build directory_ from public storage, and performs an incremental build.

3.  Finally, the app’s new install directory is prepared and archived, and the app is installed.

Halcyon determines which sandbox archive to restore by calculating a _constraints hash_ of the version constraints declared by your app.  Similarly, the right version of GHC to use is implied by the `base` package constraint:

```
$ grep -E '^base-' .halcyon/constraints
base-4.7.0.2
```

Your app is now ready to run again:

```
$ halcyon-tutorial
```
```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":""}]
```


Declare a dependency
--------------------

Now, let’s change the tutorial app so that it remembers the time each note is added.

The [`step3`](https://github.com/mietek/halcyon-tutorial/tree/step3) version of the app declares the standard Haskell [_old-locale_](http://hackage.haskell.org/package/old-locale) and [_time_](http://hackage.haskell.org/package/time) libraries as dependencies:

```
$ git diff step2 step3 halcyon-tutorial.cabal
...
**@@ -14,9 +14,11 @@** executable halcyon-tutorial
   ghc-options:        -O2 -Wall -threaded
   build-depends:      base,
                       aeson,
**+                      old-locale,**
                       servant,
                       servant-server,
                       stm,
                       text,
**+                      time,**
                       transformers,
                       warp
```

Check out and install `step3`:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-dependency-log" href="" title="Toggle">Toggle</a>
``` { #declare-a-dependency-log .toggle }
$ git checkout -q step3
$ halcyon install
-----> Examining cache contents
       halcyon-build-halcyon-tutorial-1.0.tar.gz
       halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       halcyon-ghc-7.8.4.tar.gz
       halcyon-install-56bdea7-halcyon-tutorial-1.0.tar.gz
       halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz

-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **1382694**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz... 404 (not found)

-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **1382694**
       Constraints hash:                         **becfd1b**
       Magic hash:                               **c7b5b77**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC

-----> Using existing Cabal directory

-----> Using existing sandbox directory

-----> Restoring build directory
       Extracting halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 9.4MB
-----> Examining source changes
       * Main.hs
       * halcyon-tutorial.cabal
-----> Configuring app
-----> Building app
       Building halcyon-tutorial-1.0...
       Preprocessing executable 'halcyon-tutorial' for halcyon-tutorial-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/halcyon-tutorial/halcyon-tutorial-tmp/Main.o )
       Linking dist/build/halcyon-tutorial/halcyon-tutorial ...
-----> App built, 12MB
       Stripping app... done, 9.4MB
-----> Archiving build directory
       Creating halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 2.1MB

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 8.8MB
-----> Archiving install directory
       Creating halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**

-----> Examining cache changes
       * halcyon-build-halcyon-tutorial-1.0.tar.gz
       - halcyon-install-56bdea7-halcyon-tutorial-1.0.tar.gz
       + halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz
```
</div>

> ---------------------|---
> _Expected time:_     | _20–25 seconds_

In this step, Halcyon reuses the existing GHC, Cabal, and sandbox directories, performs an incremental build, and installs the app.

The previously-restored sandbox directory can be used again, because version constraints for our new dependencies are already declared:

```
$ grep -E '^(old-locale|time)' .halcyon/constraints
old-locale-1.0.0.6
time-1.4.2
```

Your app is now ready to run again:

```
$ halcyon-tutorial
```
```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":"2015-01-15T09:21:29Z"}]
```


Declare a constraint
--------------------

Let’s try to simplify the code by using a third-party library.

The [`step4`](https://github.com/mietek/halcyon-tutorial/tree/step4) version of the app replaces _old-locale_ and _time_ with the [_hourglass_](http://hackage.haskell.org/package/hourglass) library:

```
$ git diff step3 step4 halcyon-tutorial.cabal
...
**@@ -14,11 +14,10 @@** executable halcyon-tutorial
   ghc-options:        -O2 -Wall -threaded
   build-depends:      base,
                       aeson,
**-                      old-locale,**
**+                      hourglass,**
                       servant,
                       servant-server,
                       stm,
                       text,
**-                      time,**
                       transformers,
                       warp
```

In order for Halcyon to provide the right sandbox directory, we need to declare version constraints for _hourglass_ and all of its dependencies.  You can determine these constraints using Halcyon.

Check out `step4`, and try installing it:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-constraint-log" href="" title="Toggle">Toggle</a>
``` { #declare-a-constraint-log .toggle }
$ git checkout -q step4
$ halcyon install
-----> Examining cache contents
       halcyon-build-halcyon-tutorial-1.0.tar.gz
       halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       halcyon-ghc-7.8.4.tar.gz
       halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz
       halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz

-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **bf9e916**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-bf9e916-halcyon-tutorial-1.0.tar.gz... 404 (not found)

-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **bf9e916**
       Constraints hash:                         **becfd1b**
       Magic hash:                               **c7b5b77**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC

-----> Using existing Cabal directory

-----> Using existing sandbox directory
**   *** WARNING: Unexpected constraints difference**
       @@ -38,6 +38,7 @@
        free-4.10.0.1
        ghc-prim-0.3.1.0
        hashable-1.2.3.1
       +hourglass-0.2.8
        http-date-0.0.4
        http-types-0.8.5
        integer-gmp-0.5.1.0

-----> Restoring build directory
       Extracting halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 9.4MB
-----> Examining source changes
       * Main.hs
       * halcyon-tutorial.cabal
-----> Configuring app
       ...
       Could not resolve dependencies:
       trying: halcyon-tutorial-1.0 (user goal)
       next goal: hourglass (dependency of halcyon-tutorial-1.0)
       Dependency tree exhaustively searched.
       Configuring halcyon-tutorial-1.0...
       cabal: At least the following dependencies are missing:
       hourglass -any
**   *** ERROR: Failed to configure app**
```
</div>

> ---------------------|---
> _Expected time:_     | _10–15 seconds_

In this step, Cabal fails to configure the app, because the _hourglass_ library isn’t provided in the existing sandbox directory, and Halcyon suggests adding a single version constraint, `hourglass-0.2.8`.

The [`step5`](https://github.com/mietek/halcyon-tutorial/tree/step5) version of the app declares this constraint:

```
$ git diff -U1 step4 step5 .halcyon/constraints
...
**@@ -40,2 +40,3 @@** ghc-prim-0.3.1.0
 hashable-1.2.3.1
**+hourglass-0.2.6**
 http-date-0.0.4
```


Build the sandbox
---------------

Halcyon always provides a sandbox directory matching the declared version constraints.  If needed, the sandbox directory is built on-the-fly — either from scratch, or based on a previously-built sandbox.

Check out and install `step5`:

<div class="toggle">
<a class="toggle-button" data-target="build-the-sandbox-log" href="" title="Toggle">Toggle</a>
``` { #build-the-sandbox-log .toggle }
$ git checkout -q step5
$ halcyon install
-----> Examining cache contents
       halcyon-build-halcyon-tutorial-1.0.tar.gz
       halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       halcyon-ghc-7.8.4.tar.gz
       halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz
       halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz

-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **b28289b**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... 404 (not found)

-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **b28289b**
       Constraints hash:                         **3ad1ba3**
       Magic hash:                               **c23e21c**
       External storage:                         **public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Using existing GHC

-----> Using existing Cabal directory

-----> Restoring sandbox directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Locating sandbox directories
       Listing https://halcyon.global.ssl.fastly.net/... done
-----> Examining partially matching sandbox directories
       ...
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.constraints... done
-----> Scoring partially matching sandbox directories
       Ignoring hello-miku-1.0 (3c81d66) as HUnit-1.2.5.2 is not needed
       Ignoring hello-snap-1.0 (4af96d8) as HUnit-1.2.5.2 is not needed
       Ignoring hello-wheb-1.0 (4c4bfdc) as SHA-1.6.4.1 is not needed
            41 hello-wai-1.0 (028a0e6)
       Ignoring hello-scotty-1.0 (33c011e) as data-default-0.5.3 is not needed
       Ignoring hello-happstack-1.0 (47c3e8d) as base-unicode-symbols-0.2.2.4 is not needed
       Ignoring hello-spock-1.0 (0331829) as QuickCheck-2.7.6 is not needed
           101 halcyon-tutorial-1.0 (becfd1b)
       Ignoring hello-yesod-1.0 (dac4ebf) as asn1-encoding-0.9.0 is not needed
-----> Using partially matching sandbox directory: halcyon-tutorial-1.0 (becfd1b)
-----> Restoring sandbox directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... done, 140MB
-----> Building sandbox directory
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       Downloading hourglass-0.2.6...
       Configuring hourglass-0.2.6...
       Building hourglass-0.2.6...
       Installed hourglass-0.2.6
-----> Sandbox built, 144MB
       Removing documentation from sandbox directory... done, 144MB
       Stripping sandbox directory... done, 143MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... done, 24MB

-----> Restoring build directory
       Extracting halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 9.4MB
-----> Examining source changes
       * .halcyon/constraints
       * Main.hs
       * cabal.config
       * halcyon-tutorial.cabal
-----> Configuring app
-----> Building app
       Building halcyon-tutorial-1.0...
       Preprocessing executable 'halcyon-tutorial' for halcyon-tutorial-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/halcyon-tutorial/halcyon-tutorial-tmp/Main.o )
       Linking dist/build/halcyon-tutorial/halcyon-tutorial ...
-----> App built, 13MB
       Stripping app... done, 9.8MB
-----> Archiving build directory
       Creating halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 2.2MB

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 9.1MB
-----> Archiving install directory
       Creating halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**

-----> Examining cache changes
       * halcyon-build-halcyon-tutorial-1.0.tar.gz
       - halcyon-install-1382694-halcyon-tutorial-1.0.tar.gz
       + halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz
       + halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz
```
</div>

> ---------------------|---
> _Expected time:_     | _60–90 seconds_

In this step, Halcyon reuses the existing GHC and Cabal directories, and tries to locate the right sandbox directory for the current version of the app.  This fails, and so Halcyon falls back to building the sandbox:

1.  First, previously-built sandbox directories are located and assigned a score, which reflects the number of required dependencies within each sandbox.

2.  Next, Halcyon builds and archives a new sandbox, based on the highest-scoring _partially-matching_ sandbox directory.

3.  Finally, an incremental build is performed, and the app is installed.

Your app is now ready to run again:

```
$ halcyon-tutorial
```
```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":"2015-01-15T09:28:26+00:00"}]
```


Set up private storage
----------------------

Halcyon can use _private storage_ as well as public storage.  Private storage is an external cache for the apps and dependencies you build.

By using private storage, you can share archives between multiple machines, and avoid running into resource limits on your installation targets.

To use private storage, you’ll need to:

- Sign up for an [Amazon Web Services](http://aws.amazon.com/) account

- Create an [Amazon IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SettingUpUser.html) and an [Amazon S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)

- Give the IAM user [permission to access](http://docs.aws.amazon.com/IAM/latest/UserGuide/PermissionsAndPolicies.html) the S3 bucket

Once you’re done, configure private storage by setting [`HALCYON_AWS_ACCESS_KEY_ID`](/reference/#halcyon_aws_access_key_id),  [`HALCYON_AWS_SECRET_ACCESS_KEY`](/reference/#halcyon_aws_secret_access_key), and [`HALCYON_S3_BUCKET`](/reference/#halcyon_s3_bucket):

```
$ export HALCYON_AWS_ACCESS_KEY_ID=example-access-key-id
$ export HALCYON_AWS_SECRET_ACCESS_KEY=example-secret-access-key
$ export HALCYON_S3_BUCKET=example-bucket
```

If your S3 bucket isn’t located in the Amazon US Standard region, set [`HALCYON_S3_ENDPOINT`](/reference/#halcyon_s3_endpoint) to the address of the right [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region):

```
$ export HALCYON_S3_ENDPOINT=s3-example-region.amazonaws.com
```


### Options

By default, all uploads are assigned the `private` [Amazon S3 ACL](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html).  To make newly-uploaded files available to the public, set [`HALCYON_S3_ACL`](/reference/#halcyon_s3_acl) to `public-read`:

```
$ export HALCYON_S3_ACL=public-read
```


Use private storage
-------------------

Let’s force Halcyon to build the sandbox directory again, in order to populate your private storage.

Remove the existing GHC, Cabal, and sandbox directories:

```
$ rm -rf /app/ghc /app/cabal /app/sandbox
```

Install the app again, using the [`HALCYON_PURGE_CACHE`](/reference/#halcyon_purge_cache) option to empty the cache directory before building:

<div class="toggle">
<a class="toggle-button" data-target="populate-private-storage-log" href="" title="Toggle">Toggle</a>
``` { #populate-private-storage-log .toggle }
$ halcyon install --purge-cache
-----> Purging cache

-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **b28289b**
       External storage:                         **private and public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... 404 (not found)

-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **b28289b**
       Constraints hash:                         **3ad1ba3**
       Magic hash:                               **c23e21c**
       External storage:                         **private and public**
       GHC version:                              **7.8.4**
       Cabal version:                            **1.20.0.3**
       Cabal repository:                         **Hackage**

-----> Restoring GHC directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.4.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.4.tar.gz... done
       Uploading s3://example-bucket/linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.4.tar.gz... done
       Extracting halcyon-ghc-7.8.4.tar.gz... done, 701MB

-----> Locating Cabal directories
       Listing s3://example-bucket/?prefix=linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-... done
       Listing https://halcyon.global.ssl.fastly.net/... done
-----> Restoring Cabal directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz... done
       Uploading s3://example-bucket/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz... done, 181MB

-----> Restoring sandbox directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Locating sandbox directories
       Listing s3://example-bucket/?prefix=linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-... done
       Listing https://halcyon.global.ssl.fastly.net/... done
-----> Examining partially matching sandbox directories
       ...
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.constraints... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.constraints... done
-----> Scoring partially matching sandbox directories
       Ignoring hello-miku-1.0 (3c81d66) as HUnit-1.2.5.2 is not needed
       Ignoring hello-snap-1.0 (4af96d8) as HUnit-1.2.5.2 is not needed
       Ignoring hello-wheb-1.0 (4c4bfdc) as SHA-1.6.4.1 is not needed
            41 hello-wai-1.0 (028a0e6)
       Ignoring hello-scotty-1.0 (33c011e) as data-default-0.5.3 is not needed
       Ignoring hello-happstack-1.0 (47c3e8d) as base-unicode-symbols-0.2.2.4 is not needed
       Ignoring hello-spock-1.0 (0331829) as QuickCheck-2.7.6 is not needed
           101 halcyon-tutorial-1.0 (becfd1b)
       Ignoring hello-yesod-1.0 (dac4ebf) as asn1-encoding-0.9.0 is not needed
-----> Using partially matching sandbox directory: halcyon-tutorial-1.0 (becfd1b)
-----> Restoring sandbox directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz... done, 140MB
-----> Building sandbox directory
-----> Building sandbox
       Resolving dependencies...
       Notice: installing into a sandbox located at /app/sandbox
       Downloading hourglass-0.2.6...
       Configuring hourglass-0.2.6...
       Building hourglass-0.2.6...
       Installed hourglass-0.2.6
-----> Sandbox built, 144MB
       Removing documentation from sandbox directory... done, 144MB
       Stripping sandbox directory... done, 143MB
-----> Archiving sandbox directory
       Creating halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... done, 24MB
       Uploading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... done
       Uploading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.constraints... done
       Listing s3://example-bucket/?prefix=linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-... done

-----> Restoring build directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-build-halcyon-tutorial-1.0.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-build-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 9.4MB
-----> Examining source changes
       * .halcyon/constraints
       * Main.hs
       * cabal.config
       * halcyon-tutorial.cabal
-----> Configuring app
-----> Building app
       Building halcyon-tutorial-1.0...
       Preprocessing executable 'halcyon-tutorial' for halcyon-tutorial-1.0...
       [1 of 1] Compiling Main             ( Main.hs, dist/build/halcyon-tutorial/halcyon-tutorial-tmp/Main.o )
       Linking dist/build/halcyon-tutorial/halcyon-tutorial ...
-----> App built, 13MB
       Stripping app... done, 9.8MB
-----> Archiving build directory
       Creating halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 2.2MB
       Uploading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-build-halcyon-tutorial-1.0.tar.gz... done

-----> Restoring install directory
       Downloading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... 404 (not found)
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 9.1MB
-----> Archiving install directory
       Creating halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
       Uploading s3://example-bucket/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz... done
       Listing s3://example-bucket/?prefix=linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-... done
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**

-----> Examining cache changes
       + halcyon-build-halcyon-tutorial-1.0.tar.gz
       + halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
       + halcyon-ghc-7.8.4.tar.gz
       + halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz
       + halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz
       + halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.tar.gz
```
</div>

In this step, Halcyon builds the sandbox and the app again.

All downloaded and newly-created archives are uploaded to your private storage:

```
$ s3_list example-bucket linux-ubuntu-14
       Listing s3://example-bucket/?prefix=linux-ubuntu-14... done
linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-build-halcyon-tutorial-1.0.tar.gz
linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-b28289b-halcyon-tutorial-1.0.tar.gz
linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.constraints
linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz
linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-15.tar.gz
linux-ubuntu-14.04-x86_64/halcyon-ghc-7.8.4.tar.gz
```


### Options

You can disable public or private storage with the [`HALCYON_NO_PUBLIC_STORAGE`](/reference/#halcyon_no_public_storage) and [`HALCYON_NO_PRIVATE_STORAGE`](/reference/#halcyon_no_private_storage) options.


Next steps
----------

You now know how to use Halcyon to develop Haskell apps.  You have also developed a simple Haskell web service.

- See the [Halcyon reference](/reference/) for a complete list of available commands and options.

- Read the [Haskell on Heroku tutorial](https://haskellonheroku.com/tutorial/) to learn how to deploy Haskell web apps to [Heroku](https://heroku.com/).
