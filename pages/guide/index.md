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

Set up a Ubuntu 14.04 LTS (`x86_64`) machine with 8GB RAM, and install Halcyon.

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
# git clone https://github.com/mietek/halcyon ~/halcyon
# source <( ~/halcyon/halcyon paths )
```

Halcyon is now ready to deploy any of the [example applications](/examples/).  Read on for options and details.


Single-machine setup
--------------------

To set up one machine for both building and deploying applications:

1.  Provision a machine with one of the supported operating systems, and install the required OS packages.

2.  Clone the Halcyon source repository, and set the necessary environment variables.


### Hardware requirements

The build machine must be capable of compiling and linking Haskell programs.  Many common Cabal packages will fail to build with less than 2GB RAM available.

At least 8GB RAM is recommended.  Halcyon will use all available cores to build packages in parallel.


### Supported platforms

Halcyon is written in a cross-platform fashion, and additional platforms to support are currently under consideration.


#### Ubuntu 14.04 LTS (`x86_64`)

```
# apt-get update
# apt-get install build-essential git pigz zlib1g-dev
```


#### Ubuntu 12.04 LTS (`x86_64`)

```
# apt-get update
# apt-get install build-essential git libgmp3c2 pigz zlib1g-dev
```

_libgmp3c2_ can be skipped when using GHC 7.8 or newer.


#### Ubuntu 10.04 LTS (`x86_64`)

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

To disable self-updates, set [`HALCYON_NO_SELF_UPDATE`](/reference/#halcyon_no_self_update) to `1`.


#### Base directory and prefix

Halcyon requires write access to the `/app` directory, which is used for restoring or building layers.  By default, the same directory is also where applications are installed.  These are two separate concepts, defined by [`HALCYON_BASE`](/reference/#halcyon_base) and [`HALCYON_PREFIX`](/reference/#halcyon_prefix), respectively.

1.  While changing [`HALCYON_BASE`](/reference/#halcyon_base) is possible, a GHC installation is not easily relocatable, and neither are Cabal sandboxes.  Therefore, using a different path than `/app` for the application directory will cause Halcyon to reject all public archives as incompatible, and rebuild everything from scratch.  This may or may not be a problem, but it will prevent getting started as quickly as possible.

2.  On the other hand, [`HALCYON_PREFIX`](/reference/#halcyon_prefix) can be easily changed.  Using a different path than `/app` for the prefix will only cause Halcyon to reconfigure and incrementally build any previously built applications, during a subsequent build.

More complex workflows can be constructed by changing [`HALCYON_ROOT`](/reference/#halcyon_root) from the default `/` to an appropriate path.


#### Environment variables

Sourcing the output of [`halcyon paths`](/reference/#paths) sets up the necessary environment variables, based on the path to the application directory.  This is best done as part of a `.profile` script.



Building applications
---------------------

**TODO**


### Concepts

#### GHC layer

> ---------------------|---
> Directory path:      | [`HALCYON_BASE`](#halcyon_base)`/ghc`
> Archive name:        | `halcyon-ghc-`_`ghc_version`_`-`_`ghc_magic_hash`_`.tar.gz`


#### Cabal layer

> ---------------------|---
> Directory path:      | [`HALCYON_BASE`](#halcyon_base)`/cabal`
> Archive name:        | `halcyon-cabal-`_`cabal_version`_`-`_`cabal_magic_hash`_`-`_`cabal_repo_name`_`-`_`cabal_date`_`.tar.gz`


#### Sandbox layer

> ---------------------|---
> Directory path:      | [`HALCYON_BASE`](#halcyon_base)`/sandbox`
> Archive name:        | `halcyon-sandbox-`_`constraints_hash`_`-`_`sandbox_magic_hash`_`-`_`label`_`.tar.gz`


#### Application source directory

> ---------------------|---
> Directory path:      | _temporary_
> Archive name:        | _none_


#### Application build directory

> ---------------------|---
> Directory path:      | _temporary_
> Archive name:        | `halcyon-app-build-`_`label`_`.tar.gz`


#### Application install directory

> ---------------------|---
> Directory path:      | _temporary_
> Archive name:        | `halcyon-app-install-`_`source_hash`_`-`_`label`_`.tar.gz`


### Dependencies

By default, build-time dependencies are deleted after the application is installed.  Moreover, if an application install archive is available, build-time dependencies will not even be restored.  This can be fully or partially overridden by setting [`HALCYON_KEEP_DEPENDENCIES`](/reference/#halcyon_keep_dependencies) or [`HALCYON_RESTORE_DEPENDENCIES`](/reference/#halcyon_restore_dependencies) to `1`.

However, applications which require build-time dependencies to be available at runtime should include them in the application install directory.  This can be enabled by setting [`HALCYON_APP_EXTRA_COPY`](/reference/#halcyon_app_extra_copy) to `all`.


### Cache

All archives are cached locally on the build machine.  The cache directory is defined by [`HALCYON_CACHE`](/reference/#halcyon_cache), which defaults to `/var/tmp/halcyon-cache`.

In order to delete the entire contents of the cache before deploying an application, set [`HALCYON_PURGE_CACHE`](/reference/#halcyon_purge_cache) to `1`.

To prevent Halcyon from creating any archives, set [`HALCYON_NO_ARCHIVE`](/reference/#halcyon_no_archive) to `1`.

Halcyon cleans the cache after an application is deployed, retaining the most recently used archives.  To disable cache cleaning, set [`HALCYON_NO_CLEAN_CACHE`](/reference/#halcyon_no_clean_cache) to `1`.


### Public storage

**TODO**



Multiple-machine setup
----------------------

To set up separate machines for building and deploying applications:

1.  Provision as many machines as needed, including at least one dedicated build machine.  Set up all machines as [described above](#single-machine-setup).

2.  Sign up for [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html), create an S3 bucket, and configure each machine to use the same S3 bucket.


### Build and deploy

The only necessary difference between build and deploy machines is their purpose, which follows from their capabilities.

Halcyon is designed to deploy applications by building everything on the fly, as needed.  If there is no need to build anything, deployment consists of restoring a single application install archive.  This should not consume any significant machine resources, and is expected to finish in under 10 seconds.

Non-trivial Haskell application will not build successfully on a machine with 512MB RAM.  However, deploying many applications on the same machine should work perfectly well.


### Private storage

Private storage allows Halcyon to be used in situations where no permanent storage is available, such as [Haskell on Heroku](https://haskellonheroku.com/).


#### AWS credentials

Halcyon signs all S3 requests with [`HALCYON_AWS_ACCESS_KEY_ID`](/reference/#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](/reference/#halcyon_aws_secret_access_key).

```
# export HALCYON_AWS_ACCESS_KEY_ID=...
# export HALCYON_AWS_SECRET_ACCESS_KEY=...
```

Using dedicated [IAM credentials](http://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html) is recommended.


#### S3 bucket

The S3 bucket used to store private archives is defined by [`HALCYON_S3_BUCKET`](/reference/#halcyon_s3_bucket).

```
# export HALCYON_S3_BUCKET=...
```

By default, all files uploaded to the bucket are assigned the `private` S3 access control list.  To make any subsequent uploads available publicly, set [`HALCYON_S3_ACL`](/reference/#halcyon_s3_acl) to `public-read`.

**NOTE:**  The default S3 host, `s3.amazonaws.com`, can only be used for buckets located in the US Standard region.  To use a bucket located in a different region, set [`HALCYON_S3_HOST`](/reference/#halcyon_s3_host) to the appropriate address, such as `s3-eu-west-1.amazonaws.com`.

To prevent Halcyon from uploading any files to the bucket, set [`HALCYON_NO_UPLOAD`](/reference/#halcyon_no_upload) to `1`.

Certain files, such as Cabal layer archives, are deleted from the bucket when Halcyon considers them out-of-date.  This can be disabled by setting [`HALCYON_NO_DELETE`](/reference/#halcyon_no_delete) to `1`.
