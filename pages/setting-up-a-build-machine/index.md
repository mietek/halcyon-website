---
title: Setting up a build machine
page-class: add-main-toc tweak-listings
page-data:
- key: max-section-toc-level
  value: 1
---


Setting up a build machine
==========================

These instructions explain how to set up a machine to build Haskell programs with Halcyon.

<nav id="main-toc"></nav>


TLDR
----

Set up a Ubuntu 14.04 LTS (64-bit) machine with 8GB RAM, and install Halcyon.

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <(~/halcyon/halcyon paths)
```

Done!  Read on for details.


Platform
--------

**_Step 1 of 2:_**  Provision a build machine with one of the following operating systems, and install the required OS packages.


### Supported operating systems

#### Ubuntu 14.04 LTS (64-bit)

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
```


#### Ubuntu 12.04 LTS (64-bit)

```
# apt-get update
# apt-get install build-essential git libgmp3c2 pigz zlib1g-dev
```

On Ubuntu 12, you can skip installing _libgmp3c2_ if you only plan to use GHC 7.8 or newer.


#### Ubuntu 10.04 LTS (64-bit)

```
# apt-get update
# apt-get install build-essential git-core libgmp3c2 pigz zlib1g-dev
# apt-get install --reinstall ca-certificates
```

**Note:**  Reinstalling _ca-certificates_ is required to fix _git_ cloning over HTTPS on Ubuntu 10.


### System requirements

Your build machine must be capable of compiling and linking Haskell programs.  Many common Cabal packages will fail to build with less than 2GB RAM available.

Get at least 8GB RAM, and as many CPU cores as you can spare.  Halcyon will use all available cores to build packages in parallel.


Halcyon
-------

**_Step 2 of 2:_**  Clone the Halcyon source repository, and set the necessary environment variables.

```
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <(~/halcyon/halcyon paths)
```


### Automatic updates

Halcyon updates itself automatically before executing any command.

The source repository used for automatic updates is defined by [`HALCYON_AUTOUPDATE_URL`](reference/#halcyon_autoupdate_url).  Should you wish to keep a stable fork of Halcyon for production use, point this to your repository.

To disable automatic updates, set [`HALCYON_NO_AUTOUPDATE`](reference/#halcyon_no_autoupdate) to `1`.


### Application directory and prefix

Halcyon requires write access to the `/app` directory.

The application directory is used to keep the Haskell development environment.  By default, it is also where applications are installed.  These are two separate concepts, defined by [`HALCYON_APP_DIR`](reference/#halcyon_app_dir) and [`HALCYON_PREFIX`](reference/#halcyon_prefix), respectively.

While changing [`HALCYON_APP_DIR`](reference/#halcyon_app_dir) is possible, a GHC installation is not easily relocatable, and neither are Cabal sandboxes.  Therefore, using a different path than `/app` for the application directory will cause Halcyon to reject all public archives as incompatible, and rebuild everything from scratch.  This may or may not be a problem for you, but it will prevent you from getting started as quickly as possible.

On the other hand, [`HALCYON_PREFIX`](reference/#halcyon_prefix) can be easily changed.  Using a different path than `/app` for the prefix will only cause Halcyon to reconfigure and incrementally build any previously built applications, during a subsequent build.

More complex workflows can be constructed by changing [`HALCYON_ROOT`](reference/#halcyon_root) from the default `/` to an appropriate path.


### Environment variables

Sourcing the output of the [`halcyon paths`](reference/#halcyon-paths) command automatically extends `PATH`, `LIBRARY_PATH`, and `LD_LIBRARY_PATH`, based on the path to the application directory.  You may wish to do so as part of your `.bash_profile` script.

**Note:**  Additionally, if `LANG` is not already exported, it is set to `C.UTF-8`.  Using a UTF-8 locale is required to work around Cabal issue [#1883](https://github.com/haskell/cabal/issues/1883).
