---
title: Guide
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


Guide
=====

The _Halcyon_ user manual.

Detailed technical information is available in the [_Halcyon_ reference](documentation/reference/).

Work in progress.  Please report any problems with the documentation on the [_halcyon-website_ issue tracker](https://github.com/mietek/halcyon-website/issues/).

> Contents:




Buckets
-------

_Halcyon_ is designed to accommodate machines with ephemeral storage, such as Heroku dynos.  A private Amazon S3 bucket, defined by the [`HALCYON_S3_BUCKET`](documentation/reference/#halcyon_s3_bucket) environment variable, is intended to serve as permanent storage for prebuilt packages.

`s3.halcyon.sh` is the default public S3 bucket, provided in order to facilitate getting started, and as a fallback measure.  Using the public bucket for production purposes is not recommended, as the list of available prebuilt packages may change at any time.


### Bucket usage

_Halcyon_ can use buckets in one of three ways:

1.  If a private bucket is not available, _Halcyon_ will only use packages from the default public bucket.  As these packages cannot contain all potentially required dependencies, _Halcyon_ may build additional packages during installation.  This mode is not optimal, as the work may need to be repeated in the future, if the machine storage is ephemeral.

2.  Similarly, if a private bucket is available, but uploading to it is not allowed—either by an S3 policy, or by setting [`HALCYON_NO_UPLOAD`](documentation/reference/#halcyon_no_upload) to `1`—_Halcyon_ will only use the packages which already exist in the bucket.  Public packages are not used in this mode.

3.  Finally, if a private bucket is available, and uploading to it is allowed, _Halcyon_ will archive any built packages in the bucket for later reuse.  All uploaded files will be assigned an ACL, defined by [`HALCYON_S3_ACL`](documentation/reference/#halcyon_s3_acl).  This is the optimal mode.

Access to the private bucket is controlled by setting the [`HALCYON_AWS_ACCESS_KEY_ID`](documentation/reference/#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](documentation/reference/#halcyon_aws_secret_access_key) configuration variables.


### Bucket organisation

Bucket contents can be examined using [`s3_list`](documentation/library-reference/#s3_list) and [`s3_download`](documentation/library-reference/#s3_download).

All prebuilt packages are kept in the bucket with the relevant OS identifier as the prefix.
```
$ s3_list s3.halcyon.sh linux-ubuntu-14-04-x64
       Listing s3://s3.halcyon.sh/?prefix=linux-ubuntu-14-04-x64... done
linux-ubuntu-14-04-x64/halcyon-cabal-1.20.0.3.tar.xz
linux-ubuntu-14-04-x64/halcyon-ghc-7.6.3.tar.xz
linux-ubuntu-14-04-x64/halcyon-ghc-7.8.3.tar.xz
```

All original files are also kept in the bucket, to decrease the load on upstream servers.
```
$ s3_list s3.halcyon.sh original
       Listing s3://s3.halcyon.sh/?prefix=original... done
original/cabal-install-1.20.0.3.tar.gz
original/ghc-7.6.3-x86_64-unknown-linux.tar.bz2
original/ghc-7.8.3-x86_64-unknown-linux-centos65.tar.xz
original/ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
```




Caching
-------

_Halcyon_ downloads all files to a cache directory, defined by [`HALCYON_CACHE_DIR`](documentation/reference/#halcyon_cache_dir).

The cache is automatically cleaned after every installation, retaining only the most recently used archives.




Constraints
-----------

A constraint consists of a package name and version.  A file of constraints consists of any number of constraints separated by newlines.

Constraints are kept in `cabal.config` files.  The canonical format of these files is defined to match the output of `cabal freeze`.




---

_To be continued._
