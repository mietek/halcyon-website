---
title: User’s guide
page-class: add-main-toc tweak-listings
page-data:
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

<div><nav id="main-toc"></nav></div>


Quick start
-----------

Set up a Ubuntu 14.04 LTS (`x86_64`) machine with 8GB of memory, and install Halcyon.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">apt-get update</span>
<span class="prompt">$</span> <span class="input">apt-get install build-essential git pigz zlib1g-dev</span>
<span class="prompt">$</span> <span class="input">git clone <a href="https://github.com/mietek/halcyon/">https://github.com/mietek/halcyon</a></span>
<span class="prompt">$</span> <span class="input">source &lt;( halcyon/halcyon paths )</span>
</code></pre>

Done!  Halcyon is now ready to deploy any of the [example applications](/examples/).

Read on for details.


Setting up a machine
--------------------

To set up one machine for building and deploying applications:

1.  [Provision a machine](#provisioning-a-machine) with one of the supported operating systems, and install the required OS packages.

2.  [Install Halcyon](#installing-halcyon) by cloning the Halcyon source repository, and set the needed environment variables.


### Provisioning a machine

Halcyon is designed to deploy applications by building all required dependencies on the fly.

The build machine must be capable of compiling and linking Haskell programs.  At least 8GB of memory is recommended, as many common Cabal packages will fail to build on a machine with less than 2GB of memory available.


#### Supported platforms

Currently, Halcyon fully supports deploying to Ubuntu LTS (`x86_64`) only.

Partial support is available for CentOS and OS X, minus the capability to install additional OS libraries.


##### Ubuntu 14.04 LTS (`x86_64`)

```
$ apt-get update
$ apt-get install build-essential git pigz zlib1g-dev
```


##### Ubuntu 12.04 LTS (`x86_64`)

```
$ apt-get update
$ apt-get install build-essential git libgmp3c2 pigz zlib1g-dev
```

**Note:**  _libgmp3c2_ can be skipped when using GHC 7.8 or newer.


##### Ubuntu 10.04 LTS (`x86_64`)

```
$ apt-get update
$ apt-get install build-essential git-core libgmp3c2 pigz zlib1g-dev
$ apt-get install --reinstall ca-certificates
```

**Note:**  Reinstalling _ca-certificates_ is required to fix _git_ cloning over HTTPS.


### Installing Halcyon

Halcyon is installed with _git_, and automatically updates itself before executing any command.

<pre class="with-tweaks"><code><span class="prompt">$</span> <span class="input">git clone <a href="https://github.com/mietek/halcyon/">https://github.com/mietek/halcyon</a></span>
</code></pre>

The source repository used for self-updates is defined by [`HALCYON_URL`](/reference/#halcyon_url).  To disable self-updates, set [`HALCYON_NO_SELF_UPDATE`](/reference/#halcyon_no_self_update) to `1`.


#### Environment variables

The [`halcyon paths`](/reference/#halcyon-paths) command helps set the needed environment variables.

```
$ source <( halcyon/halcyon paths )
```

Setting environment variables is best done as part of a `.profile` script.


#### Base directory and prefix

Halcyon requires write access to the `/app` directory, which is where layers are built or restored, and which is where applications are installed.  These are two separate concepts, defined by [`HALCYON_BASE`](/reference/#halcyon_base) and [`HALCYON_PREFIX`](/reference/#halcyon_prefix), respectively.

1.  While changing [`HALCYON_BASE`](/reference/#halcyon_base) is possible, a GHC installation is not easily relocatable, and neither are Cabal sandboxes.  Therefore, using a different path than `/app` for the application directory will cause Halcyon to rebuild all dependencies from scratch.

2.  [`HALCYON_PREFIX`](/reference/#halcyon_prefix) can be easily changed.  Using a different path than `/app` for the prefix will cause Halcyon to reconfigure any previously built applications, during a subsequent build.


Concepts { .rule-before-h3 }
--------

_TODO_


### Dependencies

_TODO_


#### Build-time dependencies

Haskell applications are expected to declare regular build-time dependencies in a Cabal package description, and as explicit version number constraints in a `cabal.config` file.

Halcyon supports overriding any included or omitted `cabal.config` files with [`HALCYON_CONSTRAINTS`](/reference#halcyon_constraints).

Additional build-time dependencies can be declared by specifying a number of options:

- [`HALCYON_SANDBOX_SOURCES`](/reference#halcyon_sandbox_sources)
- [`HALCYON_SANDBOX_EXTRA_APPS`](/reference#halcyon_sandbox_extra_apps)
- [`HALCYON_SANDBOX_EXTRA_LIBS`](/reference#halcyon_sandbox_extra_libs)


#### Run-time dependencies

Halcyon also supports declaring additional run-time dependencies:

- [`HALCYON_EXTRA_APPS`](/reference#halcyon_extra_apps)
- [`HALCYON_EXTRA_DATA_FILES`](/reference/#halcyon_extra_data_files)
- [`HALCYON_INCLUDE_LAYERS`](/reference/#halcyon_include_layers)


#### Magic files

_TODO_


### Layers

The GHC and Cabal layers form a full Haskell development environment.

_TODO_


#### GHC layer

> ---------------------|---
> Supported versions:  | [7.8.3](https://haskell.org/ghc/download_ghc_7_8_3), [7.8.2](https://haskell.org/ghc/download_ghc_7_8_2), [7.6.3](https://haskell.org/ghc/download_ghc_7_6_3), [7.6.1](https://haskell.org/ghc/download_ghc_7_6_1), [7.4.2](https://haskell.org/ghc/download_ghc_7_4_2), [7.2.2](https://haskell.org/ghc/download_ghc_7_2_2), [7.0.4](https://haskell.org/ghc/download_ghc_7_0_4)
> Directory path:      | [`HALCYON_BASE`](/reference/#halcyon_base)`/ghc`
> Archive name:        | `halcyon-ghc-`_`ghc_version`_`-`_`ghc_magic_hash`_`.tar.gz`

_TODO_


#### Cabal layer

> ---------------------|---
> Supported versions:  | [1.20.0.0](https://www.haskell.org/cabal/release/cabal-install-1.20.0.0/) or newer
> Directory path:      | [`HALCYON_BASE`](/reference/#halcyon_base)`/cabal`
> Archive name:        | `halcyon-cabal-`_`cabal_version`_`-`_`cabal_magic_hash`_`-`_`cabal_repo_name`_`-`_`cabal_date`_`.tar.gz`

_TODO_


#### Sandbox layer

> ---------------------|---
> Directory path:      | [`HALCYON_BASE`](/reference/#halcyon_base)`/sandbox`
> Archive name:        | `halcyon-sandbox-`_`constraints_hash`_`-`_`sandbox_magic_hash`_`-`_`label`_`.tar.gz`

_TODO_


#### Magic hashes

_TODO_


### Application

_TODO_


#### Source directory

> ---------------------|---
> Directory path:      | _temporary_
> Archive name:        | _none_

Before deploying an application, Halcyon makes a temporary copy of the original source directory, leaving the original directory untouched.

The contents of the source directory are hashed to determine whether the application can be deployed by restoring an available [install directory](#install-directory) archive.

Any [magic files](#magic-files) corresponding to the specified options are created in the source directory before hashing.


#### Build directory

> ---------------------|---
> Directory path:      | _temporary_
> Archive name:        | `halcyon-build-`_`label`_`.tar.gz`

_TODO_


#### Install directory

> ---------------------|---
> Directory path:      | _temporary_
> Archive name:        | `halcyon-install-`_`source_hash`_`-`_`label`_`.tar.gz`

_TODO_


### Cache

All files are cached locally on the build machine.  The cache directory is defined by [`HALCYON_CACHE`](/reference/#halcyon_cache), which defaults to `/var/tmp/halcyon-cache`.

In order to delete the entire contents of the cache before deploying an application, set [`HALCYON_PURGE_CACHE`](/reference/#halcyon_purge_cache) to `1`.


### Storage

Halcyon supports building and deploying applications on separate machines, without requiring the machines involved to communicate directly, or to be equipped with permanent local storage.  This is needed to support [Haskell on Heroku](https://haskellonheroku.com/).


#### Public storage

By default, Halcyon is configured to download any needed files from a public read-only location, defined by [`HALCYON_PUBLIC_STORAGE`](/reference/#halcyon_public_storage), and controlled by the [author](/#about).  To prevent using public storage, set [`HALCYON_NO_PUBLIC_STORAGE`](/reference/#halcyon_no_public_storage) to `1`.

The files available in public storage include all layer, build directories, and install directories needed for all [example applications](/examples/), and can be listed by visiting the [default location](https://s3.halcyon.sh/).


#### Private storage

_TODO_


Setting up multiple machines
----------------------------

To set up separate build and deploy machines:

1.  [Set up as many machines as needed](#setting-up-a-machine), including at least one dedicated build machine.

2.  [Set up private storage](#setting-up-private-storage) on each machine, by configuring all machines to use the same [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html) bucket.


### Setting up private storage

A private [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html) bucket is required to share build products between machines.


#### AWS credentials

Halcyon signs all S3 requests with [`HALCYON_AWS_ACCESS_KEY_ID`](/reference/#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](/reference/#halcyon_aws_secret_access_key).

```
$ export HALCYON_AWS_ACCESS_KEY_ID=...
$ export HALCYON_AWS_SECRET_ACCESS_KEY=...
```

Using dedicated [IAM credentials](http://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html) is recommended.


#### S3 bucket

Halcyon stores all build products in the S3 bucket defined by [`HALCYON_S3_BUCKET`](/reference/#halcyon_s3_bucket).

```
$ export HALCYON_S3_BUCKET=...
```

**Note:**  The default S3 endpoint, `s3.amazonaws.com`, can only be used for buckets located in the US Standard region.  To use a bucket located in a different region, set [`HALCYON_S3_ENDPOINT`](/reference/#halcyon_s3_endpoint) to the appropriate address, such as `s3-eu-west-1.amazonaws.com`.

By default, all uploaded files are assigned the `private` S3 access control list.  To make any subsequent uploads available publicly, set [`HALCYON_S3_ACL`](/reference/#halcyon_s3_acl) to `public-read`.
