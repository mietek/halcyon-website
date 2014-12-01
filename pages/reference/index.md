---
title: Programmer’s reference
page-class: add-section-toc rule-before-h3 tweak-listings
page-data:
- key: max-section-link-level
  value: 4
- key: max-back-link-level
  value: 4
page-head: |
  <style>
    header a.link-reference {
      color: #3f96f0;
    }
  </style>
---


Programmer’s reference
======================


Commands
--------

### `halcyon deploy`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds and installs the specified application, restoring or building any needed [layers](/guide/#layers).

The application may be specified as:

- directory path
- label
- _git_ URL

When no application is specified, Halcyon attempts to detect an application in the current directory.  If no application is detected, Halcyon deploys GHC and Cabal only.  To ignore the current directory, specify [`--no-app`](#halcyon_no_app), or set [`HALCYON_NO_APP`](#halcyon_no_app) to `1`.

All labels are Cabal package names, with or without a `-`_`version`_ suffix.

For all _git_ URLs, the `master` branch is used by default.  Other branches may be specified with a `#`_`branch`_ suffix.

[Most options](#general-options) can be specified either on the command-line, or by setting environment variables.  Some options can also be specified by including [magic files](/guide/#magic-files) in the [source directory](/guide/#source-directory).  Command-line options take precedence over environment variables, which in turn take precedence over magic files.


### `halcyon label`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the label of the specified application, as it would be used by [`halcyon deploy`](#halcyon-deploy).

Intended to quickly determine the newest version of an application.


### `halcyon constraints`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the constraints file of the specified application, in `cabal freeze` format, as it would be used by [`halcyon deploy`](#halcyon-deploy).

Intended to quickly determine the implicit constraints of an application, and to help ensure any `cabal.config` files are overridden properly, when using options such as [`HALCYON_CONSTRAINTS`](#halcyon_constraints).

Not entirely a dry-run, because GHC and Cabal may need to be installed.

**Note:**  Recommended over `cabal freeze` because of Cabal issue [#1908](https://github.com/haskell/cabal/issues/1908).


### `halcyon paths`

> ---------------------|---
> Arguments:           | _none_

Outputs a shell script which sets up the needed environment variables, based on [`HALCYON_BASE`](#halcyon_base).

1. [`HALCYON_BASE`](#halcyon_base) is set to `/app`, unless already set.

2. `PATH`, `LIBRARY_PATH`, `LD_LIBRARY_PATH` are extended to point into [`HALCYON_BASE`](#halcyon_base).

3. `LANG` is set to `C.UTF-8`, unless already set.

**Note:**  Using a UTF-8 locale works around Cabal issue [#1883](https://github.com/haskell/cabal/issues/1883).


General options
---------------

### `HALCYON_BASE`

> ---------------------|---
> Default value:       | `/app`
> Type:                | directory path
> Command-line option: | `--base=`…

Directory in which Halcyon restores or builds [layers](/guide/#layers).

Default value of [`HALCYON_PREFIX`](#halcyon_prefix).


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Type:                | directory path
> Command-line option: | `--root=`…

Root of the path to the directory in which Halcyon installs applications.

Intended to support constructing advanced workflows.

_**Example:**  If the [install directory](/guide/#install-directory) consists of `bin/hello`, [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, and [`HALCYON_ROOT`](#halcyon_root) is set to `/tmp/hello`, then the application will be configured to be installed as `/app/bin/hello`, and will actually be installed as `/tmp/hello/app/bin/hello`._


### `HALCYON_PREFIX`

> ---------------------|---
> Default value:       | [`HALCYON_BASE`](#halcyon_base)
> Type:                | directory path
> Command-line option: | `--prefix=`…

Directory in which Halcyon installs applications.

_**Example:**  If the [install directory](/guide/#install-directory) consists of `bin/hello`, and [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, then the application will be installed as `/app/bin/hello`._


### `HALCYON_RESTORE_LAYERS`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--restore-layers`

Forces Halcyon to restore all [layers](/guide/#layers), even when an [install directory](/guide/#install-directory) archive is available.

Intended to support applications requiring GHC when [`HALCYON_POST_INSTALL_HOOK`](#halcyon_post_install_hook) is executed.


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-app`

Forces Halcon to deploy GHC and Cabal only, even when the current directory is a [source directory](/guide/#source-directory).

The versions of GHC and _cabal-install_ to deploy are specified by [`HALCYON_GHC_VERSION`](#halcyon_ghc_version) and [`HALCYON_CABAL_VERSION`](#halcyon_cabal_version).


### `HALCYON_NO_BUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build`

Prevents building any [layers](/guide/#layers), or the application.

Intended to use on dedicated deploy machines.


### `HALCYON_NO_BUILD_LAYERS`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build-layers`

Prevents building any [layers](/guide/#layers).

Intended to use on deploy machines, which are also capable of building the application.


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
> Type:                | optional file or directory path
> Command-line option: | `--constraints=`…
> Standard file:       | `cabal.config`

Constraints file, or directory containing a constraints file, to override any `cabal.config` files included in the [source directory](/guide/#source-directory).

Any specified directory must contain a file named _`name-version`_`.cabal.config`, matching the label.

Intended to support explicitly declaring the dependencies of any application which does not already include a constraints file.


### `HALCYON_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--extra-configure-flags=`…
> Magic file:          | `.halcyon-magic/extra-configure-flags`

Additional flags to specify when running `cabal configure`.

**Note:**  Any `--prefix=`… flag will be ignored.


### `HALCYON_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--pre-build-hook=`…
> Magic file:          | `.halcyon-magic/pre-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the application, before running `cabal build`.


### `HALCYON_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--post-build-hook=`…
> Magic file:          | `.halcyon-magic/post-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the application, after running `cabal build`.


### `HALCYON_APP_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-rebuild`

Forces Halcyon to build the application from scratch.


### `HALCYON_APP_RECONFIGURE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reconfigure`

Forces Halcyon to run `cabal configure` again.


Install-time options
--------------------

### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated apps
> Command-line option: | `--extra-apps=`…
> Magic file:          | `.halcyon-magic/extra-apps`

Additional Haskell applications to include in the [install directory](/guide/#install-directory), as run-time dependencies.

The applications may be specified as:

- directory paths
- labels
- _git_ URLs


### `HALCYON_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file or directory path
> Command-line option: | `--extra-apps-constraints=`…
> Magic file:          | `.halcyon-magic/extra-apps-constraints`

Constraints file, or directory containing constraints files, to override any `cabal.config` files included in the [source directories](/guide/#source-directory) of applications specified with [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps).

Any specified directory must contain files named _`name-version`_`.cabal.config`, each matching one label.

Intended to support explicitly declaring the dependencies of any application which does not already include a constraints file.


### `HALCYON_EXTRA_DATA_FILES`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated globs
> Command-line option: | `--extra-data-files=`…
> Magic file:          | `.halcyon-magic/extra-data-files`

Additional files to include in the [install directory](/guide/#install-directory), as run-time dependencies.

The files are specified as file or directory paths relative to the [build directory](/guide/#build-directory).  Standard GNU _bash_ [filename expansion](http://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html)—globbing—is performed on each path.  At run-time, the files will be available in the [Cabal data files directory](https://www.haskell.org/cabal/users-guide/developing-packages.html#accessing-data-files-from-package-code).

Intended to support applications which do not declare all run-time data files as `data-files` in the Cabal package description.

**Note:**  Works around Cabal issue [#713](https://github.com/haskell/cabal/issues/713) and [#784](https://github.com/haskell/cabal/issues/784).


### `HALCYON_INCLUDE_LAYERS`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--include-layers`
> Magic file:          | `.halcyon-magic/include-layers`

Forces Halcyon to include all layers in the [install directory](/guide/#install-directory), as run-time dependencies.

Intended to support applications requiring GHC at run-time.


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--pre-install-hook=`…
> Magic file:          | `.halcyon-magic/pre-install-hook`
> Script arguments:    | _`tag source_dir install_dir data_dir`_

Script to execute when installing the application, before archiving the [install directory](/guide/#install-directory).


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--post-install-hook=`…
> Magic file:          | `.halcyon-magic/post-install-hook`
> Script arguments:    | _`tag source_dir install_dir data_dir`_

Script to execute when installing the application, after copying the contents of the [install directory](/guide/#install-directory) to [`HALCYON_ROOT`](#halcyon_root).


### `HALCYON_APP_REINSTALL`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reinstall`

Forces Halcyon to prepare the [install directory](/guide/#install-directory) again.


Cache options
-------------

### `HALCYON_CACHE`

> ---------------------|---
> Default value:       | `/var/tmp/halcyon-cache`
> Type:                | directory path
> Command-line option: | `--cache=`…

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

### `HALCYON_PUBLIC_STORAGE`

> ---------------------|---
> Default value:       | [`https://s3.halcyon.sh`](https://s3.halcyon.sh/)
> Type:                | S3 URL
> Command-line option: | `--public-storage=`…

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
> Type:                | optional string
> Command-line option: | `--aws-access-key-id=`…

Amazon Web Services username, used to authenticate S3 requests.


### `HALCYON_AWS_SECRET_ACCESS_KEY`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional string
> Command-line option: | `--aws-secret-access-key=`…

Amazon Web Services password, used to authenticate S3 requests.


### `HALCYON_S3_BUCKET`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional S3 bucket name
> Command-line option: | `--s3-bucket=`…

Name of the Amazon S3 bucket in which Halcyon stores archives and constraints files.

**Note:**  Specifying buckets located in S3 regions other than US Standard requires also specifying the appropriate [`HALCYON_S3_ENDPOINT`](#halcyon_s3_endpoint).


### `HALCYON_S3_ENDPOINT`

> ---------------------|---
> Default value:       | `s3.amazonaws.com`
> Type:                | address
> Command-line option: | `--s3-endpoint=`…

Address of the [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) in which [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket) is located.


### `HALCYON_S3_ACL`

> ---------------------|---
> Default value:       | `private`
> Type:                | `private` or `public-read`
> Command-line option: | `--s3-acl=`…

Amazon S3 access control list assigned to all files uploaded to [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).


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


GHC layer options
-----------------

### `HALCYON_GHC_VERSION`

> ---------------------|---
> Default value:       | `7.8.3`
> Type:                | version number
> Command-line option: | `--ghc-version=`…

Default version of GHC to install or restore in the [GHC layer](/guide/#ghc-layer).

Used when deploying an application with no constraints specified, or when deploying GHC and Cabal only.


### `HALCYON_GHC_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--ghc-pre-build-hook=`…
> Magic file:          | `.halcyon-magic/ghc-pre-build-hook`
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the [GHC layer](/guide/#ghc-layer), before installing GHC.


### `HALCYON_GHC_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--ghc-post-build-hook=`…
> Magic file:          | `.halcyon-magic/ghc-post-build-hook`
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the [GHC layer](/guide/#ghc-layer), after installing GHC.


### `HALCYON_GHC_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--ghc-rebuild`

Forces Halcyon to rebuild the [GHC layer](/guide/#ghc-layer) from scratch, which implies installing GHC again.


Cabal layer options
-------------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | `1.20.0.3`
> Type:                | version number
> Command-line option: | `--cabal-version=`…

Version of _cabal-install_ to bootstrap or restore in the [Cabal layer](/guide/#cabal-layer).


### `HALCYON_CABAL_REPO`

> ---------------------|---
> Default value:       | `Hackage:http://hackage.haskell.org/packages/archive`
> Type:                | colon-separated name and URL
> Command-line option: | `--cabal-repo=`…

Name and URL of the Cabal repository referenced by the Cabal package database in the [Cabal layer](/guide/#cabal-layer), in `remote-repo` format.

**Note:**  Cannot work around Cabal issue [#936](https://github.com/haskell/cabal/issues/936), which means HTTPS URLs are not supported.


### `HALCYON_CABAL_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-pre-build-hook=`…
> Magic file:          | `.halcyon-magic/cabal-pre-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the [Cabal layer](/guide/#cabal-layer), before bootstrapping _cabal-install_.


### `HALCYON_CABAL_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-post-build-hook=`…
> Magic file:          | `.halcyon-magic/cabal-post-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the [Cabal layer](/guide/#cabal-layer), after bootstrapping _cabal-install_.


### `HALCYON_CABAL_PRE_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-pre-update-hook=`…
> Magic file:          | `.halcyon-magic/cabal-pre-update-hook`
> Script arguments:    | _none_

Script to execute when updating the [Cabal layer](/guide/#cabal-layer), before running `cabal update`.


### `HALCYON_CABAL_POST_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-post-update-hook=`…
> Magic file:          | `.halcyon-magic/cabal-post-update-hook`
> Script arguments:    | _none_

Script to execute when updating the [Cabal layer](/guide/#cabal-layer), after running `cabal update`.


### `HALCYON_CABAL_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-rebuild`

Forces Halcyon to rebuild the [Cabal layer](/guide/#cabal-layer) from scratch, which implies bootstrapping _cabal-install_ again.


### `HALCYON_CABAL_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-update`

Forces Halcyon to update the [Cabal layer](/guide/#cabal-layer), which means running `cabal update` again.


Sandbox layer options
---------------------

### `HALCYON_SANDBOX_SOURCES`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated sources
> Command-line option: | `--sandbox-sources=`…
> Magic file:          | `.halcyon-magic/sandbox-sources`

Additional Cabal packages to include in the [sandbox layer](/guide/#sandbox-layer), as build-time dependencies.

The packages are made available for installation by running `cabal sandbox add-source`, and may be specified as:

- directory paths
- _git_ URLs

**Note:**  Implements Cabal feature requests [#1534](https://github.com/haskell/cabal/issues/1534) and [#2189](https://github.com/haskell/cabal/issues/2189).


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated apps
> Command-line option: | `--sandbox-extra-apps=`…
> Magic file:          | `.halcyon-magic/sandbox-extra-apps`

Additional Haskell applications to include in the [sandbox layer](/guide/#sandbox-layer), as build-time dependencies.

The applications may be specified as:

- directory paths
- labels
- _git_ URLs

Intended to support installing Cabal `build-tools`, such as _alex_ or _happy_.

**Note:**  Works around Cabal issues [#220](https://github.com/haskell/cabal/issues/220) and [#779](https://github.com/haskell/cabal/issues/779).


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file or directory path
> Command-line option: | `--sandbox-extra-apps-constraints=`…
> Magic file:          | `.halcyon-magic/sandbox-extra-apps-constraints`

Constraints file, or directory containing constraints files, to override any `cabal.config` files included in the [source directories](/guide/#source-directory) of applications specified with [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps).

Any specified directory must contain files named _`name-version`_`.cabal.config`, each matching one label.

Intended to support explicitly declaring the dependencies of any application which does not already include a constraints file.


### `HALCYON_SANDBOX_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--sandbox-extra-configure-flags=`…
> Magic file:          | `.halcyon-magic/sandbox-extra-configure-flags`

Additional flags to specify when running `cabal configure --dependencies-only`.


### `HALCYON_SANDBOX_EXTRA_LIBS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--sandbox-extra-libs=`…
> Magic file:          | `.halcyon-magic/sandbox-extra-libs`

Additional OS libraries to install in the [sandbox layer](/guide/#sandbox-layer), as build-time dependencies.

**Note:**  Support is currently limited to libraries available on Ubuntu, via `apt-get`.


### `HALCYON_SANDBOX_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--sandbox-pre-build-hook=`…
> Magic file:          | `.halcyon-magic/sandbox-pre-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the [sandbox layer](/guide/#sandbox-layer), before running `cabal install`.


### `HALCYON_SANDBOX_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--sandbox-post-build-hook=`…
> Magic file:          | `.halcyon-magic/sandbox-post-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the [sandbox layer](/guide/#sandbox-layer), after running `cabal install`.


### `HALCYON_SANDBOX_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--sandbox-rebuild`

Forces Halcyon to rebuild the [sandbox layer](/guide/#sandbox-layer) and the application from scratch, which implies reinstalling any [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps) or [`HALCYON_SANDBOX_EXTRA_LIBS`](#halcyon_sandbox_extra_libs).


Self-update options
-------------------

### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Type:                | _git_ URL
> Command-line option: | _none_

URL of the _git_ repository from which Halcyon updates itself.

The `master` branch is used by default.  Other branches may be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_SELF_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | _none_

Prevents Halcyon from updating itself.
