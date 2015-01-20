---
title: Reference
page-class: add-section-toc rule-before-h3 tweak-listings
page-data:
- key: max-back-link-level
  value: 3
page-head: |
  <style>
    header a.link-reference {
      color: #3f96f0;
    }
  </style>
---


Reference
=========


Introduction
------------

Halcyon is a system for installing [Haskell](https://haskell.org/) apps and development tools, including [GHC](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/) and [Cabal](https://www.haskell.org/cabal/users-guide/).

This reference lists Halcyon commands and options.


Commands
--------

### `halcyon install`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds and installs the specified app, restoring or building all dependencies on-the-fly.

The app can be specified as:

- label
- directory path
- _git_ URL

Labels consist of a Cabal package name and version number, in _`name`_`-`_`version`_ format.  The version number is optional.

_git_ URLs default to the `master` branch.  Other branches can be specified with a `#`_`branch`_ suffix.


### `halcyon build`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds the specified app, restoring or building all dependencies on-the-fly.


### `halcyon label`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the label of the specified app.


### `halcyon executable`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the executable name declared in the Cabal package description of the specified app.


### `halcyon constraints`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the version constraints of the specified app.

Intended to quickly determine the newest versions of all Cabal packages required to build the app.

**Note:**  Recommended over `cabal freeze` because of Cabal issue [#1908](https://github.com/haskell/cabal/issues/1908).


### `halcyon paths`

> ---------------------|---
> Arguments:           | _none_

Outputs a shell script which sets up the needed environment variables.

1. [`HALCYON_BASE`](#halcyon_base) is set to `/app`, unless already set.

2. `PATH`, `CPATH`, `LIBRARY_PATH`, `LD_LIBRARY_PATH`, `PKG_CONFIG_PATH`, and `PKG_CONFIG_SYSROOT` are set to point into [`HALCYON_BASE`](#halcyon_base).

3. `LANG` is set to `C.UTF-8`, unless already set.

**Note:**  Using a UTF-8 locale works around Cabal issue [#1883](https://github.com/haskell/cabal/issues/1883).


General options
---------------

### `HALCYON_BASE`

> ---------------------|---
> Default value:       | `/app`
> Type:                | directory
> Command-line option: | `--base=...`

Directory in which Halcyon builds or restores the GHC, Cabal, and sandbox directories.

Default value of [`HALCYON_PREFIX`](#halcyon_prefix).


### `HALCYON_PREFIX`

> ---------------------|---
> Default value:       | [`HALCYON_BASE`](#halcyon_base)
> Type:                | directory
> Command-line option: | `--prefix=...`

Directory in which Halcyon installs apps.

<div class="pre-like">

_If the install directory consists of `bin/hello`, and [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, then the app will be installed as `/app/bin/hello`._

</div>


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Type:                | directory
> Command-line option: | `--root=...`

Root of the path to the directory in which Halcyon installs apps.

Intended to support advanced installation workflows.

<div class="pre-like">

_If the install directory consists of `bin/hello`, [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, and [`HALCYON_ROOT`](#halcyon_root) is set to `/tmp/hello`, then the app will be configured to be installed as `/app/bin/hello`, and will actually be installed as `/tmp/hello/app/bin/hello`._

</div>


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-app`

Forces Halcyon to install GHC and Cabal only, even when the current directory contains an app.

The versions of GHC and _cabal-install_ to install are defined by [`HALCYON_GHC_VERSION`](#halcyon_ghc_version) and [`HALCYON_CABAL_VERSION`](#halcyon_cabal_version).


### `HALCYON_NO_MODIFY_HOME`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-modify-home`

Prevents Halcyon from making changes to the home directory.

When allowed, Halcyon makes the following changes:

1.  When running the setup script for the first time, Halcyon extends `~/.bash_profile` to run [`halcyon paths`](#halcyon-paths).

2.  When installing an app, Halcyon creates a symlink pointing `~/.cabal/config` to the `config` file located in the Cabal directory.


### `HALCYON_LOG_TIMESTAMP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--log-timestamp`

Prefixes each logged message with the number of seconds since beginning execution.


Build-time options
------------------

### `HALCYON_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings, file, or directory, optional
> Command-line option: | `--constraints=...`
> Magic file:          | `.halcyon/constraints`

Labels specifying version constraints, to override any constraints declared in a `cabal.config` file, which can be included in the source directory.

Each label must include a Cabal package name and version number, in _`name`_`-`_`version`_ format.  The labels must be separated by whitespace.

```
base-4.7.0.1
ghc-prim-0.3.1.0
integer-gmp-0.5.1.0
rts-1.0
```

Any specified directory must contain a file named _`name-version`_`.constraints`, matching the app label.

Intended to support explicitly declaring the dependencies of any app which doesn’t already do so.


### `HALCYON_IGNORE_ALL_CONSTRAINTS`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--ignore-all-constraints`

Forces Halcyon to ignore any constraints declared in a `cabal.config` file or `.halcyon/constraints` magic file, and use the newest versions of all required Cabal packages.

Intended to support upgrading dependencies.

**Note:**  Ignoring only certain constraints isn’t supported.  See Cabal issue [#2265](https://github.com/haskell/cabal/issues/2265) for details.


### `HALCYON_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--extra-configure-flags=...`
> Magic file:          | `.halcyon/extra-configure-flags`

Additional flags to specify when running `cabal configure`.

The flags must be separated by whitespace.

**Note:**  Any `--prefix=...` flag will be ignored.


### `HALCYON_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--pre-build-hook=...`
> Magic file:          | `.halcyon/pre-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the app, before running `cabal build`.


### `HALCYON_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--post-build-hook=...`
> Magic file:          | `.halcyon/post-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the app, after running `cabal build`.


### `HALCYON_APP_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-rebuild`

Forces Halcyon to build the app from scratch, which implies reinstalling all [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps) and [`HALCYON_EXTRA_OS_PACKAGES`](#halcyon_extra_os_packages).


### `HALCYON_APP_RECONFIGURE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reconfigure`

Forces Halcyon to run `cabal configure` again.


### `HALCYON_NO_BUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build`

Prevents building the app and any dependencies.

Intended to use on resource-constrainted machines incapable of performing builds.


### `HALCYON_NO_BUILD_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build-dependencies`

Prevents building any dependencies.

Intended to use on resource-constrainted machines, which are capable of building the app, but not the dependencies.


### `HALCYON_DEPENDENCIES_ONLY`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--dependencies-only`

Prevents building and installing the app.


Install-time options
--------------------

### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--extra-apps=...`
> Magic file:          | `.halcyon/extra-apps`

Additional Haskell apps to include in the install directory, as run-time dependencies.

The apps must be separated by whitespace, and can be specified as:

- labels
- directory paths
- _git_ URLs


### `HALCYON_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings, file, or directory, optional
> Command-line option: | `--extra-apps-constraints=...`
> Magic file:          | `.halcyon/extra-apps-constraints`

Labels specifying version constraints, to override any constraints declared in `cabal.config` files, which can be included in the source directories of apps specified with [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps).

Each label must include a Cabal package name and version number, in _`name`_`-`_`version`_ format.  The labels must be separated by whitespace.

Any specified directory must contain a file named _`name-version`_`.constraints`, each matching the label of one app.

Intended to support explicitly declaring the dependencies of any app which doesn’t already do so.


### `HALCYON_EXTRA_DATA_FILES`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--extra-data-files=...`
> Magic file:          | `.halcyon/extra-data-files`

Additional files to include in the install directory, as run-time dependencies.

The files must be separated by whitespace, and can be specified as file or directory globs, relative to the build directory.  GNU _bash_ [filename expansion](http://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html) is performed on each glob.

```
app.cfg
snaplets
static
```

At run-time, the files will be available in the Cabal [data files directory](https://www.haskell.org/cabal/users-guide/developing-packages.html#accessing-data-files-from-package-code).

Intended to support apps which don’t declare all run-time data files as `data-files` in the Cabal package description.

**Note:**  Works around Cabal issue [#713](https://github.com/haskell/cabal/issues/713) and [#784](https://github.com/haskell/cabal/issues/784).


### `HALCYON_EXTRA_OS_PACKAGES`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--extra-os-packages=...`
> Magic file:          | `.halcyon/extra-os-packages`

Additional OS packages to include in the install directory, as run-time dependencies.

The packages must be separated by whitespace, and can include a GNU _bash_ regular expression, specified as a _`pattern`_`:` prefix.

Halcyon installs packages with no patterns, or with patterns matching the host platform identifier, which is obtained with [`detect_platform`](https://bashmenot.mietek.io/reference/#detect_platform).

```
linux-debian-6:libicu44
linux-ubuntu-10:libicu42
linux-ubuntu-14:libicu52
linux-(centos|fedora):libicu
linux-(debian-7|ubuntu-12):libicu48
```


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--pre-install-hook=...`
> Magic file:          | `.halcyon/pre-install-hook`
> Script arguments:    | _`tag source_dir install_dir data_dir`_

Script to execute when installing the app, before archiving the install directory.


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--post-install-hook=...`
> Magic file:          | `.halcyon/post-install-hook`
> Script arguments:    | _`tag source_dir install_dir data_dir`_

Script to execute when installing the app, after copying the contents of the install directory to [`HALCYON_ROOT`](#halcyon_root).


### `HALCYON_APP_REINSTALL`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reinstall`

Forces Halcyon to prepare the install directory again.


### `HALCYON_KEEP_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--keep-dependencies`

Forces Halcyon to keep all dependencies, restoring them even when an install directory archive is available.


Cache options
-------------

### `HALCYON_CACHE`

> ---------------------|---
> Default value:       | `/var/tmp/halcyon-cache`
> Type:                | directory
> Command-line option: | `--cache=...`

Directory in which Halcyon caches recently used archives and constraints files.


### `HALCYON_PURGE_CACHE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--purge-cache`

Forces Halcyon to delete the entire contents of [`HALCYON_CACHE`](#halcyon_cache), before any other operation.


### `HALCYON_NO_ARCHIVE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-archive`

Prevents creating any archives in [`HALCYON_CACHE`](#halcyon_cache).


### `HALCYON_NO_CLEAN_CACHE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-clean-cache`

Prevents deleting any out-of-date archives from [`HALCYON_CACHE`](#halcyon_cache).


Public storage options
----------------------

### `HALCYON_PUBLIC_STORAGE_URL`

> ---------------------|---
> Default value:       | [`https://halcyon.global.ssl.fastly.net`](https://halcyon.global.ssl.fastly.net)
> Type:                | S3 URL
> Command-line option: | `--public-storage-url=...`

URL of the Amazon S3 bucket from which Halcyon restores public archives and constraints files.


### `HALCYON_NO_PUBLIC_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-public-storage`

Prevents restoring archives and constraints files from public storage.


Private storage options
-----------------------

### `HALCYON_AWS_ACCESS_KEY_ID`

> ---------------------|---
> Default value:       | _none_
> Type:                | string, optional
> Command-line option: | `--aws-access-key-id=...`

Amazon Web Services username, used to authenticate S3 requests.


### `HALCYON_AWS_SECRET_ACCESS_KEY`

> ---------------------|---
> Default value:       | _none_
> Type:                | string, optional
> Command-line option: | `--aws-secret-access-key=...`

Amazon Web Services password, used to authenticate S3 requests.


### `HALCYON_S3_BUCKET`

> ---------------------|---
> Default value:       | _none_
> Type:                | S3 name, optional
> Command-line option: | `--s3-bucket=...`

Name of the Amazon S3 bucket in which Halcyon stores archives and constraints files.

**Note:**  Specifying buckets located in S3 regions other than US Standard requires also specifying the appropriate [`HALCYON_S3_ENDPOINT`](#halcyon_s3_endpoint).


### `HALCYON_S3_ENDPOINT`

> ---------------------|---
> Default value:       | `s3.amazonaws.com`
> Type:                | S3 address, optional
> Command-line option: | `--s3-endpoint=...`

Address of the [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) in which [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket) is located.


### `HALCYON_S3_ACL`

> ---------------------|---
> Default value:       | `private`
> Type:                | S3 ACL
> Command-line option: | `--s3-acl=...`

Name of the Amazon [S3 <abbr title="Access control list">ACL</abbr>](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html) which is assigned to all files uploaded to [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).

Commonly used values are `private` and `public-read`.


### `HALCYON_NO_PRIVATE_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-private-storage`

Prevents accessing [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).


### `HALCYON_NO_UPLOAD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-upload`

Prevents uploading cached archives and constraints files to [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).


### `HALCYON_NO_CLEAN_PRIVATE_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-clean-private-storage`

Prevents deleting out-of-date archives and constraints files from [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).


GHC options
-----------

### `HALCYON_GHC_VERSION`

> ---------------------|---
> Default value:       | `7.8.3`
> Type:                | version
> Command-line option: | `--ghc-version=...`

Default version of GHC to install or restore in the GHC directory.

Used when installing an app with no constraints specified, or when installing GHC and Cabal only.

Supported versions include:

- [GHC 7.8.4](https://haskell.org/ghc/download_ghc_7_8_4)
- [GHC 7.8.3](https://haskell.org/ghc/download_ghc_7_8_3)
- [GHC 7.8.2](https://haskell.org/ghc/download_ghc_7_8_2)
- [GHC 7.6.3](https://haskell.org/ghc/download_ghc_7_6_3)
- [GHC 7.6.1](https://haskell.org/ghc/download_ghc_7_6_1)
- [GHC 7.4.2](https://haskell.org/ghc/download_ghc_7_4_2)
- [GHC 7.2.2](https://haskell.org/ghc/download_ghc_7_2_2)
- [GHC 7.0.4](https://haskell.org/ghc/download_ghc_7_0_4)


### `HALCYON_GHC_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--ghc-pre-build-hook=...`
> Magic file:          | `.halcyon/ghc-pre-build-hook`
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the GHC directory, before installing GHC.


### `HALCYON_GHC_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--ghc-post-build-hook=...`
> Magic file:          | `.halcyon/ghc-post-build-hook`
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the GHC directory, after installing GHC.


### `HALCYON_GHC_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--ghc-rebuild`

Forces Halcyon to rebuild the GHC directory from scratch, which implies installing GHC again.


Cabal options
-------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | `1.20.0.3`
> Type:                | version
> Command-line option: | `--cabal-version=...`

Version of _cabal-install_ to bootstrap or restore in the Cabal directory.

Supported versions include:

- [_cabal-install_ 1.22.0.0](https://www.haskell.org/cabal/release/cabal-install-1.22.0.0/)
- [_cabal-install_ 1.20.0.6](https://www.haskell.org/cabal/release/cabal-install-1.20.0.6/)
- [_cabal-install_ 1.20.0.5](https://www.haskell.org/cabal/release/cabal-install-1.20.0.5/)
- [_cabal-install_ 1.20.0.3](https://www.haskell.org/cabal/release/cabal-install-1.20.0.3/)
- [_cabal-install_ 1.20.0.2](https://www.haskell.org/cabal/release/cabal-install-1.20.0.2/)
- [_cabal-install_ 1.20.0.1](https://www.haskell.org/cabal/release/cabal-install-1.20.0.1/)
- [_cabal-install_ 1.20.0.0](https://www.haskell.org/cabal/release/cabal-install-1.20.0.0/)


### `HALCYON_CABAL_REPO`

> ---------------------|---
> Default value:       | `Hackage:http://hackage.haskell.org/packages/archive`
> Type:                | string
> Command-line option: | `--cabal-repo=...`

Name and URL of the Cabal repository referenced by the Cabal package database in the Cabal directory.

The value must match the format of a `remote-repo` entry in a `cabal.config` file.

**Note:**  HTTPS URLs aren’t supported.  See Cabal issue [#936](https://github.com/haskell/cabal/issues/936) for details.


### `HALCYON_CABAL_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-pre-build-hook=...`
> Magic file:          | `.halcyon/cabal-pre-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal directory, before bootstrapping _cabal-install_.


### `HALCYON_CABAL_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-post-build-hook=...`
> Magic file:          | `.halcyon/cabal-post-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal directory, after bootstrapping _cabal-install_.


### `HALCYON_CABAL_PRE_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-pre-update-hook=...`
> Magic file:          | `.halcyon/cabal-pre-update-hook`
> Script arguments:    | _none_

Script to execute when updating the Cabal directory, before running `cabal update`.


### `HALCYON_CABAL_POST_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-post-update-hook=...`
> Magic file:          | `.halcyon/cabal-post-update-hook`
> Script arguments:    | _none_

Script to execute when updating the Cabal directory, after running `cabal update`.


### `HALCYON_CABAL_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-rebuild`

Forces Halcyon to rebuild the Cabal directory from scratch, which implies bootstrapping _cabal-install_ again.


### `HALCYON_CABAL_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-update`

Forces Halcyon to update the Cabal directory, which means running `cabal update` again.


Sandbox options
---------------

### `HALCYON_SANDBOX_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--sandbox-extra-configure-flags=...`
> Magic file:          | `.halcyon/sandbox-extra-configure-flags`

Additional flags to specify when running `cabal install --dependencies-only`.

The flags must be separated by whitespace.

**Note:**  Any `--prefix=...` flag will be ignored.


### `HALCYON_SANDBOX_SOURCES`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--sandbox-sources=...`
> Magic file:          | `.halcyon/sandbox-sources`

Additional Cabal packages to include in the sandbox directory, as build-time dependencies.

The packages are made available for installation by running `cabal sandbox add-source`, must be separated by whitespace, and can be specified as:

- directory paths
- _git_ URLs

```
https://github.com/mietek/text-icu#fpic
```

**Note:**  Implements Cabal feature requests [#1534](https://github.com/haskell/cabal/issues/1534) and [#2189](https://github.com/haskell/cabal/issues/2189).


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--sandbox-extra-apps=...`
> Magic file:          | `.halcyon/sandbox-extra-apps`

Additional Haskell apps to include in the sandbox directory, as build-time dependencies.

The apps must be separated by whitespace, and can be specified as:

- labels
- directory paths
- _git_ URLs

```
alex-3.1.3
happy-1.19.4
```

Intended to support installing Cabal `build-tools`, such as _alex_ or _happy_.

**Note:**  Works around Cabal issues [#220](https://github.com/haskell/cabal/issues/220) and [#779](https://github.com/haskell/cabal/issues/779).


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings, file, or directory, optional
> Command-line option: | `--sandbox-extra-apps-constraints=...`
> Magic file:          | `.halcyon/sandbox-extra-apps-constraints`

Labels specifying version constraints, to override any constraints specified in `cabal.config` files, which can be included in the source directories of apps specified with [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps).

Each label must include a Cabal package name and version number, in _`name`_`-`_`version`_ format.  The labels must be separated by whitespace.

Any specified directory must contain a file named _`name-version`_`.constraints`, matching the app label.

Intended to support explicitly declaring the dependencies of any app which doesn’t already do so.


### `HALCYON_SANDBOX_EXTRA_OS_PACKAGES`

> ---------------------|---
> Default value:       | _none_
> Type:                | strings or file, optional
> Command-line option: | `--sandbox-extra-os-packages=...`
> Magic file:          | `.halcyon/sandbox-extra-os-packages`

Additional OS packages to install in the sandbox directory, as build-time dependencies.

The packages must be separated by whitespace, and can include a GNU _bash_ regular expression, specified as a _`pattern`_`:` prefix.

Halcyon installs packages with no patterns, or with patterns matching the host platform identifier, which is obtained with [`detect_platform`](https://bashmenot.mietek.io/reference/#detect_platform).

```
linux-ubuntu-14:libicu52
linux-(centos|fedora):libicu-devel
linux-(debian|ubuntu):libicu-dev
```


### `HALCYON_SANDBOX_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--sandbox-pre-build-hook=...`
> Magic file:          | `.halcyon/sandbox-pre-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox directory, before running `cabal install`.


### `HALCYON_SANDBOX_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--sandbox-post-build-hook=...`
> Magic file:          | `.halcyon/sandbox-post-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox directory, after running `cabal install`.


### `HALCYON_SANDBOX_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--sandbox-rebuild`

Forces Halcyon to rebuild the sandbox directory and the app from scratch, which implies reinstalling all [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps) and [`HALCYON_SANDBOX_EXTRA_OS_PACKAGES`](#halcyon_sandbox_extra_os_packages).


Self-update options
-------------------

### `HALCYON_DIR`

> ---------------------|---
> Default value:       | _variable_
> Type:                | _read-only string_
> Command-line option: | _none_

Directory in which Halcyon is installed.

Intended to support using Halcyon functions in hook scripts.

```
source "${HALCYON_DIR}/src.sh"
```

Automatically set by Halcyon at run-time.  Setting this has an effect only before installing Halcyon by running the setup script.


### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Type:                | _git_ URL
> Command-line option: | _none_

URL of the _git_ repository from which Halcyon updates itself.

Defaults to the `master` branch.  Other branches can be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_SELF_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | _none_

Prevents Halcyon from updating itself.
