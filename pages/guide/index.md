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


Basic usage
-----------

The [`halcyon install`](/reference/#halcyon-install) command accepts directory paths, Cabal package labels, and _git_ URLs.

With an archive of the application install directory available, installing can take less than 10 seconds.

<div class="toggle">
<a class="toggle-button" data-target="log1" href="" title="Toggle">Toggle</a>
``` { #log1 }
$ halcyon install https://github.com/mietek/howistart
-----> Cloning https://github.com/mietek/howistart... done, cc48e01
-----> Installing app
       Prefix:                                   <b>/app</b>
       Label:                                    <b>howistart-0.1</b>
       Source hash:                              <b>bcfc50f</b>
       External storage:                         <b>public</b>

-----> Restoring install directory
       Downloading https://halcyon.global.ssl.fastly.net/linux-ubuntu-14.04-x86_64/halcyon-install-bcfc50f-howistart-0.1.tar.gz... done
       Extracting halcyon-install-bcfc50f-howistart-0.1.tar.gz... done, 30MB
-----> Install directory restored
-----> Installing app into /app... done

-----> App installed:                            <b>howistart-0.1</b>
```
</div>

If an install directory archive is not available, Halcyon will build the application and any required dependencies on the fly.


#### Cabal package labels

A Cabal package label consists of a package name and version, in _`name`_`-`_`version`_ format.


#### _git_ URLs

Halcyon uses the `master` branch for all _git_ URLs.  Other branches may be specified with a `#`_`branch`_ suffix.


### Options

All application-specific Halcyon options may be specified by providing a _command-line option,_ by setting an _environment variable,_ or by including a _magic file._

If `foo` is an application directory, the following invocations are equivalent:

```
$ halcyon install foo --sandbox-extra-apps='alex-3.1.3 happy-1.19.4'
```

```
$ export HALCYON_SANDBOX_EXTRA_APPS='alex-3.1.3 happy-1.19.4'
$ halcyon install foo
```

```
$ echo 'alex-3.1.3 happy-1.19.4' >foo/.halcyon/sandbox-extra-apps
$ halcyon install foo
```

Command-line options take precedence over environment variables, which in turn take precedence over magic files.


#### Magic files

Using magic files is the recommended method of specifying application-specific options, as it does not require the user to perform any additional actions.


### Base and prefix directories

By default, Halcyon requires write access to the `/app` directory.  This is done for two reasons:

1. `/app` is the default path to the base directory, defined by [`HALCYON_BASE`](/reference/#halcyon_base), which is where Halcyon builds or restores the following directories:

    - The _GHC directory_, with GHC and the global GHC package database
    - The _Cabal directory_, with _cabal-install_ and the Cabal package database
    - The _sandbox directory_, with a Cabal sandbox and any additional build-time dependencies

    GHC and Cabal sandboxes are not easily relocatable.  Changing the base directory will require Halcyon to rebuild all previously built archives from scratch, and is not recommended for a quick start.

2. `/app` is the default path to the prefix directory, defined by [`HALCYON_PREFIX`](/reference/#halcyon_prefix), which is where Halcyon installs applications.

    Changing the prefix directory can be easily done on a per-installation basis, as it will only cause an application-level change, and require an incremental build.


### Storage and caching

Halcyon supports building and installing applications on separate machines, without requiring the machines involved to communicate directly, or to be equipped with permanent storage.

All files are cached locally on the build machine.  The cache directory is defined by [`HALCYON_CACHE`](/reference/#halcyon_cache), which defaults to `/var/tmp/halcyon-cache`.

In order to delete the entire contents of the cache before installing an application, set [`HALCYON_PURGE_CACHE`](/reference/#halcyon_purge_cache) to `1`.


#### Public storage

By default, Halcyon downloads any needed files from a public read-only location, defined by [`HALCYON_PUBLIC_STORAGE_URL`](/reference/#halcyon_public_storage_url).  To prevent using public storage, set [`HALCYON_NO_PUBLIC_STORAGE`](/reference/#halcyon_no_public_storage) to `1`.


Setting up a machine
--------------------

To set up one machine for building and installing applications:

1.  [Provision a machine](#provisioning-a-machine) with one of the supported operating systems.

2.  [Install Halcyon](#installing-halcyon) by running the Halcyon setup script.


### Provisioning a machine

Halcyon is designed to install applications by building all required dependencies on the fly.

The build machine must be capable of compiling and linking Haskell programs.  At least 4 GB of memory is recommended, as many common Cabal packages will fail to build on a machine with less than 2 GB of memory installed.


#### Supported platforms

Currently, Halcyon fully supports the `x86_64` architecture, and the following Linux distributions:

- CentOS 6 and 7
- Debian 6 and 7
- Fedora 19 and 20
- Ubuntu 10.04, 12.04, and 14.04


### Installing Halcyon

Halcyon can be installed in one command on most recent Linux distributions.

```
$ source <( curl -sL https://github.com/mietek/halcyon/raw/master/setup.sh )
```

The Halcyon setup script ensures the necessary OS packages are installed, clones the Halcyon _git_ repository, and sets up the needed environment variables.


#### Setup details

Halcyon is installed with _git_, and automatically updates itself before executing any command.  The source repository used for self-updates is defined by [`HALCYON_URL`](/reference/#halcyon_url).

```
$ git clone https://github.com/mietek/halcyon
```

To disable self-updates, set [`HALCYON_NO_SELF_UPDATE`](/reference/#halcyon_no_self_update) to `1`.

The [`halcyon paths`](/reference/#halcyon-paths) command helps set the needed environment variables, which include `PATH`, `LIBRARY_PATH`, and `LD_LIBRARY_PATH`.

```
$ source <( halcyon/halcyon paths )
```

Setting environment variables is best done as part of a `.profile` script.


Declaring dependencies
----------------------

Halcyon allows all build-time and run-time dependencies to be explicitly declared, aiming to achieve 100% reproducible build results.


#### Cabal files

Haskell applications packaged with Cabal are expected to declare build-time dependencies on other Cabal packages in a _`name`_`.cabal` file, which contains the _package description._

The `build-depends` field of the package description is used to list package names and optional version number ranges.

```
build-depends: base >=4 && <5
```

Recent version of _cabal-install_ include the `cabal freeze` command, which can be used to determine the exact version numbers of all dependencies, transitively.  When executed in an application directory, `cabal freeze` creates a `cabal.config` file, which contains a snapshot of the _version constraints._

```
constraints: base ==4.7.0.1,
             ghc-prim ==0.3.1.0,
             integer-gmp ==0.5.1.0,
             rts ==1.0
```

However, most published applications do not include a `cabal.config` file.  Additionally, the format of a `cabal.config` file is complex, as it is intended to support setting any Cabal option.

Halcyon builds on the capabilities provided by Cabal, introducing additional ways to declare more types of dependencies and have them installed automatically.


### Version constraints

Halcyon allows version constraints to be declared by including a [`constraints`](/reference/#halcyon_constraints) magic file, which contains a simple list of Cabal package labels.

Each label consists of a Cabal package name and version number, in _`name`_`-`_`version`_ format.

```
base-4.7.0.1
ghc-prim-0.3.1.0
integer-gmp-0.5.1.0
rts-1.0
```

It is also possible to declare version constraints without modifying the application, by using the command-line option or environment variable corresponding to the [`constraints`](/reference/#halcyon_constraints) magic file.  This is intended to support installing already published applications while retaining complete control over their dependencies.


### Build-time dependencies

The Cabal package description format includes the `build-tools` and `extra-libraries` fields, for the purpose of declaring applications and OS-specific libraries to be used at build-time.  However, _cabal-install_ does not automatically install the declared dependencies.  Requiring the user to manually install packages such as _alex_ or _happy_ has long been a source of frustration.


#### Sandbox extra apps

Halcyon allows additional applications to be declared for installation in the sandbox directory, by including a [`sandbox-extra-apps`](/reference/#halcyon_sandbox_extra_apps) magic file.

```
alex-3.1.3
happy-1.19.4
```

Each entry may be a Cabal package label, a directory path, or a _git_ URL.

[`sandbox-extra-apps-constraints`](/reference/#halcyon_sandbox_extra_apps_constraints) declares version constraints for all additional applications.


#### Sandbox extra OS packages

The [`sandbox-extra-os-packages`](/reference/#halcyon_sandbox_extra_os_packages) magic file is used to declare additional OS-specific packages for installation in the sandbox directory.

```
linux-ubuntu-14:libicu52
linux-(centos|fedora):libicu-devel
linux-(debian|ubuntu):libicu-dev
```

To support cross-platform installation, each entry may include a GNU _bash_ regular expression, specified as a _`pattern`_`:` prefix.  If the pattern matches the host platform identifier, the package will be installed.

Packages with no patterns are always installed.


#### Sandbox sources

Additional Cabal packages may be made available for installation in the sandbox directory by including a [`sandbox-sources`](/reference/#halcyon_sandbox_sources) magic file.

```
https://github.com/mietek/text-icu#fpic
```

Each entry may be a directory path or a _git_ URL.


### Run-time dependencies

The Cabal package description format includes the `data-files` field, for the purpose of declaring files to be used at run-time by the application.  However, limitations on the contents of this field make it difficult to use.


#### Extra data files

Halcyon allows additional run-time data files to be declared, by including an [`extra-data-files`](/reference/#halcyon_extra_data_files) magic file.

```
app.cfg
snaplets
static
```

Each entry may be a file or directory path, using GNU _bash_ globbing syntax.


#### Extra apps

Similarly to [`sandbox-extra-apps`](#sandbox-extra-apps), the [`extra-apps`](/reference/#halcyon_extra_apps) magic file is used to declare additional programs to be installed together with the application.

[`extra-apps-constraints`](/reference/#halcyon_extra_apps_constraints) declares version constraints for all additional applications.


#### Extra OS packages

Using [`sandbox-extra-os-packages`](#sandbox-extra-os-packages) may require a dynamic library to be present at run-time.  Often, dynamic libraries are provided in separate OS-specific packages.  These may be declared in an [`extra-os-packages`](/reference/#halcyon_extra_os_packages) magic file.

```
linux-debian-6:libicu44
linux-ubuntu-10:libicu42
linux-ubuntu-14:libicu52
linux-(centos|fedora):libicu
linux-(debian-7|ubuntu-12):libicu48
```


Setting up multiple machines
----------------------------

To set up separate build and install machines:

1.  [Set up as many machines as needed](#setting-up-a-machine), including at least one dedicated build machine.

2.  [Set up private storage](#setting-up-private-storage) on each machine, by configuring all machines to use the same Amazon S3 bucket.


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

The default S3 endpoint can only be used for buckets located in the US Standard region.  To use a bucket located in a different region, set [`HALCYON_S3_ENDPOINT`](/reference/#halcyon_s3_endpoint) to the address of the appropriate [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

By default, all uploaded files are assigned the `private` [S3 <abbr title="Access control list">ACL</abbr>](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html).  To make future uploads publicly available, set [`HALCYON_S3_ACL`](/reference/#halcyon_s3_acl) to `public-read`.


Advanced usage
--------------

_**Work in progress.**  For updates, please follow <a href="https://twitter.com/mietek">@mietek</a>._

- _Archive names.  Tags._

- _[Rebuilding applications](/reference/#halcyon_app_rebuild), [reconfiguring applications](/reference/#halcyon_app_reconfigure), [reinstalling applications](/reference/#halcyon_app_reinstall).  Source hash, constraints hash, magic hash.  Source directory, build directory, install directory.  [Pre-build hook](/reference/#halcyon_pre_build_hook), [post-build hook](/reference/#halcyon_post_build_hook), [pre-install hook](/reference/#halcyon_pre_install_hook), [post-install hook](/reference/#halcyon_post_install_hook)._

- _Swapping multiple GHC versions.  [Rebuilding GHC directories](/reference/#halcyon_ghc_rebuild).  [GHC pre-build hook](/reference/#halcyon_ghc_pre_build_hook), [GHC post-build hook](/reference/#halcyon_ghc_post_build_hook), GHC magic hash._

- _Using custom Cabal repositories.  [Updating Cabal directories](/reference/#halcyon_cabal_update).  [Rebuilding Cabal directories](/reference/#halcyon_cabal_rebuild).  [Cabal pre-build hook](/reference/#halcyon_cabal_pre_build_hook), [Cabal post-build hook](/reference/#halcyon_cabal_post_build_hook), [Cabal pre-update hook](/reference/#halcyon_cabal_pre_update_hook), [Cabal post-update hook](/reference/#halcyon_cabal_post_update_hook), Cabal magic hash._

- _Preparing partially-matching sandboxes.  [Rebuilding sandbox directories](/reference/#halcyon_sandbox_rebuild).  [Sandbox pre-build hook](/reference/#halcyon_sandbox_pre_build_hook), [sandbox post-build hook](/reference/#halcyon_sandbox_post_build_hook), sandbox magic hash._
