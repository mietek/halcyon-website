---
title: Docs
---


Docs
====

Work in progress.

- [Public prebuilt packages](docs/public-prebuilt-packages/)
- [Internals](docs/internals/)
- [bashmenot reference](docs/bashmenot-reference/)


On buckets
----------

Halcyon is designed to accomodate machines with ephemeral storage, such as Heroku dynos.  A private Amazon S3 bucket, defined by the `HALCYON_S3_BUCKET` environment variable, serves as permanent storage for prebuilt packages.

There are three modes of operation:

1.  If the bucket is not available, Halcyon falls back to using [public prebuilt packages](docs/public-prebuilt-packages/).  These packages may not contain all required dependencies, in which case Halcyon will build any packages necessary on-the-fly.  This may not be desired, as the work will need to be repeated in the future, if the storage is ephemeral and the machine is turned off.  However, this may be perfectly acceptable on another type of machine.

2.  Similarly, if the bucket is defined, but uploading to it is not allowed—either by an S3 policy, or by setting `HALCYON_NO_UPLOAD` to `1`—Halcyon only uses the packages which already exist in the bucket.  Public packages are not used in this case.

3.  With full access to the bucket, Halcyon will build any packages necessary on-the-fly, and archive the build results in the bucket for later reuse.  This is the optimal scenario.

Access to the bucket is controlled by defining the `HALCYON_AWS_ACCESS_KEY_ID` and `HALCYON_AWS_SECRET_ACCESS_KEY` configuration variables.
