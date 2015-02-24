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


Halcyon reference
=================

Halcyon is a system for installing [Haskell](https://haskell.org/) apps and development tools, including [GHC](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/) and [Cabal](https://haskell.org/cabal/users-guide/).

This reference is a complete list of available Halcyon commands and options.


Commands
--------

### `halcyon install`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds and installs the app, restoring or building all dependencies on-the-fly.

The app can be specified as:

- label
- directory path
- _git_ URL

Labels can be in _`name`_ or _`name`_`-`_`version`_ format, referencing a Cabal package name and version number.

_git_ URLs default to the `master` branch.  Other branches can be specified with a `#`_`branch`_ suffix.


### `halcyon build`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds the app, restoring or building all dependencies on-the-fly.

The app can be specified as for [`halcyon install`](#halcyon-install).


### `halcyon label`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the app name and version number in _`name`_`-`_`version`_ format, as declared in the Cabal package description.

The app can be specified as for [`halcyon install`](#halcyon-install).

Intended to quickly determine the newest version of the app.


### `halcyon executable`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the app executable name, as declared in the Cabal package description.

The app can be specified as for [`halcyon install`](#halcyon-install).


### `halcyon constraints`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the app version constraints.

The app can be specified as for [`halcyon install`](#halcyon-install).

Intended to be used with the [`HALCYON_IGNORE_ALL_CONSTRAINTS`](#halcyon_ignore_all_constraints) option, to quickly determine the newest versions of all required Cabal packages.

**Note:**  Recommended over `cabal freeze` because of Cabal issue [`#1908`](https://github.com/haskell/cabal/issues/1908).


### `halcyon paths`

> ---------------------|---
> Arguments:           | _none_

Outputs a shell script which sets up the needed environment variables:

1. [`HALCYON_BASE`](#halcyon_base) is set to `/app`, unless already set.

2. `PATH`, `CPATH`, `LIBRARY_PATH`, `LD_LIBRARY_PATH`, `PKG_CONFIG_PATH` are set to point into [`HALCYON_BASE`](#halcyon_base).

3. `LANG` is set to `C.UTF-8`, unless already set.

The script is intended to be sourced in a `.bash_profile`.

**Note:**  Using a UTF-8 locale works around Cabal issue [`#1883`](https://github.com/haskell/cabal/issues/1883).


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

<div class="pre-like"><p>
_If the install directory consists of `bin/hello`, and [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, then the app will be installed as `/app/bin/hello`._
</p></div>


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Type:                | directory
> Command-line option: | `--root=...`

Root directory for the directory in which Halcyon installs apps.

Intended to support constructing deployment systems.

<div class="pre-like"><p>
_If the install directory consists of `bin/hello`, [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, and [`HALCYON_ROOT`](#halcyon_root) is set to `/tmp/hello`, then the app will be configured to be installed as `/app/bin/hello`, and will actually be installed as `/tmp/hello/app/bin/hello`._
</p></div>


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-app`

When no app is specified, prevents Halcyon from looking for an app in the current directory, and instead forces Halcyon to install GHC and Cabal only.


### `HALCYON_NO_MODIFY_HOME`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-modify-home`

Prevents Halcyon from making changes to the home directory:

1.  When running the setup script for the first time, Halcyon extends `~/.bash_profile` to source the script output by [`halcyon paths`](#halcyon-paths).

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
> Type:                | string, file, or directory, optional
> Command-line option: | `--constraints=...`
> Magic file:          | `.halcyon/constraints`

Version constraints to be declared by the app, overriding any constraints declared in a `cabal.config` file.

Each constraint must be in _`name`_`-`_`version`_ format, referencing a Cabal package name and version number.  The constraints must be separated by whitespace.

When a directory is specified, it must contain a constraints file named _`name-version`_`.constraints`, referencing the app name and version number.

<div class="pre-like"><p>
_The source code of each [example app](/examples/) includes a constraints file._
</p></div>


### `HALCYON_EXTRA_SOURCE_HASH_IGNORE`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--extra-source-hash-ignore=...`
> Magic file:          | `.halcyon/extra-source-hash-ignore`

Additional files or directories to be ignored when calculating the source hash.

By default, Halcyon ignores:

- `.git`
- `.gitmodules`
- `.ghc`
- `.cabal`
- `.cabal-sandbox`
- `cabal.sandbox.config`

The files or directories must be separated by whitespace, and can be specified as names or `find -name` patterns.


### `HALCYON_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--extra-configure-flags=...`
> Magic file:          | `.halcyon/extra-configure-flags`

Additional flags for `cabal configure`.

The flags must be separated by whitespace.

**Note:**  Any `--prefix=...` flags will be ignored.

<div class="pre-like"><p>
_See the [Try Haste](/examples/#try-haste) source code for an example of using extra configure flags._
</p></div>


### `HALCYON_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--pre-build-hook=...`
> Magic file:          | `.halcyon/pre-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to be executed when building the app, before `cabal build`.


### `HALCYON_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--post-build-hook=...`
> Magic file:          | `.halcyon/post-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to be executed when building the app, after `cabal build`.


### `HALCYON_APP_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-rebuild`

Forces Halcyon to build the app from scratch, which includes reinstalling all [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps) and [`HALCYON_EXTRA_OS_PACKAGES`](#halcyon_extra_os_packages).


### `HALCYON_APP_RECONFIGURE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reconfigure`

Forces Halcyon to run `cabal configure` before building the app.


### `HALCYON_IGNORE_ALL_CONSTRAINTS`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--ignore-all-constraints`

Forces Halcyon to ignore any version constraints declared by the app, and use the newest versions of all required Cabal packages.

Intended to support upgrading dependencies.

**Note:**  Ignoring only certain constraints isn’t supported.  See Cabal issue [`#2265`](https://github.com/haskell/cabal/issues/2265) for details.


### `HALCYON_NO_BUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build`

Prevents building the app and any dependencies.

Intended to use on resource-constrained machines, capable of installing and running the app, but not building it.


### `HALCYON_NO_BUILD_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build-dependencies`

Prevents building any dependencies.

Intended to use on resource-constrained machines, capable of building the app, but not the dependencies.


### `HALCYON_DEPENDENCIES_ONLY`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--dependencies-only`

Prevents building and installing the app.

Intended to support constructing deployment systems.


Install-time options
--------------------

### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--extra-apps=...`
> Magic file:          | `.halcyon/extra-apps`

Additional Haskell apps to be installed in the install directory as run-time dependencies.

The apps must be separated by whitespace, and can be specified as for [`halcyon install`](#halcyon-install).


### `HALCYON_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | string, file, or directory, optional
> Command-line option: | `--extra-apps-constraints=...`
> Magic file:          | `.halcyon/extra-apps-constraints`

Version constraints to be declared by apps specified with [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps).

Each constraint must be in _`name`_`-`_`version`_ format, referencing a Cabal package name and version number.  The constraints must be separated by whitespace.

When a directory is specified, it must contain constraints files named _`name-version`_`.constraints`, referencing the name and version number of each extra app.


### `HALCYON_EXTRA_DATA_FILES`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--extra-data-files=...`
> Magic file:          | `.halcyon/extra-data-files`

Additional data files to be copied to the install directory as run-time dependencies.

The files must be separated by whitespace, and can be specified as paths or GNU _bash_ [globs](http://gnu.org/software/bash/manual/html_node/Filename-Expansion.html), relative to the build directory.

At run-time, the files will be available in the Cabal [data files directory](https://haskell.org/cabal/users-guide/developing-packages.html#accessing-data-files-from-package-code).

**Note:**  Works around Cabal issue [`#713`](https://github.com/haskell/cabal/issues/713) and [`#784`](https://github.com/haskell/cabal/issues/784).

<div class="pre-like"><p>
_See the [How I Start](/examples/#how-i-start) source code for an example of using extra data files._
</p></div>


### `HALCYON_EXTRA_OS_PACKAGES`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--extra-os-packages=...`
> Magic file:          | `.halcyon/extra-os-packages`

Additional OS packages to be installed in the install directory as run-time dependencies.

Each package must be in _`name`_ or _`pattern`_`:`_`name`_ format, where _`pattern`_ is a GNU _bash_ regular expression to match the target platform.  The packages must be separated by whitespace.

Platform identifiers are obtained with the [`detect_platform`](https://bashmenot.mietek.io/reference/#detect_platform) function.

<div class="pre-like"><p>
_See the [Haskell Language](/examples/#haskell-language) source code for an example of using extra OS packages._
</p></div>


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--pre-install-hook=...`
> Magic file:          | `.halcyon/pre-install-hook`
> Script arguments:    | _`tag source_dir install_dir data_dir`_

Script to execute when installing the app, before the install directory is archived.

<div class="pre-like"><p>
_See the [Try Idris](/examples/#try-idris) source code for an example of using a pre-install hook._
</p></div>


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--post-install-hook=...`
> Magic file:          | `.halcyon/post-install-hook`
> Script arguments:    | _`tag source_dir install_dir data_dir`_

Script to execute when installing the app, after the contents of the install directory are copied to [`HALCYON_ROOT`](#halcyon_root).


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

Intended to support installing apps which require GHC and Cabal at run-time.

<div class="pre-like"><p>
_See the [Try Haste](/examples/#try-haste) source code for an example of using GHC and Cabal at run-time._
</p></div>


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

Forces Halcyon to delete the entire contents of [`HALCYON_CACHE`](#halcyon_cache) after beginning execution.


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

URL of the Amazon S3 bucket from which Halcyon downloads public archives and constraints files.


### `HALCYON_NO_PUBLIC_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-public-storage`

Prevents downloading archives and constraints files from public storage.


Private storage options
-----------------------

### `HALCYON_AWS_ACCESS_KEY_ID`

> ---------------------|---
> Default value:       | _none_
> Type:                | 20-character string, optional
> Command-line option: | `--aws-access-key-id=...`

Amazon Web Services access key ID, used to authenticate S3 requests.


### `HALCYON_AWS_SECRET_ACCESS_KEY`

> ---------------------|---
> Default value:       | _none_
> Type:                | 40-character string, optional
> Command-line option: | `--aws-secret-access-key=...`

Amazon Web Services secret access key, used to authenticate S3 requests.


### `HALCYON_S3_BUCKET`

> ---------------------|---
> Default value:       | _none_
> Type:                | S3 name, optional
> Command-line option: | `--s3-bucket=...`

Name of the Amazon S3 bucket in which Halcyon stores private archives and constraints files.

**Note:**  Using buckets located in S3 regions other than US Standard requires the right [`HALCYON_S3_ENDPOINT`](#halcyon_s3_endpoint).


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

Name of the [S3 ACL](https://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html) to be assigned to all files uploaded to [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).

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
> Default value:       | `7.8.4`
> Type:                | version
> Command-line option: | `--ghc-version=...`

Default version of GHC to be installed or restored in the GHC directory.

Used when the app doesn’t declare a `base` package constraint, or when installing GHC and Cabal only.

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

Script to execute when building the GHC directory, before GHC is installed.


### `HALCYON_GHC_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--ghc-post-build-hook=...`
> Magic file:          | `.halcyon/ghc-post-build-hook`
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the GHC directory, after GHC is installed.


### `HALCYON_GHC_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--ghc-rebuild`

Forces Halcyon to rebuild the GHC directory from scratch by installing GHC again.


Cabal options
-------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | `1.20.0.3`
> Type:                | version
> Command-line option: | `--cabal-version=...`

Version of _cabal-install_ to be bootstrapped or restored in the Cabal directory.

Supported versions include:

- [_cabal-install_ 1.22.0.0](https://haskell.org/cabal/release/cabal-install-1.22.0.0/)
- [_cabal-install_ 1.20.0.6](https://haskell.org/cabal/release/cabal-install-1.20.0.6/)
- [_cabal-install_ 1.20.0.5](https://haskell.org/cabal/release/cabal-install-1.20.0.5/)
- [_cabal-install_ 1.20.0.3](https://haskell.org/cabal/release/cabal-install-1.20.0.3/)
- [_cabal-install_ 1.20.0.2](https://haskell.org/cabal/release/cabal-install-1.20.0.2/)
- [_cabal-install_ 1.20.0.1](https://haskell.org/cabal/release/cabal-install-1.20.0.1/)
- [_cabal-install_ 1.20.0.0](https://haskell.org/cabal/release/cabal-install-1.20.0.0/)


### `HALCYON_CABAL_REMOTE_REPO`

> ---------------------|---
> Default value:       | `hackage:http://hackage.haskell.org/packages/archive`
> Type:                | string or file
> Command-line option: | `--cabal-remote-repo=...`
> Magic file:          | `.halcyon/cabal-remote-repo`

Name and URL of the Cabal repository to be referenced in the Halcyon `cabal.config` file.

The value must be in Cabal `remote-repo` format.

**Note:**  Cabal doesn’t support HTTPS URLs.  See Cabal issue [`#936`](https://github.com/haskell/cabal/issues/936) for details.


### `HALCYON_CABAL_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-pre-build-hook=...`
> Magic file:          | `.halcyon/cabal-pre-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal directory, before _cabal-install_ is bootstrapped.


### `HALCYON_CABAL_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-post-build-hook=...`
> Magic file:          | `.halcyon/cabal-post-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal directory, after _cabal-install_ is bootstrapped.


### `HALCYON_CABAL_PRE_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-pre-update-hook=...`
> Magic file:          | `.halcyon/cabal-pre-update-hook`
> Script arguments:    | _none_

Script to execute when updating the Cabal directory, before `cabal update`.


### `HALCYON_CABAL_POST_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--cabal-post-update-hook=...`
> Magic file:          | `.halcyon/cabal-post-update-hook`
> Script arguments:    | _none_

Script to execute when updating the Cabal directory, after `cabal update`.


### `HALCYON_CABAL_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-rebuild`

Forces Halcyon to rebuild the Cabal directory from scratch by bootstrapping _cabal-install_ again.


### `HALCYON_CABAL_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-update`

Forces Halcyon to update the Cabal directory by running `cabal update` again.


Sandbox options
---------------

### `HALCYON_SANDBOX_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--sandbox-extra-configure-flags=...`
> Magic file:          | `.halcyon/sandbox-extra-configure-flags`

Additional flags for `cabal install --dependencies-only`.

The flags must be separated by whitespace.

**Note:**  Any `--prefix=...` flags will be ignored.

<div class="pre-like"><p>
_See the [Haskell Language](/examples/#haskell-language) source code for an example of using extra configure flags._
</p></div>


### `HALCYON_SANDBOX_SOURCES`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--sandbox-sources=...`
> Magic file:          | `.halcyon/sandbox-sources`

Additional Cabal packages to be copied to the sandbox directory as build-time dependencies and referenced with `cabal sandbox add-source`.

The packages must be separated by whitespace, and can be specified as:

- directory paths
- _git_ URLs

**Note:**  Implements Cabal feature requests [`#1534`](https://github.com/haskell/cabal/issues/1534) and [`#2189`](https://github.com/haskell/cabal/issues/2189).

<div class="pre-like"><p>
_See the [Try Haskell](/examples/#try-haskell) source code for an example of using sandbox sources._
</p></div>


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--sandbox-extra-apps=...`
> Magic file:          | `.halcyon/sandbox-extra-apps`

Additional Haskell apps to be installed in the sandbox directory as build-time dependencies.

The apps must be separated by whitespace, and can be specified as for [`halcyon install`](#halcyon-install).

Intended to support installing Cabal `build-tools`, such as _alex_ or _happy_.

**Note:**  Works around Cabal issues [`#220`](https://github.com/haskell/cabal/issues/220) and [`#779`](https://github.com/haskell/cabal/issues/779).

<div class="pre-like"><p>
_See the [Haskell Language](/examples/#haskell-language) source code for an example of using sandbox extra apps._
</p></div>


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | string, file, or directory, optional
> Command-line option: | `--sandbox-extra-apps-constraints=...`
> Magic file:          | `.halcyon/sandbox-extra-apps-constraints`

Version constraints to be declared by apps specified with [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps).

Each constraint must be in _`name`_`-`_`version`_ format, referencing a Cabal package name and version number.  The constraints must be separated by whitespace.

When a directory is specified, it must contain constraints files named _`name-version`_`.constraints`, referencing the name and version number of each extra app.

<div class="pre-like"><p>
_See the [Haskell Language](/examples/#haskell-language) source code for an example of using sandbox extra apps constraints._
</p></div>


### `HALCYON_SANDBOX_EXTRA_OS_PACKAGES`

> ---------------------|---
> Default value:       | _none_
> Type:                | string or file, optional
> Command-line option: | `--sandbox-extra-os-packages=...`
> Magic file:          | `.halcyon/sandbox-extra-os-packages`

Additional OS packages to be installed in the sandbox directory as build-time dependencies.

Each package must be in _`name`_ or _`pattern`_`:`_`name`_ format, where _`pattern`_ is a GNU _bash_ regular expression to match the target platform.  The packages must be separated by whitespace.

Platform identifiers are obtained with the [`detect_platform`](https://bashmenot.mietek.io/reference/#detect_platform) function.

**Note:**  Implements Cabal feature request [`#571`](https://github.com/haskell/cabal/issues/571).

<div class="pre-like"><p>
_See the [Haskell Language](/examples/#haskell-language) source code for an example of using sandbox extra OS packages._
</p></div>


### `HALCYON_SANDBOX_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--sandbox-pre-build-hook=...`
> Magic file:          | `.halcyon/sandbox-pre-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox directory, before `cabal install --dependencies-only`.


### `HALCYON_SANDBOX_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | file, optional
> Command-line option: | `--sandbox-post-build-hook=...`
> Magic file:          | `.halcyon/sandbox-post-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox directory, after `cabal install --dependencies-only`.

<div class="pre-like"><p>
_See the [Try Haskell](/examples/#try-haskell) source code for an example of using a sandbox post-build hook._
</p></div>


### `HALCYON_SANDBOX_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--sandbox-rebuild`

Forces Halcyon to rebuild the sandbox directory and the app from scratch, which includes reinstalling all [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps) and [`HALCYON_SANDBOX_EXTRA_OS_PACKAGES`](#halcyon_sandbox_extra_os_packages).


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
$ source "${HALCYON_DIR}/src.sh"
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
