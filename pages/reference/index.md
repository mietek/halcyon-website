---
title: Programmer’s reference
page-class: add-section-toc tweak-listings
page-head: |
  <style>
    header a.link-reference {
      color: #3f96f0;
    }
  </style>
---


Programmer’s reference
======================

**Work in progress.  All available information is up-to-date.  Sections marked TODO will be expanded and clarified.**


Commands
--------

### `deploy`

> ---------------------|---
> Arguments:           | _`app? option*`_

Builds and deploys the specified application, restoring or building all dependencies as needed.

The application can be specified as:

- local directory path
- label—`name-version`
- _git_ URL

All options can be specified either on the command-line, or by setting environment variables.  Some options, such as [`HALCYON_SANDBOX_EXTRA_APPS`](/reference/#halcyon_sandbox_extra_apps), can also be specified by including _magic files_ in the `.halcyon-magic` subdirectory of the application source directory.

Command-line options take precedence over environment variables, which in turn take precedence over magic files.

If no application is specified or detected in the current directory, Halcyon restores or builds the environment only, retaining the GHC and Cabal layers.  To ignore any applications in the current directory, set [`HALCYON_NO_APP`](/reference/#halcyon_no_app) to `1`.

Otherwise, the GHC, Cabal, and sandbox layers are not retained.  To retain build-time dependencies without including them in the application install directory, set [`HALCYON_RETAIN_DEPENDENCIES`](/reference/#halcyon_retain_dependencies) to `1`.

For applications which require GHC to be available at runtime, include all layers in the application install directory by setting [`HALCYON_APP_EXTRA_COPY`](/reference/#halcyon_app_extra_copy) to `all`.

**TODO**


### `label`

> ---------------------|---
> Arguments:           | _`app? option*`_

Determines and outputs the label which would be used when deploying the specified application.

**TODO**



### `constraints`

> ---------------------|---
> Arguments:           | _`app? option*`_

Determines and outputs the constraints file which would be used when deploying the specified application.

**NOTE:**  Works around Cabal issue [#1908](https://github.com/haskell/cabal/issues/1908), hence, recommended over `cabal freeze`.

**TODO**


### `paths`

> ---------------------|---
> Arguments:           | _none_

Outputs a shell script which sets up the needed environment variables, based on [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir).

1. `HALCYON_TOP_DIR` is set to the path to the directory in which Halcyon is installed.

2. [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir) is set to `/app`, unless already set.

3. `PATH`, `LIBRARY_PATH`, `LD_LIBRARY_PATH` are extended to point into [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir).

4. `LANG` is set to `C.UTF-8`, unless already set.

**NOTE:**  Using a UTF-8 locale works around Cabal issue [#1883](https://github.com/haskell/cabal/issues/1883).


Environment variables
---------------------

### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Type:                | _git_ URL

URL of the _git_ repository from which Halcyon updates itself.

Uses the `master` branch.  Another branch may be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_SELFUPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`

Disables self-updates.


General options
---------------

### `HALCYON_APP_DIR`

> ---------------------|---
> Default value:       | `/app`
> Type:                | directory path
> Command-line option: | `--app-dir=`…

Directory in which Halcyon restores or builds layers.

Default value of [`HALCYON_PREFIX`](/reference/#halcyon_prefix).


### `HALCYON_PREFIX`

> ---------------------|---
> Default value:       | [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir)
> Type:                | directory path
> Command-line option: | `--prefix=`…

Directory in which Halcyon installs applications.

For example, if the application install directory consists of `bin/hello`, and [`HALCYON_PREFIX`](/reference/#halcyon_prefix) is set to `/app`, then the application will be installed as `/app/bin/hello`.


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Type:                | directory path
> Command-line option: | `--root=`…

Root of the path to the directory in which Halcyon installs applications.

Intended to support advanced packaging workflows.

For example, if the application install directory consists of `bin/hello`, [`HALCYON_PREFIX`](/reference/#halcyon_prefix) is set to `/app`, and [`HALCYON_ROOT`](/reference/#halcyon_root) is set to `/tmp/hello`, then the application will be configured to be installed as `/app/bin/hello`, and installed as `/tmp/hello/app/bin/hello`.


### `HALCYON_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--constraints=`…
> Standard file:       | `cabal.config`

Constraints file, in `cabal freeze` format, to override any `cabal.config` included in the application source directory.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional directory path
> Command-line option: | `--constraints-dir=`…

Directory containing a constraints file, in `cabal freeze` format, to override any `cabal.config` included in the application source directory.

The constraints file must be named _`name-version`_`.cabal.config`, matching the application name and version number.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated apps
> Command-line option: | `--extra-apps=`…
> Magic file path:     | `.halcyon-magic/extra-apps`

Additional Haskell applications to install together with the application, as runtime dependencies.

The applications may be specified as:

- local directory paths
- labels—`name-version`
- _git_ URLs


### `HALCYON_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional directory path
> Command-line option: | `--extra-apps-constraints-dir=`…
> Magic directory path:| `.halcyon-magic/extra-apps-constraints/`

Directory containing constraints files, in `cabal freeze` format, to override any `cabal.config` included in the source directories of applications specified with [`HALCYON_EXTRA_APPS`](/reference/#halcyon_extra_apps).

Each constraints file must be named _`name-version`_`.cabal.config`, matching one additional application name and version number.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--pre-install-hook=`…
> Magic file path:     | `.halcyon-magic/pre-install-hook`
> Arguments:           | _`tag source_dir install_dir root`_

Script to execute when installing the application, before running `cp -R`.


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--post-install-hook=`…
> Magic file path:     | `.halcyon-magic/post-install-hook`
> Arguments:           | _`tag source_dir install_dir root`_

Script to execute when installing the application, after running `cp -R`.


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-app`

Restores and builds the environment only.
Prevents Halcyon from deploying any application, instead forcing it to deploy the environment only.

Retains the GHC and Cabal layers.

The versions to deploy are specified by [`HALCYON_GHC_VERSION`](/reference/#halcyon_ghc_version) and [`HALCYON_CABAL_VERSION`](/reference/#halcyon_cabal_version).


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

### `HALCYON_CACHE_DIR`

> ---------------------|---
> Default value:       | `/var/tmp/halcyon-cache`
> Type:                | directory path
> Command-line option: | `--cache-dir=`…

Directory in which Halcyon caches recently used archives and constraints files.


### `HALCYON_PURGE_CACHE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--purge-cache`

Forces deleting the entire contents of the cache directory.


### `HALCYON_NO_ARCHIVE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-archive`

Prevents creating any archives in the cache directory.


### `HALCYON_NO_CLEAN_CACHE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-clean-cache`

Prevents deleting out-of-date archives from the cache directory.


Public storage options
----------------------

### `HALCYON_PUBLIC_STORAGE_URL`

> ---------------------|---
> Default value:       | [`https://s3.halcyon.sh`](https://s3.halcyon.sh/)
> Type:                | S3 URL
> Command-line option: | `--public-storage-url=`…

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

Specifying buckets in regions other than US Standard requires also specifying the appropriate [`HALCYON_S3_ENDPOINT`](/reference/#halcyon_s3_endpoint).


### `HALCYON_S3_ENDPOINT`

> ---------------------|---
> Default value:       | `s3.amazonaws.com`
> Type:                | hostname
> Command-line option: | `--s3-endpoint=`…

Hostname of the [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) responsible for [`HALCYON_S3_BUCKET`](/reference/#halcyon_s3_bucket).


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


### `HALCYON_GHC_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--ghc-pre-build-hook=`…
> Magic file path:     | `.halcyon-magic/ghc-pre-build-hook`
> Script arguments:    | _`tag source_dir ghc_dir`_

Script to execute when building the GHC layer, before installing GHC.


### `HALCYON_GHC_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--ghc-post-build-hook=`…
> Magic file path:     | `.halcyon-magic/ghc-post-build-hook`
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
> Magic file path:     | `.halcyon-magic/cabal-pre-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal layer, before bootstrapping _cabal-install_.


### `HALCYON_CABAL_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-post-build-hook=`…
> Magic file path:     | `.halcyon-magic/cabal-post-build-hook`
> Script arguments:    | _`tag source_dir cabal_dir`_

Script to execute when building the Cabal layer, after bootstrapping _cabal-install_.


### `HALCYON_CABAL_PRE_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-pre-update-hook=`…
> Magic file path:     | `.halcyon-magic/cabal-pre-update-hook`
> Script arguments:    | _none_

Script to execute when updating the Cabal layer, before running `cabal update`.


### `HALCYON_CABAL_POST_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--cabal-post-update-hook=`…
> Magic file path:     | `.halcyon-magic/cabal-post-update-hook`
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
> Magic file path:     | `.halcyon-magic/sandbox-sources`

Additional Cabal packages to make available for installation in the sandbox layer, as build-time dependencies, by running `cabal sandbox add-source`.

The packages may be specified as:

- local directory paths
- _git_ URLs


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated apps
> Command-line option: | `--sandbox-extra-apps=`…
> Magic file path:     | `.halcyon-magic/sandbox-extra-apps`

Additional Haskell applications to install in the sandbox layer, as build-time dependencies.

The applications may be specified as:

- local directory paths
- labels—`name-version`
- _git_ URLs

Intended to support easily installing Cabal `build-tools`, such as _alex_ or _happy_.

**NOTE:**  Works around Cabal issues [#220](https://github.com/haskell/cabal/issues/220) and [#779](https://github.com/haskell/cabal/issues/779).


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional directory path
> Command-line option: | `--sandbox-extra-apps-constraints-dir=`…
> Magic directory path:| `.halcyon-magic/sandbox-extra-apps-constraints/`

Directory containing constraints files, in `cabal freeze` format, to override any `cabal.config` included in the source directories of applications specified with [`HALCYON_SANDBOX_EXTRA_APPS`](/reference/#halcyon_sandbox_extra_apps).

Each constraints file must be named _`name-version`_`.cabal.config`, matching one additional application name and version number.

Intended to support easily declaring dependencies of any application which does not include a constraints file.


### `HALCYON_SANDBOX_EXTRA_LIBS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--sandbox-extra-libs=`…
> Magic file path:     | `.halcyon-magic/sandbox-extra-libs`

Additional native libraries to install in the sandbox layer, as build-time dependencies.

**TODO**


### `HALCYON_SANDBOX_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--sandbox-pre-build-hook=`…
> Magic file path:     | `.halcyon-magic/sandbox-pre-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox layer, before running `cabal install`.


### `HALCYON_SANDBOX_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--sandbox-post-build-hook=`…
> Magic file path:     | `.halcyon-magic/sandbox-post-build-hook`
> Script arguments:    | _`tag source_dir constraints`_

Script to execute when building the sandbox layer, after running `cabal install`.


### `HALCYON_SANDBOX_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--sandbox-rebuild`

Forces rebuilding the sandbox layer from scratch, which includes reinstalling all application build-time dependencies.


App options
-----------

### `HALCYON_APP_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--app-extra-configure-flags=`…
> Magic file path:     | `.halcyon-magic/app-extra-configure-flags`

Additional flags to specify when running `cabal configure`.


### `HALCYON_APP_EXTRA_COPY`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional `source` or `build` or `all`
> Command-line option: | `--app-extra-copy=`…
> Magic file path:     | `.halcyon-magic/app-extra-copy`

Additional items to include in the application install directory.

- `source`—Contents of the application source directory will be copied into [`HALCYON_PREFIX`](/reference/#halcyon_prefix).

- `build`—Contents of the application source and build directories will be copied into [`HALCYON_PREFIX`](/reference/#halcyon_prefix), in order.

- `all`—Contents of the application source and build directories will be copied into [`HALCYON_PREFIX`](/reference/#halcyon_prefix), in order, and all layers will be copied into [`HALCYON_APP_DIR`](/reference/#halcyon_app_dir).

Intended to support applications which do not or cannot declare all runtime dependencies.

Most files needed at runtime should be declared as `data-files` in the Cabal package description.  The option to include all layers should be used only for applications which require GHC to be available at runtime.


### `HALCYON_APP_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--app-pre-build-hook=`…
> Magic file path:     | `.halcyon-magic/app-pre-build-hook`
> Script arguments:    | _`tag source_dir build_dir`_

Script to execute when building the application, before running `cabal build`.


### `HALCYON_APP_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--app-post-build-hook=`…
> Magic file path:     | `.halcyon-magic/app-post-build-hook`
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
