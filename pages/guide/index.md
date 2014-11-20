---
title: User’s guide
page-class: add-main-toc tweak-listings
page-data:
- key: max-section-toc-level
  value: 1
page-head: |
  <style>
    header a.link-guide {
      color: #3f96f0;
    }
  </style>
---


User’s guide
============

**TODO**

<nav id="main-toc"></nav>


Setting up a build machine
--------------------------

**TLDR:**  Set up a Ubuntu 14.04 LTS (64-bit) machine with 8GB RAM, and install Halcyon.

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <(~/halcyon/halcyon paths)
```

<a class="pill-button" href="setting-up-a-build-machine/">Learn more</a>


Deploying a development environment
-----------------------------------

**TODO**

`--no-app`


Deploying an application
------------------------

**TODO**

`--no-build`
`--no-build-dependencies`


### Layers

Halcyon speeds up builds by archiving dependencies in _layers_.  GHC, cabal-install and the Cabal package database, the application sandbox—each of these layers is archived separately from the application build and install directories.


### Cache

All archives are cached locally on the build machine.  The cache directory is defined by [`HALCYON_CACHE_DIR`](reference/#halcyon_cache_dir), which defaults to `/var/tmp/halcyon-cache`.

In order to delete the entire contents of the cache before deploying an application, set [`HALCYON_PURGE_CACHE`](reference/#halcyon_purge_cache) to `1`.

To prevent Halcyon from creating any archives, set [`HALCYON_NO_ARCHIVE`](reference/#halcyon_no_archive) to `1`.

Halcyon automatically cleans the cache after an application is deployed, retaining the most recently used archives.  To disable automatic cache cleaning, set [`HALCYON_NO_CLEAN_CACHE`](reference/#halcyon_no_clean_cache) to `1`.


### Public storage

**TODO**


Setting up separate build and deploy machines
---------------------------------------------

**_TLDR_**:  Set up a number of Ubuntu 14.04 LTS (64-bit) [build machines](how-to-set-up-a-build-machine/), and configure each to use the same [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html) bucket.

```
# export HALCYON_AWS_ACCESS_KEY_ID=...
# export HALCYON_AWS_SECRET_ACCESS_KEY=...
# export HALCYON_S3_BUCKET=...
```

<a class="pill-button" href="setting-up-separate-build-and-deploy-machines/">Learn more</a>


Building an application from scratch
------------------------------------

(ghc, cabal, sandbox, app)
