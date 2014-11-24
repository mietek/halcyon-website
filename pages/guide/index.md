---
title: User’s guide
page-class: add-main-toc rule-before-h3 tweak-listings
page-data:
- key: max-main-toc-level
  value: 2
- key: max-back-link-level
  value: 3
page-head: |
  <style>
    header a.link-guide {
      color: #3f96f0;
    }
  </style>
---


User’s guide
============

**Work in progress.  All available information is up-to-date.**


<div><nav id="main-toc"></nav></div>


Quick start
-----------

Set up a Ubuntu 14.04 LTS (x86_64) machine with 8GB RAM, and install Halcyon.

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <( ~/halcyon/halcyon paths )
```

Halcyon is now ready to deploy any of the [example applications](/examples/).  Read on for options and details.


Setting up a build machine
--------------------------

1.  Provision a build machine with one of the supported operating systems, and install the required OS packages.

2.  Clone the Halcyon source repository, and set the necessary environment variables.


### Hardware requirements

The build machine must be capable of compiling and linking Haskell programs.  Many common Cabal packages will fail to build with less than 2GB RAM available.

At least 8GB RAM is recommended.  Halcyon will use all available cores to build packages in parallel.


### Supported platforms

Halcyon is written in a cross-platform fashion, and additional platforms to support are currently under consideration.


#### Ubuntu 14.04 LTS (x86_64)

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
```


#### Ubuntu 12.04 LTS (x86_64)

```
# apt-get update
# apt-get install build-essential git libgmp3c2 pigz zlib1g-dev
```

_libgmp3c2_ can be skipped when using GHC 7.8 or newer.


#### Ubuntu 10.04 LTS (x86_64)

```
# apt-get update
# apt-get install build-essential git-core libgmp3c2 pigz zlib1g-dev
# apt-get install --reinstall ca-certificates
```

**NOTE:**  Reinstalling _ca-certificates_ is required to fix _git_ cloning over HTTPS.


### Installing Halcyon

Halcyon is installed with _git_, and automatically keeps itself up-to-date.  [`halcyon paths`](/reference/#paths) helps set environment variables.

```
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <( ~/halcyon/halcyon paths )
```


#### Self-updates

Halcyon updates itself before executing any command.  The source repository used for self-updates is defined by [`HALCYON_URL`](/reference/#halcyon_url).

To disable self-updates, set [`HALCYON_NO_SELFUPDATE`](/reference/#halcyon_no_selfupdate) to `1`.


#### Application directory and prefix

Halcyon requires write access to the `/app` directory, which is used for restoring or building layers.  By default, the same directory is also where applications are installed.  These are two separate concepts, defined by [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir) and [`HALCYON_PREFIX`](/reference/#halcyon_prefix), respectively.

1.  While changing [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir) is possible, a GHC installation is not easily relocatable, and neither are Cabal sandboxes.  Therefore, using a different path than `/app` for the application directory will cause Halcyon to reject all public archives as incompatible, and rebuild everything from scratch.  This may or may not be a problem, but it will prevent getting started as quickly as possible.

2.  On the other hand, [`HALCYON_PREFIX`](/reference/#halcyon_prefix) can be easily changed.  Using a different path than `/app` for the prefix will only cause Halcyon to reconfigure and incrementally build any previously built applications, during a subsequent build.

More complex workflows can be constructed by changing [`HALCYON_ROOT`](/reference/#halcyon_root) from the default `/` to an appropriate path.


#### Environment variables

Sourcing the output of [`halcyon paths`](/reference/#paths) sets up the necessary environment variables, based on the path to the application directory.  This is best done as part of a `.profile` script.



Building applications
---------------------

**TODO**


### Layers

Halcyon speeds up builds by archiving dependencies in _layers_.  GHC, _cabal-install_ and the Cabal package database, the application sandbox—each of these layers is archived separately from the application build and install directories.


### Cache

All archives are cached locally on the build machine.  The cache directory is defined by [`HALCYON_CACHE_DIR`](/reference/#halcyon_cache_dir), which defaults to `/var/tmp/halcyon-cache`.

In order to delete the entire contents of the cache before deploying an application, set [`HALCYON_PURGE_CACHE`](/reference/#halcyon_purge_cache) to `1`.

To prevent Halcyon from creating any archives, set [`HALCYON_NO_ARCHIVE`](/reference/#halcyon_no_archive) to `1`.

Halcyon cleans the cache after an application is deployed, retaining the most recently used archives.  To disable cache cleaning, set [`HALCYON_NO_CLEAN_CACHE`](/reference/#halcyon_no_clean_cache) to `1`.


### Public storage

**TODO**



Setting up separate build and deploy machines
---------------------------------------------

1.  Provision as many machines as needed, including one dedicated build machine.  Set up all machines as [build machines](#setting-up-a-build-machine).

2.  Sign up for [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html), create a bucket, and configure each machine to use the same bucket.


#### Build and deploy

The only difference between build and deploy machines is their purpose, which follows from their capabilities.

Halcyon is designed to deploy applications by building everything on the fly, as needed.  If there is no need to build anything, deployment consists of restoring a single application install archive.  This should not consume any significant machine resources, and is expected to finish in under 10 seconds.

Non-trivial Haskell application will not build successfully on a machine with 512MB RAM.  However, deploying many applications on the same machine should work perfectly well.


### Private storage


#### Credentials

Halcyon signs all S3 requests with [`HALCYON_AWS_ACCESS_KEY_ID`](/reference/#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](/reference/#halcyon_aws_secret_access_key).

```
# export HALCYON_AWS_ACCESS_KEY_ID=...
# export HALCYON_AWS_SECRET_ACCESS_KEY=...
```

Using dedicated [IAM credentials](http://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html) is recommended.


#### Bucket

The S3 bucket used to store private archives is defined by [`HALCYON_S3_BUCKET`](/reference/#halcyon_s3_bucket).

```
# export HALCYON_S3_BUCKET=...
```

By default, all files uploaded to the bucket are assigned the `private` S3 access control list.  To make any subsequent uploads available publicly, set [`HALCYON_S3_ACL`](/reference/#halcyon_s3_acl) to `public-read`.

**NOTE:**  The default S3 host, `s3.amazonaws.com`, can only be used for buckets located in the US Standard region.  To use a bucket located in a different region, set [`HALCYON_S3_HOST`](/reference/#halcyon_s3_host) to the appropriate address, such as `s3-eu-west-1.amazonaws.com`.

To prevent Halcyon from uploading any files to the bucket, set [`HALCYON_NO_UPLOAD`](/reference/#halcyon_no_upload) to `1`.

Certain files, such as Cabal layer archives, are deleted from the bucket when Halcyon considers them out-of-date.  This can be disabled by setting [`HALCYON_NO_DELETE`](/reference/#halcyon_no_delete) to `1`.