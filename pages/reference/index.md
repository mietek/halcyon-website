---
title: Programmer’s reference
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


Programmer’s reference
======================

**Work in progress.  All available information is up-to-date.**


Commands
--------

### `deploy`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds and installs the specified application, restoring or building all dependencies as needed.

The application may be specified as:

- **directory path**\
  Deploy from a directory.

- **label**—`name-version`\
  Deploy from the Cabal repository.

- **_git_ URL**\
  Deploy from a _git_ repository.

- **nothing**\
  Deploy from the current directory, or deploy an environment only.

To force deploying an environment only, ignoring the current directory, set [`HALCYON_NO_APP`](#halcyon_no_app) to `1`.

All options, except [self-update options](#self-update-options), can be specified either on the command-line, or by setting environment variables.

Some options can also be specified by including [magic files](#magic-files) in the `.halcyon-magic` subdirectory of the application source directory.

Command-line options take precedence over environment variables, which in turn take precedence over magic files.


### `label`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the label of the specified application, as it would be determined during [`deploy`](#deploy).

Intended to quickly determine the newest version of an application.


### `constraints`

> ---------------------|---
> Arguments:           | _`app? option*`_

Outputs the constraints file of the specified application, as it would be determined during [`deploy`](#deploy).

Intended to quickly determine the implicit constraints of an application, similarly to `cabal freeze`.

Also intended to help ensure the application `cabal.config` is overridden properly, when using options such as [`HALCYON_CONSTRAINTS`](#halcyon_constraints).

Not entirely a dry-run, because an environment may need to be installed in [`HALCYON_BASE`](#halcyon_base).

**NOTE:**  Works around Cabal issue [#1908](https://github.com/haskell/cabal/issues/1908).


### `paths`

> ---------------------|---
> Arguments:           | _none_

Outputs a shell script which sets up the needed environment variables, based on [`HALCYON_BASE`](#halcyon_base).

1. [`HALCYON_BASE`](#halcyon_base) is set to `/app`, unless already set.

2. `PATH`, `LIBRARY_PATH`, `LD_LIBRARY_PATH` are extended to point into [`HALCYON_BASE`](#halcyon_base).

3. `LANG` is set to `C.UTF-8`, unless already set.

**NOTE:**  Using a UTF-8 locale works around Cabal issue [#1883](https://github.com/haskell/cabal/issues/1883).


Self-update options
-------------------

### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Type:                | _git_ URL
> Command-line option: | _none_

URL of the _git_ repository from which Halcyon updates itself.

Uses the `master` branch.  Another branch may be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_SELF_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | _none_

Disables self-updates.


General options
---------------

### `HALCYON_BASE`

> ---------------------|---
> Default value:       | `/app`
> Type:                | directory path
> Command-line option: | `--base=`…

Directory in which Halcyon restores or builds layers.

Default value of [`HALCYON_PREFIX`](#halcyon_prefix).


### `HALCYON_PREFIX`

> ---------------------|---
> Default value:       | [`HALCYON_BASE`](#halcyon_base)
> Type:                | directory path
> Command-line option: | `--prefix=`…

Directory in which Halcyon installs applications.

For example, if the application install directory consists of `bin/hello`, and [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, then the application will be installed as `/app/bin/hello`.


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Type:                | directory path
> Command-line option: | `--root=`…

Root of the path to the directory in which Halcyon installs applications.

Intended to support advanced packaging workflows.

For example, if the application install directory consists of `bin/hello`, [`HALCYON_PREFIX`](#halcyon_prefix) is set to `/app`, and [`HALCYON_ROOT`](#halcyon_root) is set to `/tmp/hello`, then the application will be configured to be installed as `/app/bin/hello`, and installed as `/tmp/hello/app/bin/hello`.


### `HALCYON_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file or directory path
> Command-line option: | `--constraints=`…
> Standard file:       | `cabal.config`

Constraints file, or directory containing a constraints file, to override any `cabal.config` included in the application source directory.

When a directory path is specified, the directory must contain a file named _`name-version`_`.cabal.config`, matching the application name and version number.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated apps
> Command-line option: | `--extra-apps=`…
> Magic file:          | [`extra-apps`](#extra-apps)

Additional Haskell applications to install together with the application, as runtime dependencies.

The applications may be specified as:

- directory paths
- labels—`name-version`
- _git_ URLs


### `HALCYON_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file or directory path
> Command-line option: | `--extra-apps-constraints=`…
> Magic file:          | [`extra-apps-constraints`](#extra-apps-constraints)

Constraints file, or directory containing constraints files, to override any `cabal.config` included in the source directories of applications specified with [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps).

When a directory path is specified, the directory must contain files named _`name-version`_`.cabal.config`, each matching one additional application name and version number.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--pre-install-hook=`…
> Magic file:          | [`pre-install-hook`](#pre-install-hook)
> Script rguments:     | _`tag source_dir install_dir root`_

Script to execute when installing the application, before running `cp -R`.


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--post-install-hook=`…
> Magic file:          | [`post-install-hook`](#post-install-hook)
> Script arguments:    | _`tag source_dir install_dir root`_

Script to execute when installing the application, after running `cp -R`.


### `HALCYON_KEEP_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--keep-dependencies`

Prevents deleting the contents of [`HALCYON_BASE`](#halcyon_base) between building and installing the application, and forces restoring all layers even when an application install archive is available.

Intended to support easily restoring a full Haskell development environment, ready to inspect the application with GHCi.


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-app`

Forces deploying an environment only, ignoring the current directory.

The versions of GHC and _cabal-install_ to deploy are specified by [`HALCYON_GHC_VERSION`](#halcyon_ghc_version) and [`HALCYON_CABAL_VERSION`](#halcyon_cabal_version).


### `HALCYON_NO_BUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build`

Prevents building any application dependencies, or the application.

Intended to use on dedicated deploy machines.


### `HALCYON_NO_BUILD_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build-dependencies`

Prevents building any application dependencies.

Intended to use on deploy machines capable of building the application.


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

Forces deleting the entire contents of [`HALCYON_CACHE`](#halcyon_cache).


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

Prevents deleting out-of-date archives from [`HALCYON_CACHE`](#halcyon_cache).


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

Amazon Web Services credential, used to authenticate S3 requests.


### `HALCYON_AWS_SECRET_ACCESS_KEY`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional string
> Command-line option: | `--aws-secret-access-key=`…

Amazon Web Services credential, used to authenticate S3 requests.


### `HALCYON_S3_BUCKET`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional S3 bucket name
> Command-line option: | `--s3-bucket=`…

Name of the Amazon S3 bucket in which Halcyon stores archives and constraints files.

Specifying buckets in regions other than US Standard requires also specifying the appropriate [`HALCYON_S3_ENDPOINT`](#halcyon_s3_endpoint).


### `HALCYON_S3_ENDPOINT`

> ---------------------|---
> Default value:       | `s3.amazonaws.com`
> Type:                | Internet address
> Command-line option: | `--s3-endpoint=`…

Internet address of the [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) responsible for [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket).


### `HALCYON_S3_ACL`

> ---------------------|---
> Default value:       | `private`
> Type:                | `private` or `public-read`
> Command-line option: | `--s3-acl=`…

Amazon S3 access control list assigned to all files uploaded to private storage.


### `HALCYON_NO_PRIVATE_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-private-storage`

Disables accessing private storage.


### `HALCYON_NO_UPLOAD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-upload`

Prevents uploading cached archives and constraints files to private storage.


### `HALCYON_NO_CLEAN_PRIVATE_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-clean-private-storage`

Prevents deleting out-of-date archives and constraints files from private storage.


GHC layer options
-----------------

### `HALCYON_GHC_VERSION`

> ---------------------|---
> Default value:       | `7.8.3`
> Type:                | version number
> Command-line option: | `--ghc-version=`…

Default version of GHC to install or restore as part of the GHC layer.

Used when deploying an application with no constraints specified, or when deploying an environment only.

Supported versions include:

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
> Type:                | optional file path
> Command-line option: | `--ghc-pre-build-hook=`…
> Magic file:          | [`ghc-pre-build-hook`](#ghc-pre-build-hook)
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the GHC layer, before installing GHC.


### `HALCYON_GHC_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--ghc-post-build-hook=`…
> Magic file:          | [`ghc-post-build-hook`](#ghc-post-build-hook)
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the GHC layer, after installing GHC.


### `HALCYON_GHC_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--ghc-rebuild`

Forces rebuilding the GHC layer from scratch, which includes reinstalling GHC.


Cabal layer options
-------------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | `1.20.0.3`
> Type:                | version number
> Command-line option: | `--cabal-version=`…

Version of _cabal-install_ to bootstrap or restore as part of the Cabal layer.

Supported versions include:

- [_cabal-install_ 1.20.0.3](https://www.haskell.org/cabal/release/cabal-install-1.20.0.3/)
- [_cabal-install_ 1.20.0.2](https://www.haskell.org/cabal/release/cabal-install-1.20.0.2/)
- [_cabal-install_ 1.20.0.1](https://www.haskell.org/cabal/release/cabal-install-1.20.0.1/)
- [_cabal-install_ 1.20.0.0](https://www.haskell.org/cabal/release/cabal-install-1.20.0.0/)


### `HALCYON_CABAL_REPO`

> ---------------------|---
> Default value:       | `Hackage:http://hackage.haskell.org/packages/archive`
> Type:                | colon-separated name and URL
> Command-line option: | `--cabal-repo=`…

Name and URL of the Cabal repository, in the same format as the `remote-repo` field of a `cabal.config` file.

**NOTE:**  Cannot work around Cabal issue [#936](https://github.com/haskell/cabal/issues/936) to support HTTPS URLs.


### `HALCYON_CABAL_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-pre-build-hook=`…
> Magic file:          | [`cabal-pre-build-hook`](#cabal-pre-build-hook)
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal layer, before bootstrapping _cabal-install_.


### `HALCYON_CABAL_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-post-build-hook=`…
> Magic file:          | [`cabal-post-build-hook`](#cabal-post-build-hook)
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal layer, after bootstrapping _cabal-install_.


### `HALCYON_CABAL_PRE_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-pre-update-hook=`…
> Magic file:          | [`cabal-pre-update-hook`](#cabal-pre-update-hook)
> Script arguments:    | _none_

Script to execute when updating the Cabal layer, before running `cabal update`.


### `HALCYON_CABAL_POST_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-post-update-hook=`…
> Magic file:          | [`cabal-post-update-hook`](#cabal-post-update-hook)
> Script arguments:    | _none_

Script to execute when updating the Cabal layer, after running `cabal update`.


### `HALCYON_CABAL_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-rebuild`

Forces rebuilding the Cabal layer from scratch, which includes re-bootstrapping _cabal-install_.


### `HALCYON_CABAL_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-update`

Forces updating the Cabal layer, which includes updating the Cabal package database.


Sandbox layer options
---------------------

### `HALCYON_SANDBOX_SOURCES`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated sources
> Command-line option: | `--sandbox-sources=`…
> Magic file:          | [`sandbox-sources`](#sandbox-sources)

Additional Cabal packages to make available for installation in the sandbox layer, as build-time dependencies, by running `cabal sandbox add-source`.

The packages may be specified as:

- directory paths
- _git_ URLs


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated apps
> Command-line option: | `--sandbox-extra-apps=`…
> Magic file:          | [`sandbox-extra-apps`](#sandbox-extra-apps)

Additional Haskell applications to install in the sandbox layer, as build-time dependencies.

The applications may be specified as:

- directory paths
- labels—`name-version`
- _git_ URLs

Intended to support easily installing Cabal `build-tools`, such as _alex_ or _happy_.

**NOTE:**  Works around Cabal issues [#220](https://github.com/haskell/cabal/issues/220) and [#779](https://github.com/haskell/cabal/issues/779).


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file or directory path
> Command-line option: | `--sandbox-extra-apps-constraints=`…
> Magic file:          | [`sandbox-extra-apps-constraints`](#sandbox-extra-apps-constraints)

Constraints file, or directory containing constraints files, to override any `cabal.config` included in the source directories of applications specified with [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps).

When a directory path is specified, the directory must contain files named _`name-version`_`.cabal.config`, each matching one additional application name and version number.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_SANDBOX_EXTRA_LIBS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--sandbox-extra-libs=`…
> Magic file:          | [`sandbox-extra-libs`](#sandbox-extra-libs)

Additional native libraries to install in the sandbox layer, as build-time dependencies.

**NOTE:**  Support is currently limited to libraries available via `apt-get`.


### `HALCYON_SANDBOX_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--sandbox-pre-build-hook=`…
> Magic file:          | [`sandbox-pre-build-hook`](#sandbox-pre-build-hook)
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox layer, before running `cabal install`.


### `HALCYON_SANDBOX_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--sandbox-post-build-hook=`…
> Magic file:          | [`sandbox-post-build-hook`](#sandbox-post-build-hook)
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox layer, after running `cabal install`.


### `HALCYON_SANDBOX_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--sandbox-rebuild`

Forces rebuilding the sandbox layer from scratch, which includes reinstalling all application build-time dependencies.


Application options
-------------------

### `HALCYON_APP_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--app-extra-configure-flags=`…
> Magic file:          | [`app-extra-configure-flags`](#app-extra-configure-flags)

Additional flags to specify when running `cabal configure`.


### `HALCYON_APP_EXTRA_COPY`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional `source` or `build` or `all`
> Command-line option: | `--app-extra-copy=`…
> Magic file:          | [`app-extra-copy`](#app-extra-copy)

Additional items to include in the application install directory.

The additional items may be specified as:

- `source`—contents of the application source directory
- `build`—contents of the application source and build directories
- `all`—contents of the application source and build directories, and all layers

Intended to support applications which do not or cannot declare all runtime dependencies.

Most files needed at runtime should be declared as `data-files` in the Cabal package description file.  The option to include all layers should be used only for applications which require GHC to be available at runtime.


### `HALCYON_APP_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--app-pre-build-hook=`…
> Magic file:          | [`app-pre-build-hook`](#app-pre-build-hook)
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the application, before running `cabal build`.


### `HALCYON_APP_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--app-post-build-hook=`…
> Magic file:          | [`app-post-build-hook`](#app-post-build-hook)
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the application, after running `cabal build`.


### `HALCYON_APP_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-rebuild`

Forces rebuilding the application from scratch.


### `HALCYON_APP_RECONFIGURE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reconfigure`

Forces re-running `cabal configure`.


Magic files
-----------

### General magic files

#### `extra-apps`

> ---------------------|---
> File path:           | `.halcyon-magic/extra-apps`
> Option:              | [`HALCYON_EXTRA_APPS`](#halcyon_extra_apps)


#### `extra-apps-constraints`

> ---------------------|---
> File path:           | `.halcyon-magic/extra-apps-constraints`
> Option:              | [`HALCYON_EXTRA_APPS_CONSTRAINTS`](#halcyon_extra_apps_constraints)


#### `pre-install-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/pre-install-hook`
> Option:              | [`HALCYON_PRE_INSTALL_HOOK`](#halcyon_pre_install_hook)


#### `post-install-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/post-install-hook`
> Option:              | [`HALCYON_POST_INSTALL_HOOK`](#halcyon_post_install_hook)


### GHC layer magic files

#### `ghc-pre-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/ghc-pre-build-hook`
> Option:              | [`HALCYON_GHC_PRE_BUILD_HOOK`](#halcyon_ghc_pre_build_hook)


#### `ghc-post-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/ghc-post-build-hook`
> Option:              | [`HALCYON_GHC_POST_BUILD_HOOK`](#halcyon_ghc_post_build_hook)


### Cabal layer magic files

#### `cabal-pre-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/cabal-pre-build-hook`
> Option:              | [`HALCYON_CABAL_PRE_BUILD_HOOK`](#halcyon_cabal_pre_build_hook)


#### `cabal-post-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/cabal-post-build-hook`
> Option:              | [`HALCYON_CABAL_POST_BUILD_HOOK`](#halcyon_cabal_post_build_hook)


#### `cabal-pre-update-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/cabal-pre-update-hook`
> Option:              | [`HALCYON_CABAL_PRE_UPDATE_HOOK`](#halcyon_cabal_pre_update_hook)


#### `cabal-post-update-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/cabal-post-update-hook`
> Option:              | [`HALCYON_CABAL_POST_UPDATE_HOOK`](#halcyon_cabal_post_update_hook)


### Sandbox layer magic files

#### `sandbox-sources`

> ---------------------|---
> File path:           | `.halcyon-magic/sandbox-sources`
> Option:              | [`HALCYON_SANDBOX_SOURCES`](#halcyon_sandbox_sources)


#### `sandbox-extra-apps`

> ---------------------|---
> File path:           | `.halcyon-magic/sandbox-extra-apps`
> Option:              | [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps)


#### `sandbox-extra-apps-constraints`

> ---------------------|---
> File path:           | `.halcyon-magic/sandbox-extra-apps-constraints`
> Option:              | [`HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS`](#halcyon_sandbox_extra_apps_constraints)


#### `sandbox-extra-libs`

> ---------------------|---
> File path:           | `.halcyon-magic/sandbox-extra-libs`
> Option:              | [`HALCYON_SANDBOX_EXTRA_LIBS`](#halcyon_sandbox_extra_libs)


#### `sandbox-pre-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/sandbox-pre-build-hook`
> Option:              | [`HALCYON_SANDBOX_PRE_BUILD_HOOK`](#halcyon_sandbox_pre_build_hook)


#### `sandbox-post-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/sandbox-post-build-hook`
> Option:              | [`HALCYON_SANDBOX_POST_BUILD_HOOK`](#halcyon_sandbox_post_build_hook)


### Application magic files

#### `app-extra-configure-flags`

> ---------------------|---
> File path:           | `.halcyon-magic/app-extra-configure-flags`
> Option:              | [`HALCYON_APP_EXTRA_CONFIGURE_FLAGS`](#halcyon_app_extra_configure_flags)


#### `app-extra-copy`

> ---------------------|---
> File path:           | `.halcyon-magic/app-extra-copy`
> Option:              | [`HALCYON_APP_EXTRA_COPY`](#halcyon_app_extra_copy)


#### `app-pre-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/app-pre-build-hook`
> Option:              | [`HALCYON_APP_PRE_BUILD_HOOK`](#halcyon_app_pre_build_hook)


#### `app-post-build-hook`

> ---------------------|---
> File path:           | `.halcyon-magic/app-post-build-hook`
> Option:              | [`HALCYON_APP_POST_BUILD_HOOK`](#halcyon_app_post_build_hook)
