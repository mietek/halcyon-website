---
title: Reference
html-class: insert-toc
---


Reference
=========

Work in progress.

Best read together with the [Halcyon source code](https://github.com/mietek/halcyon/tree/master/src/).


Environment variables { .vars }
---------------------

### `HALCYON_AWS_ACCESS_KEY_ID`
> Default value:  _none_

### `HALCYON_AWS_SECRET_ACCESS_KEY`
> Default value:  _none_

### `HALCYON_S3_BUCKET`
> Default value:  _none_

### `HALCYON_S3_ACL`
> Default value:  `private`

### `HALCYON_DIR`
> Default value:  `/app/.halcyon`

### `HALCYON_CONFIG_DIR`
> Default value:  `${HALCYON_DIR}/config`

### `HALCYON_INSTALL_DIR`
> Default value:  `${HALCYON_DIR}/install`

### `HALCYON_CACHE_DIR`
> Default value:  `/var/tmp/halcyon/cache`

### `HALCYON_PURGE_CACHE`
> Default value:  `0`

### `HALCYON_NO_ARCHIVE`
> Default value:  `0`

### `HALCYON_NO_UPLOAD`
> Default value:  `0`

### `HALCYON_DEPENDENCIES_ONLY`
> Default value:  `0`

### `HALCYON_PREBUILT_ONLY`
> Default value:  `0`

### `HALCYON_NO_PREBUILT`
> Default value:  `0`

### `HALCYON_NO_PREBUILT_GHC`
> Default value:  `0`

### `HALCYON_NO_PREBUILT_CABAL`
> Default value:  `0`

### `HALCYON_NO_PREBUILT_SANDBOX`
> Default value:  `0`

### `HALCYON_NO_PREBUILT_APP`
> Default value:  `0`

### `HALCYON_FORCE_GHC_VERSION`
> Default value:  _none_

### `HALCYON_FORCE_CABAL_VERSION`
> Default value:  _none_

### `HALCYON_FORCE_CABAL_UPDATE`
> Default value:  `0`

### `HALCYON_TRIM_GHC`
> Default value:  `0`

### `HALCYON_CUSTOM_SCRIPT`
> Default value:  _none_

### `HALCYON_QUIET`
> Default value:  `0`


Caching functions { .funs }
-----------------
> Dependencies: 

Halcyon downloads all files to a cache directory, defined by [`HALCYON_CACHE_DIR`](#halcyon_cache_dir).


> [`cache.sh`](https://github.com/mietek/halcyon/blob/master/src/cache.sh):

### `echo_tmp_cache_dir`
> Arguments:  _none_

Output the path to a temporary directory used while cleaning the cache after installation.


### `echo_tmp_old_cache_dir`
> Arguments:  _none_

Like [`echo_tmp_cache_dir`](#echo_tmp_cache_dir), but for a temporary directory used to keep the previous contents of the cache safe during installation.


### `prepare_cache`
> Arguments:  _none_

If [`HALCYON_PURGE_CACHE`](#halcyon_purge_cache) is set to `1`, remove everything from the cache.  Otherwise, tell the user about the previous contents of the cache, and copy them to a temporary location.

Sets a temporary global variable, `HALCYON_OLD_CACHE_TMP_DIR`.


### `clean_cache`
> Arguments:  _none_

1. Remove everything from the cache, retaining only archives of the currently active GHC, Cabal, sandbox, and app.
2. Tell the user about any differences between the previous and current contents of the cache, and discard the previous contents.

Uses a temporary global variable, `HALCYON_OLD_CACHE_TMP_DIR`.


File transfer functions { .funs }
-----------------------

Halcyon keeps prebuilt packages in Amazon S3 buckets.  Setting [`HALCYON_S3_BUCKET`](#halcyon_s3_bucket) defines the private bucket to be used.

If this variable is not set, Halcyon will only download files from the default public location, which also happens to be an S3 bucket.  The default location is defined by [`echo_default_s3_url`](#echo_default_s3_url).

All prebuilt packages are kept in the bucket with the relevant OS identifier as the prefix.
```
$ s3_list s3.halcyon.sh linux-ubuntu-14-04-x64
       Listing s3://s3.halcyon.sh/?prefix=linux-ubuntu-14-04-x64... done
linux-ubuntu-14-04-x64/halcyon-cabal-1.20.0.3.tar.xz
linux-ubuntu-14-04-x64/halcyon-ghc-7.6.3.tar.xz
linux-ubuntu-14-04-x64/halcyon-ghc-7.8.3.tar.xz
...
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

All files uploaded to the bucket are assigned an ACL, defined by [`HALCYON_S3_ACL`](#halcyon_s3_acl).

Access to the bucket is controlled by setting [`HALCYON_AWS_ACCESS_KEY_ID`](#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](#halcyon_aws_secret_access_key).


> [transfer.sh](https://github.com/mietek/halcyon/blob/master/src/transfer.sh):

### has_s3
>

Check the environment variables necessary to use S3 are not unset and not empty.  Otherwise, return `1`.


### echo_default_s3_url
> object

Output the default Halcyon public URL of the specified object.

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

If S3 is available, and [`HALCYON_NO_UPLOAD`](#halcyon_no_upload) is not set to `1`, upload the specified original file to the bucket.  Otherwise, do nothing.

**Overwrites** existing files without warning.  Returns `1` on failure.


### download_prebuilt
> src_prefix src_file_name dst_dir

Like [`download_original`](#download_original), but for prebuilt packages, and with no fallback.

If S3 is available, download the specified package from the bucket.  Otherwise, download the file from the default Halcyon public location.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.


### list_prebuilt
> src_prefix

If S3 is available, output the contents of the bucket, listing the files which start with the specified prefix.  Otherwise, list the contents of the default Halcyon public location.


### upload_prebuilt
> src_file dst_prefix

Like [`upload_original`](#upload_original), but for prebuilt packages.

If S3 is available, and [`HALCYON_NO_UPLOAD`](#halcyon_no_upload) is not set to `1`, upload the specified package to the bucket.  Otherwise, do nothing.

**Overwrites** existing files without warning.  Returns `1` on failure.


Constraint processing functions
-------------------------------

A constraint consists of a package name and version.  A file of constraints consists of any number of constraints separated by newlines.

Constraints are kept in `cabal.config` files.  The canonical format of these files is defined to match the output of `cabal freeze`.


> [constraints.sh](https://github.com/mietek/halcyon/blob/master/src/constraints.sh):

### echo_tmp_constraints_config
>

Output the path to a temporary file used to tell the user about any differences between the actual and expected constraints.


### echo_constraints_digest
>

Output the SHA-1 digest of a file of constraints.

```
$ echo -e "foo 1.0\nbar 2.0" | echo_constraints_digest
241c51cdde47e7a8a8a3ab6c14a7ed3eefa5013e
```


### echo_customize_script_digest
>

Like [echo_constraints_digest](#echo_constraints_digest), but for a sandbox customization script.


### echo_constraints
>

Render a file of constraints into the canonical `cabal.config` format.

```
$ echo -e "foo 1.0\nbar 2.0" | echo_constraints
constraints: foo ==1.0,
             bar ==2.0
```


### echo_constraints_difference
> old_constraints new_constraints

Output a _diff_ between the two specified files of constraints, as rendered into the canonical format.

```
$ old=`echo -e "foo 1.0\nbar 2.0\nbaz 3.0"`
$ new=`echo -e "foo 1.0\nbar 2.1\nbaz 3.0"`
$ echo_constraints_difference "${old}" "${new}"
--- db37b59/cabal.config
+++ 61827a9/cabal.config
@@ -1,3 +1,3 @@
 constraints: foo ==1.0,
-             bar ==2.0,
+             bar ==2.1,
              baz ==3.0
```


### read_constraints
>

Parse a file of constraints from the canonical `cabal.config` format.

Accepts slight format variations.  Constraints must be separated by newlines.


### read_constraints_dry_run
>

Parse a file of constraints from the `cabal freeze --dry-run` format.


### filter_valid_constraints
>

Pipe input to output, checking that a constraint for the `base` package is specified, and that no more than one constraint is specified for any package.


### score_constraints
> constraints sandbox_tag


### detect_app_constraint
> app_dir


### filter_correct_constraints
> app_dir


### detect_constraints
> app_dir


### insert_customize_script_constraint
> app_dir


### freeze_implicit_constraints
> app_dir


### freeze_actual_constraints
> app_dir



GHC installation functions
--------------------------


> [ghc.sh](https://github.com/mietek/halcyon/blob/master/src/ghc.sh):

### echo_ghc_libgmp10_x64_original_url
> ghc_version

Output the original URL of the `libgmp10` variant `x64` architecture binary distribution for the specified GHC version.

```
$ echo_ghc_libgmp10_x64_original_url 7.8.3
http://www.haskell.org/ghc/dist/7.8.3/ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
```


### echo_ghc_libgmp3_x64_original_url
> ghc_version

Like [echo_ghc_libgmp10_x64_original_url](#echo_ghc_libgmp10_x64_original_url), but for the `libgmp3` variant.


### echo_ghc_version_from_base_version
> base_version

Output the GHC version corresponding to the specified `base` package version.

```
$ echo_ghc_version_from_base_version 4.7.0.1
7.8.3
```


### echo_ghc_default_version
>

Output the default Halcyon GHC version.

```
$ echo_ghc_default_version 
7.8.3
```


### echo_ghc_tag
> ghc_version ghc_variant

Output a tab-separated GHC tag, consisting of the current [HALCYON_DIR](#halcyon_dir), OS identifier, and the specified GHC version and packaging variant.

The packaging variant may be empty.

```
$ echo_ghc_tag 7.8.3 foo
/app/.halcyon	linux-ubuntu-14-04-x64	ghc-7.8.3	foo
```


### echo_ghc_tag_version
> ghc_tag

Output the version included in the specified GHC tag.

```
$ echo_ghc_tag_version "`echo_ghc_tag 7.8.3 foo`"
7.8.3
```


### echo_ghc_tag_variant
> ghc_tag

Like [echo_ghc_tag_version](#echo_ghc_tag_version), but for the packaging variant.


### echo_ghc_archive
> ghc_tag

Output the archive name corresponding to the specified GHC tag.

```
$ echo_ghc_archive "`echo_ghc_tag 7.8.3 foo`"
halcyon-ghc-7.8.3-foo.tar.xz
```


### echo_ghc_description
> ghc_tag

Output a human-readable description of the specified GHC tag.

```
$ echo_ghc_description "`echo_ghc_tag 7.8.3 foo`"
GHC 7.8.3 (foo)
```


### echo_tmp_ghc_dir
>

Output the path to a temporary directory used while installing GHC.


### validate_ghc_tag
> ghc_tag

Parse a tag, checking that it is equal to the specified GHC tag.  Otherwise, return `1`.

```
$ echo "`echo_ghc_tag 7.8.3 foo`" | validate_ghc_tag "`echo_ghc_tag 7.8.3 foo`" ; echo $?
0
```
```
$ echo bar | validate_ghc_tag "`echo_ghc_tag 7.8.3 foo`" ; echo $?
1
```


### detect_base_version
>

Output the `base` package version of the currently active GHC.

```
$ detect_base_version
4.7.0.1
```


### prepare_ghc_libs
> ghc_version


### build_ghc
> ghc_version


### trim_ghc
> ghc_tag ghc_version


### strip_ghc
> ghc_tag ghc_version


### archive_ghc
>

### restore_ghc
> ghc_tag


### infer_ghc_version
> app_dir


### activate_ghc
> 


### deactivate_ghc
>


### install_ghc
> app_dir


Cabal installation functions
----------------------------


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


Sandbox installation functions
------------------------------


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
### customize_sandbox_with_execs


App installation functions
--------------------------


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
