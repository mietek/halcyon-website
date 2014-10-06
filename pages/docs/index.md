---
title: Docs
---


Docs
====

Work in progress.

- [Public prebuilt packages](docs/public-prebuilt-packages/)
- [Reference](docs/reference/)
- [Library reference](docs/library-reference/)


On buckets
----------

Halcyon is designed to accomodate machines with ephemeral storage, such as Heroku dynos.  A private Amazon S3 bucket, defined by the [`HALCYON_S3_BUCKET`](docs/reference/#halcyon_s3_bucket) environment variable, serves as permanent storage for prebuilt packages.

There are three modes of operation:

1.  If the bucket is not available, Halcyon will only use [public prebuilt packages](docs/public-prebuilt-packages/).  As these packages cannot contain all dependencies required to compile every package, Halcyon will build additional packages during installation.  This mode may not be desirable, as the work may need to be repeated in the future, should the ephemeral storage be lost.

2.  Similarly, if the bucket is available, but uploading to it is not allowed—either by an S3 policy, or by setting [`HALCYON_NO_UPLOAD`](docs/reference/#halcyon_no_upload) to `1`—Halcyon will only use the packages which already exist in the bucket.

3.  Finally, if the bucket is available, and uploading to it is allowed, Halcyon will archive any built packages in the bucket for later reuse.  This is the optimal mode.

Access to the bucket is controlled by setting the [`HALCYON_AWS_ACCESS_KEY_ID`](docs/reference/#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](docs/reference/#halcyon_aws_secret_access_key) configuration variables.
