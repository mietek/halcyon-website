---
title: Option reference
page-class: add-section-toc tweak-listings
page-head: |
  <style>
    header a.link-options {
      color: #3f96f0;
    }
  </style>
---


Option reference
================


Automatic update options
------------------------

### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Command-line option: | _none_

URL of the _git_ repository used for automatic updates.

Defaults to the `master` branch.  Another branch may be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_AUTOUPDATE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | _none_

Disables automatic updates.


General options
---------------

### `HALCYON_APP_DIR`

> ---------------------|---
> Default value:       | `/app`
> Command-line option: | `--app-dir=`_`path`_

TODO


### `HALCYON_PREFIX`

> ---------------------|---
> Default value:       | `/app`
> Command-line option: | `--prefix=`_`path`_

TODO


### `HALCYON_ROOT`

> ---------------------|---
> Default value:       | `/`
> Command-line option: | `--root=`_`path`_

TODO


### `HALCYON_NO_APP`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-app`

TODO


### `HALCYON_NO_BUILD_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-build-dependencies`

TODO


### `HALCYON_NO_BUILD_ANY`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-build-any`

TODO


### `HALCYON_NO_ARCHIVE_ANY`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-archive-any`

TODO


### `HALCYON_NO_UPLOAD_ANY`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-upload-any`

TODO


### `HALCYON_NO_DELETE_ANY`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-delete-any`

TODO


Public storage options
----------------------

### `HALCYON_PUBLIC_STORAGE_URL`

> ---------------------|---
> Default value:       | `https://halcyon.global.ssl.fastly.net`
> Command-line option: | `--public-storage-url=`_`string`_

TODO


### `HALCYON_NO_PUBLIC_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-public-storage`

TODO


Private storage options
-----------------------

### `HALCYON_AWS_ACCESS_KEY_ID`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--aws-access-key-id=`_`string`_

Identifier used to authenticate S3 requests.


### `HALCYON_AWS_SECRET_ACCESS_KEY`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--aws-secret-access-key=`_`string`_

Secret used to authenticate S3 requests.


### `HALCYON_S3_BUCKET`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--s3-bucket=`_`string`_

TODO


### `HALCYON_S3_ACL`

> ---------------------|---
> Default value:       | `private`
> Command-line option: | `--s3-acl=`_`string`_

TODO


### `HALCYON_S3_HOST`

> ---------------------|---
> Default value:       | `s3.amazonaws.com`
> Command-line option: | `--s3-host=`_`string`_

Address used to direct S3 requests.


### `HALCYON_NO_PRIVATE_STORAGE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-private-storage`

TODO


Cache options
-------------


### `HALCYON_CACHE_DIR`

> ---------------------|---
> Default value:       | `/var/tmp/halcyon-cache`
> Command-line option: | `--cache-dir=`_`path`_

TODO


### `HALCYON_PURGE_CACHE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--purge-cache`

TODO


### `HALCYON_NO_CLEAN_CACHE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-clean-cache`

TODO


GHC layer options
-----------------

### `HALCYON_GHC_VERSION`

> ---------------------|---
> Default value:       | `7.8.3`
> Command-line option: | `--ghc-version=`_`string`_

TODO


### `HALCYON_GHC_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--ghc-pre-build-hook=`_`path`_

TODO


### `HALCYON_GHC_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--ghc-post-build-hook=`_`path`_

TODO


### `HALCYON_GHC_CLEAN_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--ghc-clean-rebuild`

TODO


Cabal layer options
-------------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | `1.20.0.3`
> Command-line option: | `--cabal-version=`_`string`_

TODO


### `HALCYON_CABAL_REPO`

> ---------------------|---
> Default value:       | `Hackage:http://hackage.haskell.org/packages/archive`
> Command-line option: | `--cabal-repo=`_`string`_

TODO


### `HALCYON_CABAL_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-pre-build-hook=`_`path`_

TODO


### `HALCYON_CABAL_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-post-build-hook=`_`path`_

TODO


### `HALCYON_CABAL_PRE_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-pre-update-hook=`_`path`_

TODO


### `HALCYON_CABAL_POST_UPDATE_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-post-update-hook=`_`path`_

TODO


### `HALCYON_CABAL_CLEAN_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--cabal-clean-rebuild`

TODO


### `HALCYON_CABAL_UPDATE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--cabal-update`

TODO


Sandbox layer options
---------------------

### `HALCYON_SANDBOX_SOURCES`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-sources=`_`string`_

TODO


### `HALCYON_SANDBOX_EXTRA_LIBS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-extra-libs=`_`string`_

TODO


### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-extra-apps=`_`string`_

TODO


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-extra-apps-constraints-dir=`_`path`_

TODO


### `HALCYON_SANDBOX_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-pre-build-hook=`_`path`_

TODO


### `HALCYON_SANDBOX_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-post-build-hook=`_`path`_

TODO


### `HALCYON_SANDBOX_CLEAN_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--sandbox-clean-rebuild`

TODO


App options
-----------

### `HALCYON_CONSTRAINTS_FILE`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--constraints-file=`_`path`_

TODO


### `HALCYON_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--constraints-dir=`_`path`_

TODO


### `HALCYON_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--extra-configure-flags=`_`string`_

TODO


### `HALCYON_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--extra-apps=`_`string`_

TODO


### `HALCYON_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--extra-apps-constraints-dir=`_`path`_

TODO


### `HALCYON_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--pre-build-hook=`_`path`_

TODO


### `HALCYON_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--post-build-hook=`_`path`_

TODO


### `HALCYON_PRE_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--pre-install-hook=`_`path`_

TODO


### `HALCYON_POST_INSTALL_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--post-install-hook=`_`path`_

TODO


### `HALCYON_RECONFIGURE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--reconfigure`

TODO


### `HALCYON_CLEAN_REBUILD`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--clean-rebuild`

TODO
