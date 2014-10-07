---
title: Reference
page-class: add-section-toc
page-head: |
  <style>
    header a.link-documentation {
      color: #3f96f0;
    }
  </style>
---


Reference
=========

Internal documentation for _Halcyon_.  Intended primarily for people interested in contributing to _Halcyon_.  Best read together with the source code.

_Halcyon_ is written in GNU _bash_, using [_bashmenot_](https://github.com/mietek/bashmenot/), a library of functions for safer shell scripting.  For more information, including usage examples, please consult the [_bashmenot_ library reference](documentation/library-reference/).

Work in progress.  Please report any problems with the documentation on the [_halcyon-website_ issue tracker](https://github.com/mietek/halcyon-website/issues/).

> Contents:




Environment variables { .vars }
---------------------

### `HALCYON_AWS_ACCESS_KEY_ID`
> Default value:  _none_

Part of the authentication details used to access the private Amazon S3 bucket.


### `HALCYON_AWS_SECRET_ACCESS_KEY`
> Default value:  _none_

Like [`HALCYON_AWS_ACCESS_KEY_ID`](#halcyon_aws_access_key_id), but secret.


### `HALCYON_S3_BUCKET`
> Default value:  _none_

Name of the private Amazon S3 bucket used to keep prebuilt packages.


### `HALCYON_S3_ACL`
> Default value:  `private`

ACL assigned to all files uploaded to the private Amazon S3 bucket.

Commonly used values are `private` and `public-read`.


### `HALCYON_DIR`
> Default value:  `/app/.halcyon`

TODO


### `HALCYON_CONFIG_DIR`
> Default value:  `${HALCYON_DIR}/config`

TODO


### `HALCYON_INSTALL_DIR`
> Default value:  `${HALCYON_DIR}/install`

TODO


### `HALCYON_CACHE_DIR`
> Default value:  `/var/tmp/halcyon/cache`

TODO


### `HALCYON_PURGE_CACHE`
> Default value:  `0`

Whether to delete the contents of the _Halcyon_ cache before compilation.


### `HALCYON_NO_ARCHIVE`
> Default value:  `0`

TODO


### `HALCYON_NO_UPLOAD`
> Default value:  `0`

TODO


### `HALCYON_DEPENDENCIES_ONLY`
> Default value:  `0`

TODO


### `HALCYON_PREBUILT_ONLY`
> Default value:  `0`

TODO


### `HALCYON_NO_PREBUILT`
> Default value:  `0`

Whether to ignore all existing prebuilt packages and build all required packages from scratch.


### `HALCYON_NO_PREBUILT_GHC`
> Default value:  `0`

Like [`HALCYON_NO_PREBUILT`](#halcyon_no_prebuilt), but ignoring only GHC packages.


### `HALCYON_NO_PREBUILT_CABAL`
> Default value:  `0`

Like [`HALCYON_NO_PREBUILT`](#halcyon_no_prebuilt), but ignoring only Cabal packages.


### `HALCYON_NO_PREBUILT_SANDBOX`
> Default value:  `0`

Like [`HALCYON_NO_PREBUILT`](#halcyon_no_prebuilt), but ignoring only sandbox packages.


### `HALCYON_NO_PREBUILT_APP`
> Default value:  `0`

Like [`HALCYON_NO_PREBUILT`](#halcyon_no_prebuilt), but ignoring only app packages.


### `HALCYON_FORCE_GHC_VERSION`
> Default value:  _none_

Version of GHC to use, instead of an inferred version.


### `HALCYON_FORCE_CABAL_VERSION`
> Default value:  _none_

Version of Cabal to use, instead of an inferred version.


### `HALCYON_FORCE_CABAL_UPDATE`
> Default value:  `0`

Whether to ignore any existing prebuilt updated Cabal packages and update Cabal from scratch.


### `HALCYON_TRIM_GHC`
> Default value:  `0`

Whether to use an aggressively minimised prebuilt variant of GHC.


### `HALCYON_CUSTOM_SCRIPT`
> Default value:  _none_

TODO


### `HALCYON_QUIET`
> Default value:  `0`

TODO




Cache maintenance functions { .funs }
---------------------------

Functions to maintain the _Halcyon_ cache, and communicate the state of the cache to the user.


> Contents of [`cache.sh`](https://github.com/mietek/halcyon/blob/master/src/cache.sh):

### `echo_tmp_cache_dir`
> Arguments:  _none_

Output the path to a temporary directory used while cleaning the cache after installation.


### `echo_tmp_old_cache_dir`
> Arguments:  _none_

Like [`echo_tmp_cache_dir`](#echo_tmp_cache_dir), but for a temporary directory used to keep the previous contents of the cache safe during installation.


### `prepare_cache`
> Arguments:  _none_

Before installation:

If [`HALCYON_PURGE_CACHE`](#halcyon_purge_cache) is set to `1`, remove everything from the cache.  Otherwise, tell the user about the previous contents of the cache, and copy them to a temporary location.

Sets a temporary global variable, `HALCYON_OLD_CACHE_TMP_DIR`.


### `clean_cache`
> Arguments:  _none_

After installation:

1. Remove everything from the cache, retaining only the most recently used archives.

2. Tell the user about any differences between the previous and current contents of the cache, and discard the previous contents.

Uses a temporary global variable, `HALCYON_OLD_CACHE_TMP_DIR`.




File transfer functions { .funs }
-----------------------

Functions for transferring original files and prebuilt packages.

> Contents of [`transfer.sh`](https://github.com/mietek/halcyon/blob/master/src/transfer.sh):


### `has_s3`
> Arguments:  _none_

Check the environment variables necessary to use S3 are not unset and not empty.  Otherwise, return `1`.


### `echo_default_s3_url`
> Arguments:  _`object`_

Output the default _Halcyon_ public URL of the specified object.

```
$ echo_default_s3_url foo
http://s3.halcyon.sh/foo
```


### `download_original`
> Arguments:  _`src_file_name original_url dst_dir`_

If an S3 bucket is available, download the specified original file from the bucket.  If unsuccessful, or if the bucket is not available, download the file from the original location.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.


### `upload_original`
> Arguments:  _`src_dir src_file_name`_

If an S3 bucket is available, and [`HALCYON_NO_UPLOAD`](#halcyon_no_upload) is not set to `1`, upload the specified original file to the bucket.  Otherwise, do nothing.

**Overwrites** existing files without warning.  Returns `1` on failure.


### `download_prebuilt`
> Arguments:  _`src_prefix src_file_name dst_dir`_

Like [`download_original`](#download_original), but for prebuilt packages, and with no fallback.

If an S3 bucket is available, download the specified package from the bucket.  Otherwise, download the file from the default _Halcyon_ public location.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.


### `list_prebuilt`
> Arguments:  _`src_prefix`_

If an S3 bucket is available, output the contents of the bucket, listing the files which start with the specified prefix.  Otherwise, list the contents of the default _Halcyon_ public location.


### `upload_prebuilt`
> Arguments:  _`src_file dst_prefix`_

Like [`upload_original`](#upload_original), but for prebuilt packages.

If an S3 bucket is available, and [`HALCYON_NO_UPLOAD`](#halcyon_no_upload) is not set to `1`, upload the specified package to the bucket.  Otherwise, do nothing.

**Overwrites** existing files without warning.  Returns `1` on failure.




Constraint processing functions { .funs }
-------------------------------

TODO

> Contents of [`constraints.sh`](https://github.com/mietek/halcyon/blob/master/src/constraints.sh):

### `echo_tmp_constraints_config`
> Arguments:  _none_

Output the path to a temporary file used to tell the user about any differences between the actual and expected constraints.


### `echo_constraints_digest`
> Arguments:  _none_

Output the SHA-1 digest of a file of constraints.

```
$ echo -e "foo 1.0\nbar 2.0" | echo_constraints_digest
241c51cdde47e7a8a8a3ab6c14a7ed3eefa5013e
```


### `echo_customize_script_digest`
> Arguments:  _none_

Like [`echo_constraints_digest`](#echo_constraints_digest), but for a sandbox customisation script.


### `echo_constraints`
> Arguments:  _none_

Render a file of constraints into the canonical `cabal.config` format.

```
$ echo -e "foo 1.0\nbar 2.0" | echo_constraints
constraints: foo ==1.0,
             bar ==2.0
```


### `echo_constraints_difference`
> Arguments:  _`old_constraints new_constraints`_

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


### `read_constraints`
> Arguments:  _none_

Parse a file of constraints from the canonical `cabal.config` format.

Accepts slight format variations.  Constraints must be separated by newlines.


### `read_constraints_dry_run`
> Arguments:  _none_

Parse a file of constraints from the `cabal freeze --dry-run` format.


### `filter_valid_constraints`
> Arguments:  _none_

Pipe input to output, checking that a constraint for the `base` package is specified, and that no more than one constraint is specified for any package.


### `score_constraints`
> Arguments:  _`constraints sandbox_tag`_

TODO


### `detect_app_constraint`
> Arguments:  `app_dir`

TODO


### `filter_correct_constraints`
> Arguments:  `app_dir`

TODO


### `detect_constraints`
> Arguments:  `app_dir`

TODO


### `insert_customize_script_constraint`
> Arguments:  `app_dir`

TODO


### `freeze_implicit_constraints`
> Arguments:  `app_dir`

TODO


### `freeze_actual_constraints`
> Arguments:  `app_dir`

TODO




GHC installation functions { .funs }
--------------------------

TODO

> Contents of [`ghc.sh`](https://github.com/mietek/halcyon/blob/master/src/ghc.sh):


### `echo_ghc_libgmp10_x64_original_url`
> Arguments:  _`ghc_version`_

Output the original URL of the specified version of the GHC binary distribution linked with `libgmp10`.

```
$ echo_ghc_libgmp10_x64_original_url 7.8.3
http://www.haskell.org/ghc/dist/7.8.3/ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
```


### `echo_ghc_libgmp3_x64_original_url`
> Arguments:  _`ghc_version`_

Like [`echo_ghc_libgmp10_x64_original_url`](#echo_ghc_libgmp10_x64_original_url), but for the distribution linked with `libgmp3`.


### `echo_ghc_version_from_base_version`
> Arguments:  _`base_version`_

Output the GHC version corresponding to the specified `base` package version.

```
$ echo_ghc_version_from_base_version 4.7.0.1
7.8.3
```


### `echo_ghc_default_version`
> Arguments:  _none_

Output the default _Halcyon_ GHC version.

```
$ echo_ghc_default_version 
7.8.3
```


### `echo_ghc_tag`
> Arguments:  _`ghc_version ghc_variant`_

Output a one-line tag, consisting of the current [`HALCYON_DIR`](#halcyon_dir), OS identifier, and the specified GHC version and variant.

An empty variant can be specified to tag the default GHC variant.


### `echo_ghc_tag_version`
> Arguments:  _`ghc_tag`_

Output the GHC version included in the specified tag.

```
$ echo_ghc_tag_version "`echo_ghc_tag 7.8.3 ''`"
7.8.3
```


### `echo_ghc_tag_variant`
> Arguments:  _`ghc_tag`_

Like [`echo_ghc_tag_version`](#echo_ghc_tag_version), but for the GHC variant.


### `echo_ghc_archive`
> Arguments:  _`ghc_tag`_

Output the GHC archive name corresponding to the specified tag.

```
$ echo_ghc_archive "`echo_ghc_tag 7.8.3 ''`"
halcyon-ghc-7.8.3.tar.xz
```
```
$ echo_ghc_archive "`echo_ghc_tag 7.8.3 trimmed`"
halcyon-ghc-7.8.3-trimmed.tar.xz
```


### `echo_ghc_description`
> Arguments:  _`ghc_tag`_

Output a user-friendly GHC description based on the specified tag.

```
$ echo_ghc_description "`echo_ghc_tag 7.8.3 ''`"
GHC 7.8.3
```
```
$ echo_ghc_description "`echo_ghc_tag 7.8.3 trimmed`"
GHC 7.8.3 (trimmed)
```


### `echo_tmp_ghc_dir`
> Arguments:  _none_

Output the path to a temporary directory used while installing GHC.


### `validate_ghc_tag`
> Arguments:  _`ghc_tag`_

Parse a tag, checking that it is equal to the specified GHC tag.  Otherwise, return `1`.


### `detect_base_version`
> Arguments:  _none_

Output the currently active GHC `base` package version.

```
$ detect_base_version
4.7.0.1
```


### `prepare_ghc_libs`
> Arguments:  _`ghc_version`_

TODO


### `build_ghc`
> Arguments:  _`ghc_version`_

TODO


### `trim_ghc`
> Arguments:  _none_

TODO


### `strip_ghc`
> Arguments:  _none_

TODO


### `archive_ghc`
> Arguments:  _none_

TODO


### `restore_ghc`
> Arguments:  _`ghc_tag`_

TODO


### `infer_ghc_version`
> Arguments:  _`app_dir`_

TODO


### `activate_ghc`
> Arguments:  _none_

TODO


### `deactivate_ghc`
> Arguments:  _none_

TODO


### `install_ghc`
> Arguments: ` _app_dir_`

TODO




Cabal installation functions { .funs }
----------------------------

TODO

> Contents of [`cabal.sh`](https://github.com/mietek/halcyon/blob/master/src/cabal.sh):


### `echo_cabal_original_url`
> Arguments:  _`cabal_version`_

Output the original URL of the specified version of the Cabal source distribution.


### `echo_cabal_default_version`
> Arguments:  _none_

Output the default _Halcyon_ Cabal version.

```
$ echo_cabal_default_version
1.20.0.3
```


### `echo_cabal_config`
> Arguments:  _none_

Output the default _Halcyon_ `cabal.config` file.


### `echo_cabal_tag`
> Arguments:  _`cabal_version cabal_timestamp`_

Output a one-line tag, consisting of the current [`HALCYON_DIR`](#halcyon_dir), OS identifier, and the specified Cabal version and update timestamp.

An empty timestamp can be specified to tag Cabal which has not been updated.


### `echo_cabal_tag_version`
> Arguments:  _`cabal_tag`_

Output the Cabal version included in the specified tag.

```
$ echo_cabal_tag_version "`echo_cabal_tag 1.20.0.3 ''`"
1.20.0.3
```


### `echo_cabal_tag_timestamp`
> Arguments:  _`cabal_tag`_

Like [`echo_cabal_tag_version`](#echo_cabal_tag_version), but for the Cabal update timestamp.


### `echo_cabal_archive`
> Arguments:  _`cabal_tag`_

Output the Cabal archive name corresponding to the specified tag.

```
$ echo_cabal_archive "`echo_cabal_tag 1.20.0.3 ''`"
halcyon-cabal-1.20.0.3.tar.xz
```
```
$ echo_cabal_archive "`echo_cabal_tag 1.20.0.3 20141105235959`"
halcyon-cabal-1.20.0.3-20141105235959.tar.xz
```


### `echo_updated_cabal_tag_pattern`
> Arguments:  _`cabal_version`_

TODO


### `echo_updated_cabal_archive_prefix`
> Arguments:  _`cabal_version`_

TODO


### `echo_updated_cabal_archive_pattern`
> Arguments:  _`cabal_version`_

TODO


### `echo_updated_cabal_archive_timestamp`
> Arguments:  _`cabal_archive`_

TODO


### `echo_cabal_description`
> Arguments:  _`cabal_tag`_

TODO


### `echo_tmp_cabal_dir`
> Arguments:  _none_

Output the path to a temporary directory used while installing Cabal.


### `validate_cabal_tag`
> Arguments:  _`cabal_version`_

Parse a tag, checking that the Cabal version included it is equal to the specified version.  Otherwise, return 1.


### `validate_updated_cabal_timestamp`
> Arguments:  _`candidate_timestamp`_

TODO


### `validate_updated_cabal_tag`
> Arguments:  _`cabal_version`_

TODO


### `validate_updated_cabal_archive`
> Arguments:  _`cabal_version`_

TODO


### `match_updated_cabal_archive`
> Arguments:  _`cabal_version`_

TODO


### `cabal_do`
> Arguments:  _`work_dir any*`_

TODO


### `sandboxed_cabal_do`
> Arguments:  _`sandbox_dir work_dir any*`_

TODO


### `cabal_update`
> Arguments:  _none_

TODO


### `cabal_list_latest_package_version`
> Arguments:  _`package_name`_

TODO


### `cabal_create_sandbox`
> Arguments:  _`sandbox_dir`_

TODO


### `cabal_install`
> Arguments:  _`sandbox_dir app_dir`_

TODO


### `cabal_install_deps`
> Arguments:  _`sandbox_dir app_dir`_

TODO


### `cabal_configure_app`
> Arguments:  _`sandbox_dir app_dir`_

TODO


### `cabal_build_app`
> Arguments:  _`sandbox_dir app_dir`_

TODO


### `build_cabal`
> Arguments:  _`cabal_version`_

TODO


### `update_cabal`
> Arguments:  _none_

TODO


### `archive_cabal`
> Arguments:  _none_

TODO


### `restore_cabal`
> Arguments:  _`cabal_version`_

TODO


### `restore_archived_updated_cabal`
> Arguments:  _`cabal_version`_

TODO


### `restore_updated_cabal`
> Arguments:  _`cabal_version`_

TODO


### `infer_cabal_version`
> Arguments:  _none_

TODO


### `activate_cabal`
> Arguments:  _none_

TODO

### `deactivate_cabal`
> Arguments:  _none_

TODO


### `install_cabal`
> Arguments:  _none_

TODO




Sandbox installation functions { .funs }
------------------------------

TODO

> Contents of [`sandbox.sh`](https://github.com/mietek/halcyon/blob/master/src/sandbox.sh):


### `log_add_config_help`
> Arguments:  _`sandbox_constraints`_

TODO


### `echo_sandbox_tag`
> Arguments:  _`ghc_version app_label sandbox_digest`_

TODO


### `echo_sandbox_tag_ghc_version`
> Arguments:  _`sandbox_tag`_

TODO


### `echo_sandbox_tag_app_label`
> Arguments:  _`sandbox_tag`_

TODO


### `echo_sandbox_tag_digest`
> Arguments:  _`sandbox_tag`_

TODO


### `echo_sandbox_archive`
> Arguments:  _`sandbox_tag`_

TODO


### `echo_sandbox_config`
> Arguments:  _`sandbox_tag`_

TODO


### `echo_sandbox_config_ghc_version`
> Arguments:  _`sandbox_config`_

TODO


### `echo_sandbox_config_app_label`
> Arguments:  _`sandbox_config`_

TODO


### `echo_sandbox_config_digest`
> Arguments:  _`sandbox_config`_

TODO


### `echo_sandbox_config_prefix`
> Arguments:  _`sandbox_config_prefix`_

TODO


### `echo_sandbox_config_pattern`
> Arguments:  _`sandbox_config_pattern`_

TODO


### `echo_sandbox_description`
> Arguments:  _`sandbox_description`_

TODO


### `echo_tmp_sandbox_config`
> Arguments:  _none_

TODO


### `echo_tmp_customize_sandbox_dir`
> Arguments:  _none_

TODO


### `validate_sandbox_tag`
> Arguments:  _`sandbox_tag`_

TODO


### `validate_sandbox_config`
> Arguments:  _`sandbox_digest`_

TODO


### `build_sandbox`
> Arguments:  _`app_dir sandbox_constraints sandbox_tag`_

TODO


### `strip_sandbox`
> Arguments:  _none_

TODO


### `archive_sandbox`
> Arguments:  _none_

TODO


### `restore_sandbox`
> Arguments:  _`sandbox_tag`_

TODO


### `infer_sandbox_constraints`
> Arguments:  _`app_dir`_

TODO


### `infer_sandbox_digest`
> Arguments:  _`sandbox_constraints`_

TODO


### `locate_matched_sandbox_tag`
> Arguments:  _`sandbox_constraints`_

TODO


### `activate_sandbox`
> Arguments:  _`app_dir`_

TODO


### `deactivate_sandbox`
> Arguments:  _`app_dir`_

TODO


### `install_extended_sandbox`
> Arguments:  _`app_dir sandbox_constraints sandbox_tag matched_tag`_

TODO


### `install_sandbox`
> Arguments:  _`app_dir`_

TODO


### `customize_sandbox_with_execs`
> Arguments:  _`package_name*`_

TODO






App installation functions { .funs }
--------------------------

TODO

> Contents of [`app.sh`](https://github.com/mietek/halcyon/blob/master/src/app.sh):


### `echo_app_tag`
> Arguments:  _`ghc_version app_label`_

TODO


### `echo_app_tag_ghc_version`
> Arguments:  _`app_tag`_

TODO


### `echo_app_tag_app_label`
> Arguments:  _`app_tag`_

TODO


### `echo_app_archive`
> Arguments:  _`app_tag`_

TODO


### `echo_tmp_app_dir`
> Arguments:  _none_

TODO


### `echo_tmp_old_app_dir`
> Arguments:  _none_

TODO


### `echo_tmp_app_dist_dir`
> Arguments:  _none_

TODO


### `validate_app_tag`
> Arguments:  _`app_tag`_

TODO


### `echo_fake_package`
> Arguments:  _`app_label`_

TODO


### `fake_app_dir`
> Arguments:  _`app_label`_

TODO


### `detect_app_package`
> Arguments:  _`app_dir`_

TODO


### `detect_app_name`
> Arguments:  _`app_dir`_

TODO


### `detect_app_version`
> Arguments:  _`app_dir`_

TODO


### `detect_app_executable`
> Arguments:  _`app_dir`_

TODO


### `detect_app_label`
> Arguments:  _`app_dir`_

TODO


### `configure_app`
> Arguments:  _`app_dir`_

TODO


### `build_app`
> Arguments:  _`app_dir app_tag`_

TODO


### `archive_app`
> Arguments:  _`app_dir app_tag`_

TODO


### `restore_app`
> Arguments:  _`app_dir app_tag`_

TODO


### `infer_app_tag`
> Arguments:  _`app_dir`_

TODO


### `install_app`
> Arguments:  _`app_dir`_

TODO
