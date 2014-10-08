---
title: Documentation
page-class: add-section-toc
page-data:
  - key: max-section-toc-level
    value: 1
page-head: |
  <style>
    header a.link-documentation {
      color: #3f96f0;
    }
  </style>
---


Documentation
=============

_Halcyon_ user guide.

Detailed technical information is available in the [_Halcyon_ reference](documentation/reference/).

Work in progress.  Please report any problems with the documentation on the [_halcyon-website_ issue tracker](https://github.com/mietek/halcyon-website/issues/).

> Contents:




Packages
--------

_Halcyon_ is a general-purpose system for rapid deployment of Haskell environments, designed to be fast, efficient, and flexible.

From maintaing multiple compilation environments on a development workstation, to lazily spinning up worker machines on a cloud application platform—_Halcyon_ is intended to help with most tasks involving the compilation of Haskell code.

The _Halcyon_ core principle is minimising unnecessary work through use of prebuilt packages.


### Package tiers

Please be mindful of the many meanings of the term _package_.  In this documentation, the term _package_ always refers to one of the following four tiers of entities:

1.  _GHC packages_, which contain a live installation of GHC, archived to:\
    `halcyon-ghc-`_`ghcVersion`_`.tar.xz`

2.  _Cabal packages_, in two flavours:

    -   _Non-updated Cabal packages_, containing only the `cabal-install` executable and configuration file, archived to:\
        `halcyon-cabal-`_`cabalVersion`_`.tar.xz`
    
    -   _Updated Cabal packages_, containing also an updated Cabal database, archived to:\
        `halcyon-cabal-`_`cabalVersion`_`-`_`updateTimestamp`_`.tar.xz`

3.  _Sandbox packages_, which contain a live sandbox, including all dependencies required to compile a specific app, archived to:\
    `halcyon-sandbox-`_`ghcVersion`_`-`_`appName`_`-`_`appVersion`_-_`sandboxDigest`_`.tar.gz`

4.  _App packages_, which contain a live app executable, including all intermediate build products, archived to:\
    `halcyon-app-`_`ghcVersion`_`-`_`appName`_`-`_`appVersion`_`.tar.gz`

All packages include a `tag` file in their top-level directory, declaring the tier and contents of the package, the identifier of the targeted OS, and the root path of the installation.  The root path is defined by [`HALCYON_DIR`](documentation/reference/#halcyon_dir), which defaults to `/app/.halcyon`.


### Sandbox packages

Special consideration is due to sandbox packages.  Every sandbox package includes a `cabal.config` file, which declares a set of constraints—the names and version numbers of all included dependencies.  A [SHA–1](http://en.wikipedia.org/wiki/SHA-1) digest of these constraints is embedded in the name of the package.  This allows efficiently locating a sandbox which perfectly matches all required dependencies—by scanning a list of file names.

A copy of the `cabal.config` file is also kept next to the archived sandbox package:\
`halcyon-sandbox-`_`ghcVersion`_`-`_`appName`_`-`_`appVersion`_-_`sandboxDigest`_`.cabal.config`

If a perfectly matched sandbox cannot be located, each available configuration file is scanned and scored.  Files including any extraneous constraints are ignored.  The sandbox containing the best scoring set of constraints is selected as a base, copied, and extended with the missing packages.  The resulting sandbox will match the required dependencies perfectly, without needing to be built from scratch.


### Rationale

Separating the dependencies required to compile an app into four tiers is an attempt at striking a balance between the time spent compiling code, archiving compilation results, and transferring archives over the network. 

The four-tiered design allows mixing-and-matching GHC and Cabal versions, updating the Cabal database incrementally or from scratch, and building new sandboxes based on existing sandboxes.  This flexibility enables aiming for efficiency at every step—for example:

-   The sandbox scoring process accepts only sandboxes which include a strict subset of the required dependencies.  This ensures every sandbox built contains the minimum necessary amount of data.

-   As GHC packages are expected not to change often, they are archived using the slower LZMA algorithm, while the faster <span class="small-caps">Deflate</span> is used for app packages, which change on every deploy.




Building packages
-----------------

_Halcyon_ is designed to accommodate machines with ephemeral storage, such as Heroku dynos.  A private Amazon S3 bucket, defined by the [`HALCYON_S3_BUCKET`](documentation/reference/#halcyon_s3_bucket) environment variable, is intended to serve as permanent storage for packages.

All packages required for compilation are downloaded from the private bucket.  If a required package is not found while attempting to deploy an app, the package will be built on-the-fly, and compilation will proceed without issue.

Any built packages are archived and uploaded to the private S3 bucket, prefixed with an appropriate OS identifier.  The original files used for the build are also uploaded to the private bucket, in order to decrease the overall load on upstream servers.  All uploaded files are assigned an [S3 ACL](http://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html), defined by [`HALCYON_S3_ACL`](documentation/reference/#halcyon_s3_acl), which defaults to `private`.

Access to the private bucket is controlled by setting [`HALCYON_AWS_ACCESS_KEY_ID`](documentation/reference/#halcyon_aws_access_key) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](documentation/reference/#halcyon_aws_secret_access_key).


### Public packages

For the purposes of getting started quickly, it is also possible to use [public packages](http://s3.halcyon.sh/), by not defining a private bucket.  This is not recommended for production usage, as the set of available public packages may change at any time.

Additionally, as public packages cannot match all dependencies required to compile every app, some apps will require building packages on-the-fly.  This may not be optimal, as uploading packages is not possible without defining a private bucket.  Hence, if the machine storage is ephemeral, the work may need to be repeated in the future.  However, for other scenarios, preventing any built packages from leaving the machine may be acceptable or even desirable.

If a private bucket is defined, public packages are never used.  This helps maintain complete control over the deployed code.


### Rationale

A private bucket is necessary to support environments in which the machines used for compiling apps are separate from the machines used for building packages.  Some form of external storage must be used to transfer the packages between the machines, and an Amazon S3 bucket is a good solution to this problem.

Storing packages externally also allows unrelated apps to share common dependencies.  Sharing the same private bucket between multiple apps requires no additional configuration beyond defining the same private bucket for every app.  This is the same method by which public packages are made available.




Caching packages
----------------

_Halcyon_ downloads all packages to a cache directory, defined by the [`HALCYON_CACHE_DIR`](documentation/reference/#halcyon_cache_dir) environment variable, which defaults to `/var/tmp/halcyon/cache`.

The cache is automatically cleaned after every deployment, retaining only the most recently used packages.

Deleting the contents of the cache before deployment can be requested by setting [`HALCYON_PURGE_CACHE`](documentation/reference/#halcyon_purge_cache) to `1`.  Please note the variable needs to be unset after use.




---

_To be continued…_
