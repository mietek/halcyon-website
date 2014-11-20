---
title: Setting up separate build and deploy machines
page-class: add-main-toc tweak-listings
page-data:
- key: max-section-toc-level
  value: 1
---


Setting up separate build and deploy machines
=============================================

These instructions explain how to set up a number of machines with Halcyon, so that Haskell programs can be built on one and deployed on all of them.

<nav id="main-toc"></nav>


TLDR
----

Set up a number of Ubuntu 14.04 LTS (64-bit) [build machines](how-to-set-up-a-build-machine/), and configure each to use the same [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html) bucket.

```
# export HALCYON_AWS_ACCESS_KEY_ID=...
# export HALCYON_AWS_SECRET_ACCESS_KEY=...
# export HALCYON_S3_BUCKET=...
```

Done!  Read on for details.


Machines
--------

**_Step 1 of 2:_**  Provision as many machines as you need, including a dedicated build machine with 8GB RAM.

Set up all machines in the same way, following the [build machine](how-to-set-up-a-build-machine/) setup instructions.


### Build and deploy

The only difference between build and deploy machines is their purpose, which follows from their capabilities.

Halcyon is designed to deploy applications by automatically building everything on the fly, as needed.  If there is no need to build anything, deployment consists of restoring a single application install archive.  This should not consume any significant machine resources, and is expected to finish in under 10 seconds.

On the other hand, you should not expect any non-trivial Haskell application to build successfully on a machine with 512MB RAM.  However, deploying many applications on the same machine should work perfectly well.


Private storage
---------------

**_Step 2 of 2:_**  Sign up for [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/SigningUpforS3.html), create a bucket, and configure each machine to use the same bucket.


### Credentials

Halcyon signs all S3 requests with [`HALCYON_AWS_ACCESS_KEY_ID`](reference/#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](reference/#halcyon_aws_secret_access_key).

```
# export HALCYON_AWS_ACCESS_KEY_ID=...
# export HALCYON_AWS_SECRET_ACCESS_KEY=...
```

Using dedicated [IAM credentials](http://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html) is recommended.


### Bucket

The S3 bucket used to store private archives is defined by [`HALCYON_S3_BUCKET`](reference/#halcyon_s3_bucket).

```
# export HALCYON_S3_BUCKET=...
```

By default, all files uploaded to the bucket are assigned the `private` S3 access control list.  To make any subsequent uploads available publicly, set [`HALCYON_S3_ACL`](reference/#halcyon_s3_acl) to `public-read`.

**Note:**  The default S3 host, `s3.amazonaws.com`, can only be used for buckets located in the US Standard region.  To use a bucket located in a different region, set [`HALCYON_S3_HOST`](reference/#halcyon_s3_host) to the appropriate address, such as `s3-eu-west-1.amazonaws.com`.

To prevent Halcyon from uploading any files to the bucket, set [`HALCYON_NO_UPLOAD`](reference/#halcyon_no_upload) to `1`.

Certain files, such as Cabal layer archives, are automatically deleted from the bucket when Halcyon considers them out-of-date.  This can be disabled by setting [`HALCYON_NO_DELETE`](reference/#halcyon_no_delete) to `1`.
