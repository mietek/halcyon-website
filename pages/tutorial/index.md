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

The tutorial assumes you’re using a [supported Linux system](/guide/#supported-platforms) with at least 4 GB RAM, and a [GNU _bash_](https://gnu.org/software/bash/) shell.

Run the [setup script](https://github.com/mietek/halcyon/raw/master/setup.sh) to install Halcyon:

<div class="toggle">
<a class="toggle-button" data-target="set-up-log" href="" title="Toggle">Toggle</a>
``` { #set-up-log .toggle }
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
-----> Welcome to Halcyon
[sudo] password for yourself:
-----> Creating base directory: /app
-----> Installing OS packages
       ...
-----> Installing Halcyon in /app/halcyon... done, 9d37342
-----> Installing bashmenot in /app/halcyon/lib/bashmenot... done, 8bd8ea3
-----> Extending .bash_profile
```
</div>

Halcyon is now installed and ready to use:

```
$ which halcyon
/app/halcyon/halcyon
```


### Tips

By default, Halcyon is installed in the `halcyon` subdirectory of the [base directory](/guide/#base-and-prefix-directories), which defaults to `/app`.  If you want to install Halcyon somewhere else, set the [`HALCYON_DIR`](/reference/#halcyon_dir) environment variable before running the setup script:

```
$ export HALCYON_DIR=...
```

If you don’t want your `.bash_profile` to be modified, set [`HALCYON_NO_MODIFY_HOME`](/reference/#halcyon_no_modify_home) to `1` before running the setup script.  In the future, you’ll need to activate Halcyon manually before each use:

```
$ source <( /app/halcyon/halcyon paths )
```

Using a custom base directory is not recommended, because it’ll prevent you from getting started as quickly as possible.  If you still want to do it, set [`HALCYON_BASE`](/reference/#halcyon_base) before running the setup script.


Install GHC and Cabal
---------------------

Run [`halcyon install`](/reference/#halcyon-install) to install GHC and Cabal:

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

In this step, Halcyon restores the _GHC directory_ and the _Cabal directory_ by extracting archives downloaded from [public storage](/guide/#storage-and-caching).

GHC and Cabal are now ready to use:

```
$ which ghc
/app/ghc/bin/ghc
```
```
$ which cabal
/app/cabal/bin/cabal
```


### Tips

Halcyon defaults to GHC 7.8.4 and _cabal-install_ 1.20.0.3.  You can change this by specifying the [`--ghc-version=...`](/reference/#halcyon_ghc_version) and [`--cabal-version=...`](/reference/#halcyon_cabal_version) options:

```
$ halcyon install --ghc-version=7.6.3
```

If the current directory contains a Haskell app, running [`halcyon install`](/reference/#halcyon-install) will install the app, unless you use the [`--no-app`](/reference/#halcyon_no_app) option.


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

In this step, Halcyon restores the _install directory_ from public storage.

The app is now ready to run:

```
$ which halcyon-tutorial
/app/bin/halcyon-tutorial
```


### Tips

By default, the app is installed in the `/app` directory.  You can change this with the [`--prefix=...`](/reference/#halcyon_prefix) option.

The correct install directory to use is determined by calculating a _source hash_ of the source directory.


Run the app
-----------

The tutorial app is a simple in-memory noteboard, exposing one HTTP endpoint, `/notes`, which accepts `GET` and `POST` requests.

Notes are JSON objects with a single text field, `contents`.  The app responds to each request with a list of all notes.

Start the app in one shell:

```
$ halcyon-tutorial
```

In another shell, make a `GET` request to see the empty noteboard:

```
$ curl localhost:8080/notes
[]
```

Make a couple `POST` requests to add some notes:

```
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!"}]
```
```
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello?" }'
[{"contents":"Hello?"},{"contents":"Hello, world!"}]
```

The notes are also logged to the original shell:

```
$ halcyon-tutorial
Hello, world!
Hello?
```

Press `control-C` to stop the app.


### Tips

By default, the app listens on port 8080.  You can change this by setting the `PORT` environment variable.


Make a change
-------------

Let’s change the app so that it each note can contain a date and time.

Use _git_ to make a local copy of the [tutorial app](https://github.com/mietek/halcyon-tutorial) repository:

```
$ git clone -q https://github.com/mietek/halcyon-tutorial
```
```
$ cd halcyon-tutorial
```

Check out the `step2` version of the app, which includes a new `dateTime` field in each note:

```
$ git checkout -q step2
```

Install the app again:

<div class="toggle">
<a class="toggle-button" data-target="make-a-change-log" href="" title="Toggle">Toggle</a>
``` { #make-a-change-log .toggle }
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

In this step, Halcyon fails to restore the install directory, and falls back to building the application.

1.  First, the _sandbox directory_ is restored from public storage.

2.  Next, Halcyon restores the _build directory,_ and performs an incremental build.

3.  Finally, a new install directory is prepared and archived, and the app is installed.

The app is now ready to run again.

Make a `POST` request to see the change:

```
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":""}]
```


### Tips

Halcyon checks and reuses the previously restored GHC and Cabal directories.

The sandbox directory is located in the base directory, next to the GHC and Cabal directories.  The build is performed in a temporary directory, and the source directory is never modified.


Declare a dependency
--------------------

Let’s change the app so that it remembers the date and time when each note is added.

The Cabal package description file, [`halcyon-tutorial.cabal`](https://github.com/mietek/halcyon-tutorial/blob/master/halcyon-tutorial.cabal), is used to [declare dependencies](/guide/#declaring-dependencies).

The `step3` version of the app declares the standard Haskell [_old-locale_](http://hackage.haskell.org/package/old-locale) and [_time_](http://hackage.haskell.org/package/time) libraries as dependencies:

<div class="toggle">
<a class="toggle-button" data-target="declare-a-dependency-diff" href="" title="Toggle">Toggle</a>
``` { #declare-a-dependency-diff .toggle }
$ git diff step2 step3 halcyon-tutorial.cabal
diff --git a/halcyon-tutorial.cabal b/halcyon-tutorial.cabal
index 723b9df..cd34556 100644
--- a/halcyon-tutorial.cabal
+++ b/halcyon-tutorial.cabal
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

Check out and install `step3`:

```
$ git checkout -q step3
```
<div class="toggle">
<a class="toggle-button" data-target="declare-a-dependency-log" href="" title="Toggle">Toggle</a>
``` { #declare-a-dependency-log .toggle }
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

The previously restored sandbox directory is reused, because [version constraints](/guide/#version-constraints) for the _old-locale_ and _time_ libraries were already declared in the Halcyon [constraints](/reference/#halcyon_constraints) magic file, [`.halcyon/constraints`](https://github.com/mietek/halcyon-tutorial/blob/master/.halcyon/constraints):

```
$ git grep -E '^(old-locale|time)' step2 .halcyon/constraints
step1:.halcyon/constraints:53:**old-locale**-1.0.0.6
step1:.halcyon/constraints:83:**time**-1.4.2
```

The app is now ready to run again.

Make a `POST` request to see the change:

```
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":"2015-01-12T09:21:29Z"}]
```


### Tips

The correct sandbox directory to use is determined by calculating a _constraints hash_ of the declared version constraints.


Add a new dependency
--------------------

Let’s try to simplify the code by using a third-party library.

The `step4` version of the app declares the [_hourglass_](http://hackage.haskell.org/package/hourglass) library as a dependency, instead of _old-locale_ and _time_:

<div class="toggle">
<a class="toggle-button" data-target="add-a-new-dependency-diff1" href="" title="Toggle">Toggle</a>
``` { #add-a-new-dependency-diff1 .toggle }
$ git diff step3 step4 halcyon-tutorial.cabal
diff --git a/halcyon-tutorial.cabal b/halcyon-tutorial.cabal
index cd34556..55ef024 100644
--- a/halcyon-tutorial.cabal
+++ b/halcyon-tutorial.cabal
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

Adding a new dependency to the Cabal package description is simple, but what about the version constraints?

Check out `step4`, and try installing it:

```
$ git checkout -q step4
```
<div class="toggle">
<a class="toggle-button" data-target="add-a-new-dependency-log1" href="" title="Toggle">Toggle</a>
``` { #add-a-new-dependency-log1 .toggle }
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

In this step, Cabal fails to configure the app, because the _hourglass_ library is not included in the previously restored sandbox directory.

Halcyon’s warning suggests declaring a version constraint for `hourglass-0.2.8`, which is the newest available version of _hourglass._  `step5` declares this constraint:

<div class="toggle">
<a class="toggle-button" data-target="add-a-new-dependency-diff2" href="" title="Toggle">Toggle</a>
``` { #add-a-new-dependency-diff2 .toggle }
$ git diff step4 step5 .halcyon/constraints
diff --git a/.halcyon/constraints b/.halcyon/constraints
index 60dc85d..b40e2cc 100644
--- a/.halcyon/constraints
+++ b/.halcyon/constraints
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


Check out and install the `step5` version of the app:

```
$ git checkout -q step5
```
<div class="toggle">
<a class="toggle-button" data-target="add-a-new-dependency-log2" href="" title="Toggle">Toggle</a>
``` { #add-a-new-dependency-log2 .toggle }
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
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-3c81d66-hello-miku-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-4af96d8-hello-snap-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-4e16492-alex-3.1.3.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-6d8a1a2.4d296cb-hello-simple-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-028a0e6-hello-wai-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-33c011e-hello-scotty-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-47c3e8d-hello-happstack-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-7832c3f-hello-wheb-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-9382e66-cpphs-1.18.6.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-0331829-hello-spock-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-8160653.c5dac38-hello-apiary-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-becfd1b-halcyon-tutorial-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-dac4ebf-hello-yesod-1.0.constraints... done
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/ghc-7.8.4/halcyon-sandbox-f6c821c.4795c95-hello-mflow-1.0.constraints... done
-----> Scoring partially matching sandbox directories
       Ignoring hello-miku-1.0 (3c81d66) as HUnit-1.2.5.2 is not needed
       Ignoring hello-snap-1.0 (4af96d8) as HUnit-1.2.5.2 is not needed
       Ignoring alex-3.1.3 (4e16492) as QuickCheck-2.7.6 is not needed
            41 hello-wai-1.0 (028a0e6)
       Ignoring hello-scotty-1.0 (33c011e) as data-default-0.5.3 is not needed
       Ignoring hello-happstack-1.0 (47c3e8d) as base-unicode-symbols-0.2.2.4 is not needed
       Ignoring hello-wheb-1.0 (7832c3f) as SHA-1.6.4.1 is not needed
       Ignoring cpphs-1.18.6 (9382e66) as polyparse-1.10 is not needed
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

The app is now ready to run again.

Make a `POST` request to see the change:

```
$ curl -X POST localhost:8080/notes -d '{ "contents": "Hello, world!" }'
[{"contents":"Hello, world!","dateTime":"2015-01-12T09:28:26+00:00"}]
```


Next steps
----------

TODO


---

_**Work in progress.**  For updates, please follow <a href="https://twitter.com/mietek">@mietek</a>._

For more information, please see the [user’s guide](/guide/).
