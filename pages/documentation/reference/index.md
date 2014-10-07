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

Like [echo_constraints_digest](#echo_constraints_digest), but for a sandbox customization script.


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


> Contents of [`ghc.sh`](https://github.com/mietek/halcyon/blob/master/src/ghc.sh):


### `echo_ghc_libgmp10_x64_original_url`
> Arguments:  _`ghc_version`_

Output the original URL of the `libgmp10` variant `x64` architecture binary distribution for the specified GHC version.

```
$ echo_ghc_libgmp10_x64_original_url 7.8.3
http://www.haskell.org/ghc/dist/7.8.3/ghc-7.8.3-x86_64-unknown-linux-deb7.tar.xz
```


### `echo_ghc_libgmp3_x64_original_url`
> Arguments:  _`ghc_version`_

Like [echo_ghc_libgmp10_x64_original_url](#echo_ghc_libgmp10_x64_original_url), but for the `libgmp3` variant.


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

Output a tab-separated GHC tag, consisting of the current [HALCYON_DIR](#halcyon_dir), OS identifier, and the specified GHC version and packaging variant.

The packaging variant may be empty.

```
$ echo_ghc_tag 7.8.3 foo
/app/.halcyon	linux-ubuntu-14-04-x64	ghc-7.8.3	foo
```


### `echo_ghc_tag_version`
> Arguments:  _`ghc_tag`_

Output the version included in the specified GHC tag.

```
$ echo_ghc_tag_version "`echo_ghc_tag 7.8.3 foo`"
7.8.3
```


### `echo_ghc_tag_variant`
> Arguments:  _`ghc_tag`_

Like [echo_ghc_tag_version](#echo_ghc_tag_version), but for the packaging variant.


### `echo_ghc_archive`
> Arguments:  _`ghc_tag`_

Output the archive name corresponding to the specified GHC tag.

```
$ echo_ghc_archive "`echo_ghc_tag 7.8.3 foo`"
halcyon-ghc-7.8.3-foo.tar.xz
```


### `echo_ghc_description`
> Arguments:  _`ghc_tag`_

Output a human-readable description of the specified GHC tag.

```
$ echo_ghc_description "`echo_ghc_tag 7.8.3 foo`"
GHC 7.8.3 (foo)
```


### `echo_tmp_ghc_dir`
> Arguments:  _none_

Output the path to a temporary directory used while installing GHC.


### `validate_ghc_tag`
> Arguments:  _`ghc_tag`_

Parse a tag, checking that it is equal to the specified GHC tag.  Otherwise, return `1`.

```
$ echo "`echo_ghc_tag 7.8.3 foo`" | validate_ghc_tag "`echo_ghc_tag 7.8.3 foo`" ; echo $?
0
```
```
$ echo bar | validate_ghc_tag "`echo_ghc_tag 7.8.3 foo`" ; echo $?
1
```


### `detect_base_version`
> Arguments:  _none_

Output the `base` package version of the currently active GHC.

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
> Arguments:  _`ghc_tag ghc_version`_

TODO


### `strip_ghc`
> Arguments:  _`ghc_tag ghc_version`_

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
### `echo_cabal_default_version`
### `echo_cabal_config`
### `echo_cabal_tag`
### `echo_cabal_tag_version`
### `echo_cabal_tag_timestamp`
### `echo_cabal_archive`
### `echo_updated_cabal_tag_pattern`
### `echo_updated_cabal_archive_prefix`
### `echo_updated_cabal_archive_pattern`
### `echo_updated_cabal_archive_timestamp`
### `echo_cabal_description`
### `echo_tmp_cabal_dir`
### `validate_cabal_tag`
### `validate_updated_cabal_timestamp`
### `validate_updated_cabal_tag`
### `validate_updated_cabal_archive`
### `match_updated_cabal_archive`
### `cabal_do`
### `sandboxed_cabal_do`
### `cabal_update`
### `cabal_list_latest_package_version`
### `cabal_create_sandbox`
### `cabal_install`
### `cabal_install_deps`
### `cabal_configure_app`
### `cabal_build_app`
### `build_cabal`
### `update_cabal`
### `archive_cabal`
### `restore_cabal`
### `restore_archived_updated_cabal`
### `restore_updated_cabal`
### `infer_cabal_version`
### `activate_cabal`
### `deactivate_cabal`
### `install_cabal`




Sandbox installation functions { .funs }
------------------------------

TODO

> Contents of [`sandbox.sh`](https://github.com/mietek/halcyon/blob/master/src/sandbox.sh):


### `log_add_config_help`
### `echo_sandbox_tag`
### `echo_sandbox_tag_ghc_version`
### `echo_sandbox_tag_app_label`
### `echo_sandbox_tag_digest`
### `echo_sandbox_archive`
### `echo_sandbox_config`
### `echo_sandbox_config_ghc_version`
### `echo_sandbox_config_app_label`
### `echo_sandbox_config_digest`
### `echo_sandbox_config_prefix`
### `echo_sandbox_config_pattern`
### `echo_sandbox_description`
### `echo_tmp_sandbox_config`
### `echo_tmp_customize_sandbox_dir`
### `validate_sandbox_tag`
### `validate_sandbox_config`
### `build_sandbox`
### `strip_sandbox`
### `archive_sandbox`
### `restore_sandbox`
### `infer_sandbox_constraints`
### `infer_sandbox_digest`
### `locate_matched_sandbox_tag`
### `activate_sandbox`
### `deactivate_sandbox`
### `install_extended_sandbox`
### `install_sandbox`
### `customize_sandbox_with_execs`




App installation functions { .funs }
--------------------------

TODO

> Contents of [`app.sh`](https://github.com/mietek/halcyon/blob/master/src/app.sh):


### `echo_app_tag`
### `echo_app_tag_ghc_version`
### `echo_app_tag_app_label`
### `echo_app_archive`
### `echo_tmp_app_dir`
### `echo_tmp_old_app_dir`
### `echo_tmp_app_dist_dir`
### `validate_app_tag`
### `echo_fake_package`
### `fake_app_dir`
### `detect_app_package`
### `detect_app_name`
### `detect_app_version`
### `detect_app_executable`
### `detect_app_label`
### `configure_app`
### `build_app`
### `archive_app`
### `restore_app`
### `infer_app_tag`
### `install_app`




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

TODO


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

TODO


### `HALCYON_NO_PREBUILT_GHC`
> Default value:  `0`

TODO


### `HALCYON_NO_PREBUILT_CABAL`
> Default value:  `0`

TODO


### `HALCYON_NO_PREBUILT_SANDBOX`
> Default value:  `0`

TODO


### `HALCYON_NO_PREBUILT_APP`

TODO

> Default value:  `0`


### `HALCYON_FORCE_GHC_VERSION`
> Default value:  _none_

TODO


### `HALCYON_FORCE_CABAL_VERSION`
> Default value:  _none_

TODO


### `HALCYON_FORCE_CABAL_UPDATE`
> Default value:  `0`

TODO


### `HALCYON_TRIM_GHC`
> Default value:  `0`

TODO


### `HALCYON_CUSTOM_SCRIPT`
> Default value:  _none_

TODO


### `HALCYON_QUIET`
> Default value:  `0`

TODO
