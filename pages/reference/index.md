---
title: Programmer’s reference
page-class: add-section-toc
page-head: |
  <style>
    header a.link-reference {
      color: #3f96f0;
    }
  </style>
---


Programmer’s reference
======================

_Work in progress._


Usage
-----

```
$ git clone https://github.com/mietek/halcyon ~/halcyon
$ source <( ~/halcyon/halcyon paths )
$ halcyon deploy
```

Executing the top-level [`halcyon`](https://github.com/mietek/halcyon/blob/master/halcyon) script automatically updates Halcyon to the newest version available.

To disable automatic updates, set [`HALCYON_NO_AUTOUPDATE`](#halcyon_no_autoupdate) to `1`.

The top-level [`src.sh`](https://github.com/mietek/halcyon/blob/master/src.sh) file can also be sourced to bring all functions into scope.


Commands
--------

### `deploy`

> ---------------------|---
> Arguments:           | _`app* option*`_

TODO


### `app-label`

> ---------------------|---
> Arguments:           | _`app* option*`_

TODO


### `constraints`

> ---------------------|---
> Arguments:           | _`app* option*`_

TODO


### `tag`

> ---------------------|---
> Arguments:           | _`app* option*`_

TODO


### `paths`

> ---------------------|---
> Arguments:           | _none_

TODO


Automatic update options
------------------------

### `HALCYON_URL`

> ---------------------|---
> Default value:       | [`https://github.com/mietek/halcyon`](https://github.com/mietek/halcyon)
> Command-line option: | _none_

_git_ repository used for automatic updates.

Defaults to the `master` branch.  Another branch may be specified with a `#`_`branch`_ suffix.


### `HALCYON_NO_AUTOUPDATE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | _none_

Disables automatic updates.


General options
---------------

### `HALCYON_DIR`

> ---------------------|---
> Default value:       | `/app/.halcyon`
> Command-line option: | `--halcyon-dir=`_`path`_

TODO


### `HALCYON_INSTALL_DIR`

> ---------------------|---
> Default value:       | `/`
> Command-line option: | `--install-dir=`_`path`_

TODO


### `HALCYON_TARGET`

> ---------------------|---
> Default value:       | `slug`
> Command-line option: | `--target=slug` or `--target=sandbox`

TODO


### `HALCYON_ONLY_DEPLOY_ENV`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--only-deploy-env`

TODO


### `HALCYON_NO_COPY_LOCAL_SOURCE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-copy-local-source`

TODO: Make internal?


### `HALCYON_NO_BUILD_DEPENDENCIES`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-build-dependencies`

TODO


### `HALCYON_NO_ARCHIVE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-archive`

TODO


### `HALCYON_NO_UPLOAD`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-upload`

TODO


### `HALCYON_NO_DELETE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-delete`

TODO


Public storage options
----------------------

### `HALCYON_PUBLIC_STORAGE_HOST`

> ---------------------|---
> Default value:       | `cdn.halcyon.sh`
> Command-line option: | `--public-storage-host=`_`string`_

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

S3 server address.


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


### `HALCYON_NO_CACHE`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-cache`

TODO


GHC layer options
-----------------

### `HALCYON_GHC_VERSION`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--ghc-version=`_`string`_

TODO


### `HALCYON_GHC_MAGIC_HASH`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--ghc-magic-hash=`_`string`_

TODO: Make internal?


Cabal layer options
-------------------

### `HALCYON_CABAL_VERSION`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-version=`_`string`_

TODO


### `HALCYON_CABAL_MAGIC_HASH`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-magic-hash=`_`string`_

TODO: Make internal?


### `HALCYON_CABAL_REPO`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--cabal-repo=`_`string`_

TODO


Non-recursive general options
-----------------------------

### `HALCYON_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--constraints-dir=`_`path`_

TODO


### `HALCYON_FORCE_RESTORE_ALL`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-restore-all`

TODO


### `HALCYON_NO_ANNOUNCE_DEPLOY`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--no-announce-deploy`

TODO: Make internal?


Non-recursive GHC layer options
-------------------------------

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


### `HALCYON_FORCE_BUILD_GHC`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-build-ghc`

TODO


Non-recursive Cabal layer options
---------------------------------

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


### `HALCYON_FORCE_BUILD_CABAL`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-build-cabal`

TODO


### `HALCYON_FORCE_UPDATE_CABAL`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-update-cabal`

TODO


Non-recursive sandbox layer options
-----------------------------------

### `HALCYON_SANDBOX_EXTRA_LIBS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-extra-libs=`_`strings`_

TODO

### `HALCYON_SANDBOX_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-extra-apps=`_`strings`_

TODO


### `HALCYON_SANDBOX_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--sandbox-extra-apps-constraints-dir=`_`path`_

TODO: Rename to `EXTRA_CONSTRAINTS`?


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


### `HALCYON_FORCE_BUILD_SANDBOX`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-build-sandbox`

TODO


Non-recursive application layer options
---------------------------------------


### `HALCYON_APP_EXTRA_CONFIGURE_FLAGS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--app-extra-configure-flags=`_`string`_

TODO


### `HALCYON_APP_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--app-pre-build-hook=`_`path`_

TODO


### `HALCYON_APP_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--app-post-build-hook=`_`path`_

TODO


### `HALCYON_FORCE_BUILD_APP`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-build-app`

TODO


Non-recursive slug options
--------------------------


### `HALCYON_SLUG_EXTRA_APPS`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--slug-extra-apps=`_`strings`_

TODO


### `HALCYON_SLUG_EXTRA_APPS_CONSTRAINTS_DIR`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--slug-extra-apps-constraints-dir=`_`path`_

TODO: Rename to `EXTRA_CONSTRAINTS`?


### `HALCYON_SLUG_PRE_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--slug-pre-build-hook=`_`path`_

TODO


### `HALCYON_SLUG_POST_BUILD_HOOK`

> ---------------------|---
> Default value:       | _none_
> Command-line option: | `--slug-post-build-hook=`_`path`_

TODO


### `HALCYON_FORCE_BUILD_SLUG`

> ---------------------|---
> Default value:       | `0`
> Command-line option: | `--force-build-slug`

TODO
