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


Set up Halcyon
--------------

The tutorial assumes you’re using a Linux system with at least 4 GB RAM, and a [GNU _bash_](https://gnu.org/software/bash/) shell.

Run the [setup script](https://github.com/mietek/halcyon/raw/master/setup.sh) to install Halcyon:

<div class="toggle">
<a class="toggle-button" data-target="set-up-log" href="" title="Toggle">Toggle</a>
``` { #set-up-log .toggle }
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
</div>

Halcyon is now installed and ready to use:

```
$ which halcyon
/app/halcyon/halcyon
```


### Options

By default, Halcyon is installed in the `halcyon` subdirectory of the base directory, which defaults to `/app`.  If you want to install Halcyon somewhere else, set the [`HALCYON_DIR`](/reference/#halcyon_dir) environment variable before running the setup script:

```
$ export HALCYON_DIR=...
```

If you don’t want your `.bash_profile` to be modified, set [`HALCYON_NO_MODIFY_HOME`](/reference/#halcyon_no_modify_home) to `1` before running the setup script.  In the future, you’ll need to activate Halcyon manually before each use:

```
$ source <( /app/halcyon/halcyon paths )
```

Halcyon also installs GHC, Cabal, and other dependencies in `/app`.  Changing this is not recommended, because it’ll prevent you from getting started as quickly as possible — instead of restoring previously built archives, Halcyon will have to build everything from scratch.  If you still want to change the base directory, set [`HALCYON_BASE`](/reference/#halcyon_base) before running the setup script.


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
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz... done
       Extracting halcyon-cabal-1.20.0.3-hackage-2015-01-12.tar.gz... done, 180MB

-----> GHC and Cabal installed
```
</div>

In this step, Halcyon restores a _GHC directory_ and a _Cabal directory_ by extracting archives downloaded from _public storage._

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

Halcyon defaults to GHC 7.8.4 and _cabal-install_ 1.20.0.3.  You can change this with the [`--ghc-version=...`](/reference/#halcyon_ghc_version) and [`--cabal-version=...`](/reference/#halcyon_cabal_version) options:

```
$ halcyon install --ghc-version=7.6.3
```


Install the app
---------------

Install the [tutorial app](https://github.com/mietek/halcyon-tutorial) directly from the _git_ repository:

<div class="toggle">
<a class="toggle-button" data-target="install-the-app-log" href="" title="Toggle">Toggle</a>
``` { #install-the-app-log .toggle }
$ halcyon install https://github.com/mietek/halcyon-tutorial
-----> Cloning https://github.com/mietek/halcyon-tutorial... done, f079321
-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **161d7b4**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-161d7b4-halcyon-tutorial-1.0.tar.gz... done
       Extracting halcyon-install-161d7b4-halcyon-tutorial-1.0.tar.gz... done, 8.8MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**
```
</div>

In this step, Halcyon restores an _install directory_ from public storage.  The correct archive to restore is determined by calculating a _source hash_ of the source directory.

The app is now ready to run:

```
$ which halcyon-tutorial
/app/bin/halcyon-tutorial
```


### Options

By default, Halcyon installs the app in the `/app` directory.  You can change this with the [`--prefix=...`](/reference/#halcyon_prefix) option.


Run the app
-----------

The tutorial app is a simple in-memory noteboard, exposing one HTTP endpoint, `/notes`, which accepts `GET` and `POST` requests.

Start the app in one shell:

```
$ halcyon-tutorial
```

In another shell, make a `GET` request to see the empty noteboard:

```
$ curl http://localhost:8080/notes
[]
```

Notes are JSON objects with a single text field, `contents`.  The app responds to each request with a list of all notes.

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

Press `control-C` to stop the app.


### Options

By default, the app listens on port 8080.  You can change this by setting the `PORT` environment variable:

```
$ PORT=4040 halcyon-tutorial
```


Make a change
-------------

Let’s change the app so that each note can contain a date and time.

Use _git_ to make a local copy of the [`step2`](https://github.com/mietek/halcyon-tutorial/tree/2) version of the app, which includes a new `dateTime` field in each note:

```
$ git clone -q https://github.com/mietek/halcyon-tutorial -b step2
```

Install the app again:

<div class="toggle">
<a class="toggle-button" data-target="make-a-change-log" href="" title="Toggle">Toggle</a>
``` { #make-a-change-log .toggle }
$ cd halcyon-tutorial
$ halcyon install
-----> Installing halcyon-tutorial-1.0
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **500d468**
       External storage:                         **public**
       GHC version:                              **7.8.4**

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-500d468-halcyon-tutorial-1.0.tar.gz... 404 (not found)

-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **500d468**
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
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-500d468-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 8.8MB
-----> Archiving install directory
       Creating halcyon-install-500d468-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**
```
</div>

In this step, Halcyon reuses the existing GHC and Cabal directories, and tries to restore the install directory.  This fails, and so Halcyon falls back to building the app:

1.  First, the _sandbox directory_ is restored from public storage.  The correct archive to restore is determined by calculating a _constraints hash_ of the declared version constraints.  The restored directory is located in the base directory, next to the GHC and Cabal directories.

2.  Next, Halcyon restores the _build directory,_ and performs an incremental build.  The build is performed in a temporary directory, and the source directory is never modified.

3.  Finally, a new install directory is prepared and archived, and the app is installed and ready to run again.

Make a `POST` request to see the change:

```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":""}]
```


Declare a dependency
--------------------

Let’s change the app so that it remembers when each note is added.

The [`step3`](https://github.com/mietek/halcyon-tutorial/tree/step3) version of the app declares the standard Haskell [_old-locale_](http://hackage.haskell.org/package/old-locale) and [_time_](http://hackage.haskell.org/package/time) libraries as dependencies:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-dependency-diff" href="" title="Toggle">Toggle</a>
``` { #declare-a-dependency-diff .toggle }
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
</div>

Check out and install [`step3`](https://github.com/mietek/halcyon-tutorial/tree/step3):

<div class="toggle">
<a class="toggle-button" data-target="declare-a-dependency-log" href="" title="Toggle">Toggle</a>
``` { #declare-a-dependency-log .toggle }
$ git checkout -q step3
$ halcyon install
-----> Installing halcyon-tutorial-1.0
       ...
-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **16e4c0e**
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
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-16e4c0e-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 8.8MB
-----> Archiving install directory
       Creating halcyon-install-16e4c0e-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            **halcyon-tutorial-1.0**
```
</div>

In this step, Halcyon again performs an incremental build.

Even though we added new dependencies, the existing sandbox directory is reused, because version constraints for these dependencies were already declared:

```
$ git grep -E '^(old-locale|time)' step2 .halcyon/constraints
step2:.halcyon/constraints:53:**old-locale**-1.0.0.6
step2:.halcyon/constraints:83:**time**-1.4.2
```

The app is now ready to run again.

Make a `POST` request to see the change:

```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":"2015-01-12T09:21:29Z"}]
```


Declare a version constraint
----------------------------

Let’s try to simplify the app by using a third-party library.

The [`step4`](https://github.com/mietek/halcyon-tutorial/tree/step4) version of the app replaces _old-locale_ and _time_ with  the [_hourglass_](http://hackage.haskell.org/package/hourglass) library:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-version-constraint-diff1" href="" title="Toggle">Toggle</a>
``` { #declare-a-version-constraint-diff1 .toggle }
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
</div>

Even though we know we want to use _hourglass,_ we don’t know which version constraints to declare — _hourglass_ could have its own dependencies, and we should add constraints for all of them.

Fortunately, Halcyon can help.  Check out [`step4`](https://github.com/mietek/halcyon-tutorial/tree/step4), and try installing it:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-version-constraint-log1" href="" title="Toggle">Toggle</a>
``` { #declare-a-version-constraint-log1 .toggle }
$ git checkout -q step4
$ halcyon install
-----> Installing halcyon-tutorial-1.0
       ...
-----> Determining constraints
       Label:                                    **halcyon-tutorial-1.0**
       Prefix:                                   **/app**
       Source hash:                              **19f66f1**
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

In this step, Cabal fails to configure the app, because the _hourglass_ library is not included in the existing sandbox directory — which matches the declared version constraints.

Halcyon’s warning suggests adding `hourglass-0.2.8` as a version constraint, as 0.2.8 is the newest available version of _hourglass._

The [`step5`](https://github.com/mietek/halcyon-tutorial/tree/step5) version of the app declares this constraint:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-version-constraint-diff2" href="" title="Toggle">Toggle</a>
``` { #declare-a-version-constraint-diff2 .toggle }
$ git diff step4 step5 .halcyon/constraints
...
**@@ -38,6 +38,7 @@** file-embed-0.0.7
 free-4.10.0.1
 ghc-prim-0.3.1.0
 hashable-1.2.3.1
**+hourglass-0.2.6**
 http-date-0.0.4
 http-types-0.8.5
 integer-gmp-0.5.1.0
```
</div>


Check out and install [`step5`](https://github.com/mietek/halcyon-tutorial/tree/step5):

<div class="toggle">
<a class="toggle-button" data-target="declare-a-version-constraint-log2" href="" title="Toggle">Toggle</a>
``` { #declare-a-version-constraint-log2 .toggle }
$ git checkout -q step5
$ halcyon install
-----> Installing halcyon-tutorial-1.0
       ...
-----> Determining constraints
       Label:                                    <b>halcyon-tutorial-1.0</b>
       Prefix:                                   <b>/app</b>
       Source hash:                              <b>56646e0</b>
       Constraints hash:                         <b>3ad1ba3</b>
       Magic hash:                               <b>c23e21c</b>
       External storage:                         <b>public</b>
       GHC version:                              <b>7.8.4</b>
       Cabal version:                            <b>1.20.0.3</b>
       Cabal repository:                         <b>Hackage</b>

-----> Using existing GHC

-----> Using existing Cabal directory

-----> Restoring sandbox directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3ad1ba3-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Locating sandbox directories
       Listing https://halcyon.global.ssl.fastly.net/?prefix=linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-... done
-----> Examining partially matching sandbox directories
       ...
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.constraints... done
-----> Scoring partially matching sandbox directories
       ...
           101 halcyon-tutorial-1.0 (becfd1b)
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
       Stripping app... done, 9.7MB
-----> Archiving build directory
       Creating halcyon-build-halcyon-tutorial-1.0.tar.gz... done, 2.1MB

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-install-56646e0-halcyon-tutorial-1.0.tar.gz... 404 (not found)
-----> Preparing install directory
-----> Installing extra data files for dependencies
-----> Install directory prepared, 9.1MB
-----> Archiving install directory
       Creating halcyon-install-56646e0-halcyon-tutorial-1.0.tar.gz... done, 2.0MB
-----> Installing app to /app
-----> Installed halcyon-tutorial-1.0

-----> App installed:                            <b>halcyon-tutorial-1.0</b>
```
</div>

In this step, Halcyon extends a _partially matching_ sandbox directory, and performs an incremental build:

1.  First, previously built sandboxes are located and examined.  Each sandbox is assigned a score, reflecting the number of required dependencies it contains.

2.  Next, Halcyon builds and archives a new sandbox directory, by installing missing dependencies into the highest scoring sandbox.

3.  Finally, the app is built, installed, and ready to run again.

Make a `POST` request to see the change:

```
$ curl -X POST http://localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":"2015-01-12T09:28:26+00:00"}]
```


Next steps
----------

TODO


---

_**Work in progress.**  For updates, please follow <a href="https://twitter.com/mietek">@mietek</a>._

For more information, please see the [user’s guide](/guide/).
