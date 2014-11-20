---
title: User’s reference
page-class: add-section-toc tweak-listings
page-head: |
  <style>
    header a.link-options {
      color: #3f96f0;
    }
  </style>
---


User’s reference
================

_Work in progress._


Commands
--------

### `deploy`

> ---------------------|---
> Arguments:           | _`app option*`_

**TODO**


### `label`

> ---------------------|---
> Arguments:           | _`app option*`_

**TODO**


### `constraints`

> ---------------------|---
> Arguments:           | _`app option*`_

**TODO**


### `tag`

> ---------------------|---
> Arguments:           | _`app option*`_

**TODO**


### `paths`

> ---------------------|---
> Arguments:           | _none_

**TODO**


Self-update options
-------------------

### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Type:                | _git_ URL
> Command-line option: | _none_

URL of the _git_ repository used for self-updates.

Defaults to the `master` branch.  Another branch may be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | _none_

Disables self-updates.


General options
---------------

### `HALCYON_APP_DIR`

> ---------------------|---
> Default value:       | `/app`
> Type:                | directory path
> Command-line option: | `--app-dir=`…

**TODO**


### `HALCYON_PREFIX`

> ---------------------|---
> Default value:       | `/app`
> Type:                | directory path
> Command-line option: | `--prefix=`…

**TODO**


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Type:                | directory path
> Command-line option: | `--root=`…

**TODO**


### `HALCYON_CONSTRAINTS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--constraints=`…
> Standard file:       | `cabal.config`

**TODO**


### `HALCYON_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional directory path
> Command-line option: | `--constraints-dir=`…

**TODO**


### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated labels or directory paths or _git_ URLs
> Command-line option: | `--extra-apps=`…
> Magic file path:     | `.halcyon-magic/extra-apps`

**TODO**


### `HALCYON_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional directory path
> Command-line option: | `--extra-apps-constraints-dir=`…
> Magic directory path:| `.halcyon-magic/extra-apps-constraints/`

**TODO**


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--pre-install-hook=`…
> Magic file path:     | `.halcyon-magic/pre-install-hook`

**TODO**


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional file path
> Command-line option: | `--post-install-hook=`…
> Magic file path:     | `.halcyon-magic/post-install-hook`

**TODO**


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-app`

**TODO**


### `HALCYON_NO_BUILD`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build`

**TODO**


### `HALCYON_NO_BUILD_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-build-dependencies`

**TODO**


Cache options
-------------

### `HALCYON_CACHE_DIR`

> ---------------------|---
> Default value:       | `/var/tmp/halcyon-cache`
> Type:                | directory path
> Command-line option: | `--cache-dir=`…

**TODO**


### `HALCYON_PURGE_CACHE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--purge-cache`

**TODO**


### `HALCYON_NO_ARCHIVE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-archive`

**TODO**


### `HALCYON_NO_CLEAN_CACHE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-clean-cache`

**TODO**


Public storage options
----------------------

### `HALCYON_PUBLIC_STORAGE_URL`

> ---------------------|---
> Default value:       | `https://s3.halcyon.sh`
> Type:                | S3 URL
> Command-line option: | `--public-storage-url=`…

**TODO**


### `HALCYON_NO_PUBLIC_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-public-storage`

**TODO**


Private storage options
-----------------------

### `HALCYON_AWS_ACCESS_KEY_ID`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional string
> Command-line option: | `--aws-access-key-id=`…

Identifier used to authenticate S3 requests.


### `HALCYON_AWS_SECRET_ACCESS_KEY`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional string
> Command-line option: | `--aws-secret-access-key=`…

Secret used to authenticate S3 requests.


### `HALCYON_S3_BUCKET`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional S3 bucket name
> Command-line option: | `--s3-bucket=`…

Name of the S3 bucket used for private storage.


### `HALCYON_S3_ENDPOINT`

> ---------------------|---
> Default value:       | `s3.amazonaws.com`
> Type:                | hostname
> Command-line option: | `--s3-endpoint=`…

Hostname of the [region-specific S3 endpoint](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) responsible for the specified S3 bucket.


### `HALCYON_S3_ACL`

> ---------------------|---
> Default value:       | `private`
> Type:                | `private` or `public-read`
> Command-line option: | `--s3-acl=`…

S3 access control list assigned to all files uploaded to private storage.


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

Disables uploading files to private storage.


### `HALCYON_NO_CLEAN_PRIVATE_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--no-clean-private-storage`

Disables deleting out-of-date files from private storage.


GHC layer options
-----------------

### `HALCYON_GHC_VERSION`

> ---------------------|---
> Default value:       | `7.8.3`
> Type:                | version number
> Command-line option: | `--ghc-version=`…

Version of GHC to use when deploying an environment, or when no constraints are specified.


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

Forces rebuilding the GHC layer from scratch.


Cabal layer options
-------------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | `1.20.0.3`
> Type:                | version number
> Command-line option: | `--cabal-version=`…

Version of _cabal-install_ to use.


### `HALCYON_CABAL_REPO`

> ---------------------|---
> Default value:       | `Hackage:http://hackage.haskell.org/packages/archive`
> Type:                | colon-separated name and URL
> Command-line option: | `--cabal-repo=`…

Name and URL of the Cabal repository, in the same format as the `remote-repo` field of a `cabal.config` file.


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

Forces rebuilding the Cabal layer from scratch.


### `HALCYON_CABAL_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--cabal-update`

Forces updating the Cabal layer.


Sandbox layer options
---------------------

### `HALCYON_SANDBOX_SOURCES`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated directory paths or _git_ URLs
> Command-line option: | `--sandbox-sources=`…
> Magic file path:     | `.halcyon-magic/sandbox-sources`

Additional Cabal packages to make available by running `cabal sandbox add-source`.


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated labels or directory paths or _git_ URLs
> Command-line option: | `--sandbox-extra-apps=`…
> Magic file path:     | `.halcyon-magic/sandbox-extra-apps`

Additional Haskell applications to install in the sandbox layer, as build-time dependencies.

- labels—Cabal package `name-version` pairs
- directory paths
- _git_ URLs


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional directory path
> Command-line option: | `--sandbox-extra-apps-constraints-dir=`…
> Magic directory path:| `.halcyon-magic/sandbox-extra-apps-constraints/`

Directory containing optional constraints files for applications specified with [`HALCYON_SANDBOX_EXTRA_APPS`](#halcyon_sandbox_extra_apps).

Each constraints file must be named _`name-version`_`.cabal.config`.


### `HALCYON_SANDBOX_EXTRA_LIBS`

> ---------------------|---
> Default value:       | _none_
> Type:                | optional whitespace-separated strings
> Command-line option: | `--sandbox-extra-libs=`…
> Magic file path:     | `.halcyon-magic/sandbox-extra-libs`

Additional native libraries to install in the sandbox layer, as build-time dependencies.


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

Forces rebuilding the sandbox layer from scratch.


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

- `source`—the application source directory
- `build`—the application source and build directories
- `all`—the application source and build directories, and all layers

**Note:**  Including all layers will cause the application install directory to be very large.


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

Forces rebuilding the app from scratch.


### `HALCYON_APP_RECONFIGURE`

> ---------------------|---
> Default value:       | `0`
> Type:                | `0` or `1`
> Command-line option: | `--app-reconfigure`

Forces rerunning `cabal configure`.
