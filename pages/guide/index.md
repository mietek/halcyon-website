---
title: User’s guide
page-class: add-section-toc
page-data:
  - key: max-section-toc-level
    value: 1
page-head: |
  <style>
    header a.link-guide {
      color: #3f96f0;
    }
  </style>
---


User’s guide
============

_Work in progress._


TL;DR
-----

1.  **Define a private S3 bucket** for [remote storage](#remote-storage).

2.  **Include a `cabal.config` file** in the application directory for [GHC version number](#ghc-version-numbers) and [sandbox constraints](#sandbox-constraints) inference.


Layers
------

The Halcyon core principle is minimising unnecessary work through use of prebuilt layers.

There are four types of layers:

1.  [GHC layers](#ghc-layers), which contain a complete installation of GHC.

2.  [Cabal layers](#cabal-layers), in two flavours:

    -   Cabal layers, only containing the `cabal-install` executable and configuration file.

    -   Updated Cabal layers, also containing an updated Cabal package database.

3.  [Sandbox layers](#sandbox-layers), built for a specific application, which contain—within a Cabal sandbox—all dependencies required to compile the application.

4.  [Application layers](#application-layers), which contain the application executable and all intermediate compilation products.


### Halcyon directory

All active layers are installed as subdirectories of the Halcyon directory, specified by the [`HALCYON_DIR`](reference/#halcyon_dir) environment variable, which defaults to `/app/.halcyon`.  Currently, only one layer of each type can be active in a single Halcyon directory.

Layers can be used together only if they were built using the same Halcyon directory path.

A `tag` file is included in every layer, declaring the path to the Halcyon directory, the host OS identifier, the layer type, and other layer-specific information.  The `tag` is validated every time an active layer is used or a layer archive is restored, to help ensure the consistency of a Halcyon installation.


### Cache directory

Halcyon downloads layer archives and other files to the cache directory, specified by the [`HALCYON_CACHE_DIR`](reference/#halcyon_cache_dir) environment variable, which defaults to `/var/tmp/halcyon/cache`.

The cache is cleaned after every installation, retaining only the most recently used archive of each layer type.

To delete the entire contents of the cache before installation, set [`HALCYON_PURGE_CACHE`](reference/#halcyon_purge_cache) to `1`.


### Remote storage

For Halcyon to operate as intended, it is important to **define a private S3 bucket.**

Halcyon is designed to accommodate machines with ephemeral storage, such as [Heroku](http://heroku.com/) dynos.  A private [Amazon S3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html), specified by the [`HALCYON_S3_BUCKET`](reference/#halcyon_s3_bucket) environment variable, serves as remote storage for layer archives and other files.

To define a new private S3 bucket:

1.  Set [`HALCYON_AWS_ACCESS_KEY_ID`](reference/#halcyon_aws_access_key) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](reference/#halcyon_aws_secret_access_key) to the appropriate values.

2.  Create a new bucket with an appropriate [S3 bucket name](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html).

    The [S3 management console](https://console.aws.amazon.com/s3/) can be used to create buckets.  It is also possible to use the [_bashmenot_ `s3_create`](http://bashmenot.mietek.io/reference/#s3_create) function:
    ```
    $ source halcyon/halcyon.sh
    $ s3_create foo.halcyon.sh private
           Creating s3://foo.halcyon.sh/... done
    ```

3.  Set [`HALCYON_S3_BUCKET`](reference/#halcyon_s3_bucket) to the name of the new bucket.

All files stored in the bucket are assigned an [S3 <abbr title="Access control list">ACL</abbr>](http://docs.aws.amazon.com/AmazonS3/latest/dev/S3_ACLs_UsingACLs.html), specified by [`HALCYON_S3_ACL`](reference/#halcyon_s3_acl), which defaults to `private`.


### Public layers

For the purposes of getting started quickly, it is also possible to use [public prebuilt layers](http://s3.halcyon.sh/), by not defining a private S3 bucket.  This is not recommended, as the set of available public layers may change at any time, and there is no guarantee all future public layer sets will remain compatible with any specific application.

As public sandbox layers cannot be perfectly matched to every application, some applications will require building layers on-the-fly.  This may not be optimal, as uploading layer archives is not possible without defining a private bucket, and therefore, if the machine storage is ephemeral, building the layers may need to be repeated in the future.  However, in other scenarios, preventing any layers built from leaving the machine may be acceptable or even desirable.

If a private bucket is defined, public layers are never used.  This helps maintain complete control over the deployed code.


### Installing layers

When performing an installation, if a required layer is not active, Halcyon will attempt to restore it:

1.  The [cache directory](#cache-directory) will be scanned to locate the required prebuilt layer archive.

2.  If needed, the archive will be downloaded from [remote storage](#remote-storage) and cached.

3.  Once located, the archive will be extracted to the appropriate subdirectory of the [Halcyon directory](#halcyon-directory).

If the required layer is not prebuilt, Halcyon will build it on-the-fly—either incrementally, if possible for the specific layer type, or from scratch.

To force building all required layers from scratch, set [`HALCYON_NO_PREBUILT`](reference/#halcyon_no_prebuilt) to `1`.

Conversely, to force the installation to abort unless all required layers are prebuilt, set [`HALCYON_PREBUILT_ONLY`](reference/#halcyon_prebuilt_only) to `1`.


### Building layers

Any layers built while performing an installation are archived, cached, and uploaded to remote storage, marked with the host OS identifier.

Any original files used while building are also uploaded to remote storage, in order to speed up future builds and decrease load on upstream servers.

To prevent archiving layers, set [`HALCYON_NO_ARCHIVE`](reference/#halcyon_no_archive) to `1`.  To prevent uploading files to remote storage, set [`HALCYON_NO_UPLOAD`](reference/#halcyon_no_upload) to `1`.


### Design rationale

Separating the environment required to compile an application into four types of layers is an attempt at striking a balance between the time spent compiling code, archiving compilation results, and transferring archives over the network.

Every non-application layer is archived using [<abbr title="Lempel-Ziv-Markov chain">LZMA</abbr>](http://en.wikipedia.org/wiki/Lempel–Ziv–Markov_chain_algorithm), which offers a better compression ratio than the default [<span class="small-caps">Deflate</span>](http://en.wikipedia.org/wiki/DEFLATE), but requires more time to compress.  All symbols not needed for relocation processing are stripped from all executables and libraries included in every non-application layer, to further decrease archive size.

Remote storage is necessary to support environments in which the machines used for compiling applications are separate from the machines used for building layers.

Storing layer archives remotely also allows unrelated applications to share common dependencies.  Sharing the same private S3 bucket between multiple applications requires no additional configuration beyond defining the same private bucket for every application.


GHC layers  { .layer }
----------
> Supported versions: `7.8.3`, `7.8.2`, `7.6.3`, `7.6.1`\
> Installation path:  _`HALCYON_DIR`_`/ghc`\
> Archive name:  `halcyon-ghc-`_`GHC_VERSION`_`.tar.xz`

Every GHC layer includes a complete installation of GHC, together with the default global [GHC package database](https://www.haskell.org/ghc/docs/latest/html/users_guide/packages.html#package-databases), which is never modified.  The user GHC package database is never used, as a [sandbox layer](#sandbox-layers) is used instead.

The name of a GHC layer archive references the version number of the included GHC.


### GHC version numbers

When installing a specific application, it is important to **include a `cabal.config` file** in the application directory, as otherwise, Halcyon will use the newest GHC version available.  This is not recommended, as there is no guarantee all future GHC versions will remain compatible with the application.

Halcyon can support most versions of GHC.  Currently, only recent releases are supported.

The required version of GHC is inferred from the `cabal.config` file, by examining the `base` package version number declared in the file.

To use a specific version of GHC, set [`HALCYON_FORCE_GHC_VERSION`](reference/#halcyon_force_ghc_version) to the required version number.


### Building GHC layers

If a prebuilt GHC layer with the required version cannot be located, Halcyon will build one from scratch, by installing the appropriate original GHC binary distribution.

To force building a GHC layer from scratch, set [`HALCYON_NO_PREBUILT_GHC`](reference/#halcyon_no_prebuilt_ghc) to `1`.


Cabal layers { .layer }
------------
> Supported versions:  `1.20.0.0` or newer\
> Installation path:  _`HALCYON_DIR`_`/cabal`\
> Archive name:  `halcyon-cabal-`_`CABAL_VERSION`_`.tar.xz`\
> Updated archive name:  `halcyon-cabal-`_`CABAL_VERSION`_`-`_`TIMESTAMP`_`.tar.xz`

There are two flavours of Cabal layers:

-   Every Cabal layer includes the `cabal-install` executable and configuration file.

-   Every updated Cabal layer also includes an updated Cabal package database.

The name of a Cabal layer archive references the version number of the included `cabal-install`.  The name of an updated Cabal layer archive also references a timestamp of the database update date and time.  This allows remotely locating an updated Cabal layer by scanning a list of file names.

The default Halcyon `cabal-install` configuration file specifies [Hackage](https://hackage.haskell.org/) as the remote Cabal package repository.  Currently, other repositories are not supported.


### `cabal-install` version numbers

Halcyon requires `cabal-install` `1.20.0.0` or newer, as the `freeze` command, needed for dependency control, was introduced in this version.

By default, Halcyon will use the newest `cabal-install` version available.

To use a specific version of `cabal-install`, set [`HALCYON_FORCE_CABAL_VERSION`](reference/#halcyon_force_cabal_version) to the required version number.


### Building Cabal layers

If no prebuilt updated Cabal layer with the required version can be located, Halcyon will build one incrementally, by installing the appropriate prebuilt Cabal layer and updating the Cabal package database.

A Cabal package database is considered to be updated for 24 hours after the update, in order to decrease load on upstream servers.

To force updating the database, set [`HALCYON_FORCE_CABAL_UPDATE`](reference/#halcyon_force_cabal_update) to `1`.

If a prebuilt Cabal layer with the required version cannot be located, Halcyon will build one from scratch, by bootstrapping the appropriate original `cabal-install` source distribution, using the active [GHC layer](#ghc-layers), the continue with building an updated Cabal layer.

To force building a Cabal layer from scratch, set [`HALCYON_NO_PREBUILT_CABAL`](reference/#halcyon_no_prebuilt_cabal) to `1`.

Bootstraping `cabal-install` `1.20.0.0` and newer requires GHC `7.8.2` or newer.


Sandbox layers { .layer }
--------------
> Installation path:  _`HALCYON_DIR`_`/sandbox`\
> Archive name:  `halcyon-sandbox-`_`GHC_VERSION`_`-`_`APP_NAME`_`-`_`APP_VERSION`_`-`_`SANDBOX_DIGEST`_`.tar.xz`\
> Configuration file name:  `halcyon-sandbox-`_`GHC_VERSION`_`-`_`APP_NAME`_`-`_`APP_VERSION`_-_`SANDBOX_DIGEST`_`.cabal.config`

Every sandbox layer is built for a specific application.  All dependencies required to compile the application are installed in a Cabal sandbox within the layer.

Each dependency is also declared as a name and version number constraint within the sandbox `cabal.config` file, which is kept both inside the sandbox layer and next to the sandbox layer archive.


### Sandbox constraints

When installing a specific application, it is important to **include a `cabal.config` file** in the application directory, as otherwise, Halcyon will use the newest version available of each dependency.  This is not recommended, as there is no guarantee all future versions of all dependencies will remain compatible with the application.

The name of a sandbox layer references the GHC version used to build the sandbox, the name and version number of the appropriate application, and a [<abbr title="Secure hash algorithm 1">SHA–1</abbr>](http://en.wikipedia.org/wiki/SHA-1) digest of the sandbox constraints.  This allows remotely locating a sandbox layer which is perfectly matched to a specific application by scanning a list of file names.

Like the [GHC version number](#ghc-version-numbers), the constraints used when installing a specific application are inferred from the `cabal.config` file.


### Building sandbox layers

If a perfectly matched prebuilt sandbox layer cannot be located, Halcyon will build it incrementally:

1.  All prebuilt sandbox layers will be matched to the required GHC and application version.

2.  A score will be assigned to every matched sandbox layer, reflecting the number of required dependencies contained within the layer.

3.  Sandbox layers containing any unneeded dependencies will be ignored, to ensure every sandbox built contains the absolute minimum number of dependencies.

4.  The highest-scoring matched sandbox layer will be selected as a base, and extended with the missing dependencies, using the active [GHC](#ghc-layers) and [Cabal](#cabal-layers) layers.

The resulting sandbox layer will be perfectly matched to the application, and will be ready sooner than a layer built from scratch.

If no matched prebuilt sandbox layer can be located, Halcyon will build a perfectly matched sandbox layer from scratch, by creating a new Cabal sandbox and installing all required dependencies, using the active [GHC](#ghc-layers) and [Cabal](#cabal-layers) layers.

To force building a sandbox layer from scratch, set [`HALCYON_NO_PREBUILT_SANDBOX`](reference/#halcyon_no_prebuilt_sandbox) to `1`.


Application layers { .layer }
------------------
> Installation path:  _`HALCYON_DIR`_`/app`\
> Archive name:  `halcyon-app-`_`GHC_VERSION`_`-`_`APP_NAME`_`-`_`APP_VERSION`_`.tar.gz`

As application source code is expected to change for every installation, application layers are treated differently than non-application layers.

TODO

To force building an application layer from scratch, set [`HALCYON_NO_PREBUILT_APP`](reference/#halcyon_no_prebuilt_app) to `1`.
