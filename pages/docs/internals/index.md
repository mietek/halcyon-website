---
title: Internals
html-class: insert-toc
---


Internals
=========


Caching
-------

All files are downloaded to the cache directory, defined by `HALCYON_CACHE_DIR`.


> [cache.sh](https://github.com/mietek/halcyon/blob/master/src/cache.sh):

### echo_tmp_cache_dir
>

Output the path to a temporary directory used while cleaning the cache after installation.


### echo_tmp_old_cache_dir
>

Output the path to a temporary directory used to keep the previous contents of the cache safe during installation.


### prepare_cache
>

Before installation:

- If `HALCYON_PURGE_CACHE` is set to `1`, remove everything from the cache.  Otherwise, tell the user about the previous contents of the cache.

Sets `HALCYON_OLD_CACHE_TMP_DIR`.


### clean_cache
>

After installation:

- Remove everything from the cache, retaining only archives of the currently active GHC, Cabal, sandbox, and app.
- Tell the user about any differences between the previous and current contents of the cache, and discard the previous contents.

Uses `HALCYON_OLD_CACHE_TMP_DIR`.


File transfers
--------------

Halcyon can use a private Amazon S3 bucket, defined by `HALCYON_S3_BUCKET`, to keep prebuilt packages.  If a private bucket is not available, Halcyon falls back to using a default public location, which also happens to be an S3 bucket, `s3.halcyon.sh`.

- All prebuilt packages are kept in the bucket with an OS-specific prefix.

    ```
    $ s3_list s3.halcyon.sh linux-ubuntu-10-04-x64
           Listing s3://s3.halcyon.sh/?prefix=linux-ubuntu-10-04-x64... done
    linux-ubuntu-10-04-x64/halcyon-cabal-1.20.0.3.tar.xz
    linux-ubuntu-10-04-x64/halcyon-ghc-7.6.3.tar.xz
    linux-ubuntu-10-04-x64/halcyon-ghc-7.8.3.tar.xz
    ...
    ```

- Any files uploaded to the bucket are assigned an ACL, defined by `HALCYON_S3_ACL`.  Commonly used values are `private` and `public-read`.  The default value is `private`.

- All original files are kept in the bucket with an `original/` prefix, to decrease the load on upstream servers.

    ```
    $ s3_list s3.halcyon.sh original
           Listing s3://s3.halcyon.sh/?prefix=original... done
    original/cabal-install-1.20.0.3.tar.gz
    original/ghc-7.6.3-x86_64-unknown-linux.tar.bz2
    original/ghc-7.8.3-x86_64-unknown-linux-centos65.tar.xz
    original/ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
    ```

Access to the bucket is controlled by defining `HALCYON_AWS_ACCESS_KEY_ID` and `HALCYON_AWS_SECRET_ACCESS_KEY`.


> [transfer.sh](https://github.com/mietek/halcyon/blob/master/src/transfer.sh):

### has_s3
>

Check the variables necessary to use S3 are not unset and not empty.  Otherwise, return `1`.


### echo_default_s3_url
> object

Output the default public URL for the specified object.

```
$ echo_default_s3_url foo
http://s3.halcyon.sh/foo
```


### download_original
> src_file_name original_url dst_dir

If S3 is available, download the specified original file from the bucket.  If unsuccessful, or if the bucket is not available, download the file from the original location.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.


### upload_original
> src_dir src_file_name

If S3 is available, and `HALCYON_NO_UPLOAD` is not set to `1`, upload the specified original file to the bucket.  Otherwise, do nothing.

**Overwrites** existing files without warning.  Returns `1` on failure.


### download_prebuilt
> src_prefix src_file_name dst_dir

Like [download_original](#download_original/), but for prebuilt packages, and with no fallback.

If S3 is available, download the specified package from the bucket.  Otherwise, download the file from the default public location.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.


### list_prebuilt
> src_prefix

If S3 is available, output the contents of the bucket, listing the files which start with the specified prefix.  Otherwise, list the contents of the default public location.


### upload_prebuilt
> src_file dst_prefix

Like [upload_original](#upload_original/), but for prebuilt packages.

If S3 is available, and `HALCYON_NO_UPLOAD` is not set to `1`, upload the specified package to the bucket.  Otherwise, do nothing.

**Overwrites** existing files without warning.  Returns `1` on failure.


Constraint resolution
---------------------


> [constraints.sh](https://github.com/mietek/halcyon/blob/master/src/constraints.sh):

### echo_tmp_constraints_config

### echo_constraints_digest

### echo_customize_sandbox_script_digest

### echo_constraints

### echo_constraints_difference

### read_constraints

### read_constraints_dry_run

### filter_valid_constraints

### score_constraints

### detect_app_constraint

### filter_correct_constraints

### detect_constraints

### detect_customize_sandbox_script_constraint

### insert_customize_sandbox_script_constraint

### freeze_implicit_constraints

### freeze_actual_constraints


Installing GHC
--------------


> [ghc.sh](https://github.com/mietek/halcyon/blob/master/src/ghc.sh):

### echo_ghc_libgmp10_x64_original_url
### echo_ghc_libgmp3_x64_original_url
### echo_ghc_version_from_base_version
### echo_ghc_default_version
### echo_ghc_tag
### echo_ghc_tag_version
### echo_ghc_tag_variant
### echo_ghc_archive
### echo_ghc_description
### echo_tmp_ghc_dir
### validate_ghc_tag
### detect_base_version
### prepare_ghc_libs
### build_ghc
### trim_ghc
### strip_ghc
### archive_ghc
### restore_ghc
### infer_ghc_version
### activate_ghc
### deactivate_ghc
### install_ghc


Installing Cabal
----------------


> [cabal.sh](https://github.com/mietek/halcyon/blob/master/src/cabal.sh):

### echo_cabal_original_url
### echo_cabal_default_version
### echo_cabal_config
### echo_cabal_tag
### echo_cabal_tag_version
### echo_cabal_tag_timestamp
### echo_cabal_archive
### echo_updated_cabal_tag_pattern
### echo_updated_cabal_archive_prefix
### echo_updated_cabal_archive_pattern
### echo_updated_cabal_archive_timestamp
### echo_cabal_description
### echo_tmp_cabal_dir
### validate_cabal_tag
### validate_updated_cabal_timestamp
### validate_updated_cabal_tag
### validate_updated_cabal_archive
### match_updated_cabal_archive
### cabal_do
### sandboxed_cabal_do
### cabal_update
### cabal_list_latest_package_version
### cabal_create_sandbox
### cabal_install
### cabal_install_deps
### cabal_configure_app
### cabal_build_app
### build_cabal
### update_cabal
### archive_cabal
### restore_cabal
### restore_archived_updated_cabal
### restore_updated_cabal
### infer_cabal_version
### activate_cabal
### deactivate_cabal
### install_cabal


Installing sandboxes
--------------------


> [sandbox.sh](https://github.com/mietek/halcyon/blob/master/src/sandbox.sh):

### log_add_config_help
### echo_sandbox_tag
### echo_sandbox_tag_ghc_version
### echo_sandbox_tag_app_label
### echo_sandbox_tag_digest
### echo_sandbox_archive
### echo_sandbox_config
### echo_sandbox_config_ghc_version
### echo_sandbox_config_app_label
### echo_sandbox_config_digest
### echo_sandbox_config_prefix
### echo_sandbox_config_pattern
### echo_sandbox_description
### echo_tmp_sandbox_config
### echo_tmp_customize_sandbox_dir
### validate_sandbox_tag
### validate_sandbox_config
### build_sandbox
### strip_sandbox
### archive_sandbox
### restore_sandbox
### infer_sandbox_constraints
### infer_sandbox_digest
### locate_matched_sandbox_tag
### activate_sandbox
### deactivate_sandbox
### install_extended_sandbox
### install_sandbox
### customize_sandbox_with_cabal_package_executables


Installing apps
---------------


> [app.sh](https://github.com/mietek/halcyon/blob/master/src/app.sh):

### echo_app_tag
### echo_app_tag_ghc_version
### echo_app_tag_app_label
### echo_app_archive
### echo_tmp_app_dir
### echo_tmp_old_app_dir
### echo_tmp_app_dist_dir
### validate_app_tag
### echo_fake_package
### fake_app_dir
### detect_app_package
### detect_app_name
### detect_app_version
### detect_app_executable
### detect_app_label
### configure_app
### build_app
### archive_app
### restore_app
### infer_app_tag
### install_app
