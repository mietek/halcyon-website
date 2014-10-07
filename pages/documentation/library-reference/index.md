---
title: Library reference
page-class: add-section-toc
page-head: |
  <style>
    header a.link-docs {
      color: #3f96f0;
    }
  </style>
---


Library reference
=================

Documentation for [_bashmenot_](https://github.com/mietek/bashmenot/), a library of functions for safer shell scripting.

Intended for people interested in developing Halcyon, [Haskell on Heroku](http://haskellonheroku.com/), or other complex GNU _bash_ scripts.  Best read together with the source code.

> Contents:




Logging functions { .funs }
-----------------
> Dependencies:  _none_

Functions to simplify communication with the user.

> Contents of [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh):


### `prefix_log`
> Arguments:  _`prefix any*`_

Log arguments to error output, with the specified prefix.

```
$ prefix_log foo bar
foobar
```


### `prefix_log_begin`
> Arguments:  _`prefix any*`_

Like [`prefix_log`](#prefix_log), but with a space instead of a newline at the end.


### `log`
> Arguments:  _`any*`_

Log arguments to error output, prefixed by an arrow marker.

```
$ log fooing
-----> fooing
```


### `log_begin`
> Arguments:  _`any*`_

Like [`log`](#log), but with a space instead of a newline at the end.


### `log_end`
> Arguments:  _`any*`_

Log arguments to error output, with no prefix.

To be paired with [`log_begin`](#log_begin).

```
function foo () {
  log_begin fooing...
  log_end fooed
}
$ foo
-----> fooing... fooed
```


### `log_indent`
> Arguments:  _`any*`_

Log arguments to error output, prefixed by whitespace.

For less important messages than [`log`](#log).

```
$ log_indent baring
       baring
```


### `log_indent_begin`
> Arguments:  _`any*`_

Like [`log_begin`](#log_begin), but with whitespace instead of an arrow marker.

To be paired with [`log_end`](#log_end).

```
function bar () {
  log_indent_begin baring...
  log_end bared
}
$ bar
       baring... bared
```


### `log_debug`
> Arguments:  _`any*`_

Log arguments to error output, prefixed by a debug marker.

```
$ log_debug foo
   *** DEBUG: foo
```


### `log_warning`
> Arguments:  _`any*`_

Log arguments to error output, prefixed by a warning marker.

```
$ log_warning foo
   *** WARNING: foo
```


### `log_error`
> Arguments:  _`any*`_

Log arguments to error output, prefixed by an error marker.

```
$ log_error foo
   *** ERROR: foo
```


### `die`
> Arguments:  _`any*`_

Log an error and exit with `1` as the exit status.

```
function foo () {
  false || die foo
}
$ foo
   *** ERROR: foo
^D
```




Expectation control functions { .funs }
-----------------------------
> Dependencies:
> [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh)

Functions for declaring and checking preconditions, postconditions, and invariants.  Design by contract, now in GNU _bash_.

> Contents of [`expect.sh`](https://github.com/mietek/bashmenot/blob/master/src/expect.sh):


### `expect_args`
> Arguments:  _`var*`_ ` -- "$@"`

1.  Check the required number of arguments is available.  Otherwise, die.

2.  Set the specified variables to the values of corresponding arguments.

Must be called with a literal ` -- "$@"` after the variable names.  Argument values may be empty.

```
function foo () {
  local bar baz
  expect_args bar baz -- "$@"
  echo "${bar} ${baz}"
}
$ foo
   *** ERROR: foo: Expected args: bar baz
```


### `expect_vars`
> Arguments:  _`var*`_

Check the specified variables are available.  Otherwise, die.

Variables must not be unset, and variable values must not be empty.

```
function foo () {
  expect_vars BAR
  echo "${BAR}"
}
$ foo
   *** ERROR: foo: Expected var: BAR
```


### `expect_existing`
> Arguments:  _`file*`_

Check the specified files exist.  Otherwise, die.

```
function foo () {
  expect_existing bar
  cat bar
}
$ foo
   *** ERROR: foo: Expected existing bar
```


### `expect_no_existing`
> Arguments:  _`file*`_

Check the specified files do not exist.  Otherwise, die.

```
function foo () {
  expect_no_existing bar
  touch bar
}
$ touch bar
$ foo
   *** ERROR: foo: Unexpected existing bar
```


### `has_vars`
> Arguments:  _`var*`_

Check the specified variables are not unset and not empty.  Otherwise, return `1`.

```
function foo () {
  if has_vars BAR; then
    echo "${BAR}"
  else
    echo no bar
  fi
}
$ foo
no bar
```




OS detection functions { .funs }
----------------------
> Dependencies:
> [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh)

Basic functions for attempting cross-platform compatibility.

> Contents of [`os.sh`](https://github.com/mietek/bashmenot/blob/master/src/os.sh):


### `echo_os_description`
> Arguments:  _`os`_

Output a user-friendly description of the specified OS identifier.

```
$ echo_os_description linux-ubuntu-14-04-x64
Ubuntu 14.04 LTS (x86_64)
```


### `detect_arch`
> Arguments:  _none_

Output the architecture part of the host OS identifier.

```
$ detect_arch
x64
```


### `detect_os`
> Arguments:  _none_

Output the host OS identifier.

```
$ detect_os
linux-ubuntu-14-04-x64
```




Quoting functions { .funs }
-----------------

> Dependencies:
> [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh)
> [`os.sh`](https://github.com/mietek/bashmenot/blob/master/src/os.sh)

Additional functions to simplify communication with the user, including quiet mode support.

> Contents of [`quote.sh`](https://github.com/mietek/bashmenot/blob/master/src/quote.sh):


### `sed_unbuffered`
> Arguments:  _`any*`_

Portable _sed_ with minimal buffering.


### `quote`
> Arguments:  _none_

Like [`log_indent`](#log_indent), but for files.

Pipe input to error output, prefixed by whitespace.

```
$ echo foo | quote
       foo
```


### `quote_quietly`
> Arguments:  _`quiet cmd any*`_

Execute the specified command with its output quoted or omitted, depending on the value of _`quiet`_ and the exit status of the command.

If _`quiet`_ is `0`, output is always quoted.  Otherwise, output is quoted if the command returns a non-zero exit status.

```
function foo () {
  echo foo
  return 0
}
$ quote_quietly 0 foo
       foo
$ quote_quietly 1 foo
```
```
function bar () {
  echo bar
  return 1
}
$ quote_quietly 0 bar
       bar
$ quote_quietly 1 bar
       bar
```




Line processing functions { .funs }
-------------------------

> Dependencies:
> [`expect.sh`](https://github.com/mietek/bashmenot/blob/master/src/expect.sh)

Basic functions for composable line-oriented processing of text data files.

> Contents of [`line.sh`](https://github.com/mietek/bashmenot/blob/master/src/line.sh):


### `filter_last`
> Arguments:  _none_

Output the last line of input.

Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_last
baz
```


### `filter_not_last`
> Arguments:  _none_

Output all lines of input except the last.

Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_not_last
foo
bar
```


### `filter_matching`
> Arguments:  _`regex`_

Output all lines of input which match the specified regular expression.

Wrapper for _awk_.  Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_matching '^bar$'
bar
```


### `filter_not_matching`
> Arguments:  _`regex`_

Output all lines of input which do not match the specified regular expression.

Wrapper for _awk_.  Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_not_matching '^bar$'
foo
baz
```


### `match_at_most_one`
> Arguments:  _none_

Output up to one line of input if the input consists of up to one line.  Otherwise, return `1`.

```
$ echo -n | match_at_most_one ; echo $?
0
```
```
$ echo foo | match_at_most_one ; echo $?
foo
0
```
```
$ echo -e "foo\nbar" | match_at_most_one ; echo $?
1
```


### `match_at_least_one`
> Arguments:  _none_

Pipe input to output if the input consists of one line or more.  Otherwise, return `1`.

```
$ echo -n | match_at_least_one ; echo $?
1
```
```
$ echo foo | match_at_least_one ; echo $?
foo
0
```
```
$ echo -e "foo\nbar" | match_at_least_one ; echo $?
foo
bar
0
```


### `match_exactly_one`
> Arguments:  _none_

Output one line of input if the input consists of only one line.  Otherwise, return `1`.

```
$ echo -n | match_exactly_one ; echo $?
1
```
```
$ echo foo | match_exactly_one ; echo $?
foo
0
```
```
$ echo -e "foo\nbar" | match_exactly_one ; echo $?
1
```


### `strip_trailing_newline`
> Arguments:  _none_

Pipe input to output, removing at most one trailing newline.

```
$ echo foo | strip_trailing_newline ; echo
foo
```
```
$ echo -e "foo\n" | strip_trailing_newline
foo
```




Sorting functions { .funs }
-----------------

> Dependencies:
> [`os.sh`](https://github.com/mietek/bashmenot/blob/master/src/os.sh)

Cross-platform compatibility functions.  GNU _sort_ is required.

> Contents of [`sort.sh`](https://github.com/mietek/bashmenot/blob/master/src/sort.sh):


### `sort_naturally`
> Arguments:  _none_

Portable version sort, also known as natural sorting order.

```
$ echo -e "foo-1\nfoo-12\nfoo-2" | sort_naturally
foo-1
foo-2
foo-12
```
```
$ echo -e "foo-1\nfoo-12\nfoo-2" | sort
foo-1
foo-12
foo-2
```


### `sort0_naturally`
> Arguments:  _none_

Like [`sort_naturally`](#sort_naturally), but with input separated by `NUL` bytes instead of newlines.




Date formatting functions { .funs }
-------------------------

> Dependencies:
> [`os.sh`](https://github.com/mietek/bashmenot/blob/master/src/os.sh)

Cross-platform compatibility functions.  GNU _date_ is required.

> Contents of [`date.sh`](https://github.com/mietek/bashmenot/blob/master/src/date.sh):


### `echo_date`
> Arguments:  _`args*`_

Portable _date_.


### `echo_http_date`
> Arguments:  _`args*`_

Output a UTC date and time in RFC 2822 format.

```
$ echo_http_date
Fri, 26 Sep 2014 13:11:54 +0000
```


### `echo_timestamp`
> Arguments:  _`args*`_

Output a UTC date and time in a compact format.

```
$ echo_timestamp
20140926131509
```




File system manipulation functions { .funs }
----------------------------------

> Dependencies:
> [`expect.sh`](https://github.com/mietek/bashmenot/blob/master/src/expect.sh),
> [`line.sh`](https://github.com/mietek/bashmenot/blob/master/src/line.sh)

Functions for user-friendly communication of file system changes to the user, and file utilities.

> Contents of [`file.sh`](https://github.com/mietek/bashmenot/blob/master/src/file.sh):


### `find_added`
> Arguments:  _`old_dir new_dir`_

Output paths to files which exist in the old directory and do not exist in the new one, in natural order.

```
$ mkdir foo1 foo2
$ touch foo2/bar2
$ find_added foo1 foo2
bar2
```


### `find_changed`
> Arguments:  _`old_dir new_dir`_

Output paths to files which differ between the two directories, in natural order.

```
$ mkdir foo1 foo2
$ echo bar1 >foo1/bar
$ echo bar2 >foo2/bar
$ find_changed foo1 foo2
bar
```


### `find_not_changed`
> Arguments:  _`old_dir new_dir`_

Output paths to files which do not differ between the two directories, in natural order.

```
$ mkdir foo1 foo2
$ echo baz >foo1/baz
$ echo baz >foo2/baz
$ find_not_changed foo1 foo2
baz
```


### `find_removed`
> Arguments:  _`old_dir new_dir`_

Output paths to files which exist in the old directory and do not exist in the new one, in natural order.

```
$ mkdir foo1 foo2
$ touch foo1/bar1
$ find_removed foo1 foo2
bar1
```


### `compare_recursively`
> Arguments:  _`old_dir new_dir`_

Like [`find_added`](#find_added), [`find_changed`](#find_changed), [`find_not_changed`](#find_not_changed), and [`find_removed`](#find_removed) combined.

The paths are prefixed by `+` for added, `*` for changed, `=` for not changed, and `-` for removed.

```
$ mkdir foo1 foo2
$ touch foo1/bar1 foo2/bar2
$ echo bar1 >foo1/bar
$ echo bar2 >foo2/bar
$ echo baz >foo1/baz
$ echo baz >foo2/baz
$ compare_recursively foo1 foo2
- bar1
+ bar2
* bar
= baz
```


### `find_spaceless_recursively`
> Arguments:  _`dir`_

Output all paths containing no spaces to files which are descendants of the specified directory.

```
$ mkdir foo 'foo/foo bar'
$ touch foo/baz 'foo/foo bar/baz'
$ find_spaceless_recursively foo
foo/baz
```


### `measure_recursively`
> Arguments:  _`dir`_

Output a user-friendly measure of the total amount of data contained in the descendants of the specified directory.

```
$ mkdir foo
$ measure_recursively foo
0B
```


### `strip0`
> Arguments:  _none_

Process a file of paths separated by `NUL` bytes, removing symbols from each listed file.




File archiving functions { .funs }
------------------------

> Dependencies:
> [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh),
> [`expect.sh`](https://github.com/mietek/bashmenot/blob/master/src/expect.sh),
> [`file.sh`](https://github.com/mietek/bashmenot/blob/master/src/file.sh)

Functions to simplify cross-platform archiving of files, with added safety.

> Contents of [`tar.sh`](https://github.com/mietek/bashmenot/blob/master/src/tar.sh):


### `echo_tar_format_flag`
> Arguments:  _`archive_name`_

Output the flag needed for non-GNU _tar_ to recognize the compression format of the specified archive.

```
$ echo_tar_format_flag foo.tar.gz
-z
```
```
$ echo_tar_format_flag bar.tar.xz
-J
```


### `tar_archive`
> Arguments:  _`src_dir archive_file`_

Archive the specified directory, using a compression format determined by the name of the archive.

Does not overwrite existing files.  Creates the destination directory if needed.


### `tar_extract`
> Arguments:  _`archive_file dst_dir`_

Extract the specified archive in the destination directory, creating the directory if needed.

Does not overwrite the contents of existing directories.

```
$ mkdir -p foo/bar1
$ touch foo/bar1/bar
$ tar_archive foo/bar1 foo/baz/bar.tar.gz
       Archiving bar.tar.gz... done, 4.0K
$ tar_extract foo/baz/bar.tar.gz foo/bar2
       Extracting bar.tar.gz... done
$ find foo
foo
foo/bar1
foo/bar1/bar
foo/bar2
foo/bar2/bar
foo/baz
foo/baz/bar.tar.gz
```




HTTP transfer functions { .funs }
-----------------------

> Dependencies:
> [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh),
> [`expect.sh`](https://github.com/mietek/bashmenot/blob/master/src/expect.sh)

Functions to simplify HTTP transfers, with user-friendly logging and failure handling.  _curl_ is required.

> Contents of [`curl.sh`](https://github.com/mietek/bashmenot/blob/master/src/curl.sh):


### `curl_do`
> Arguments:  _`url`_

Wrapper for _curl_,  Used by every function in this module.

All messages are logged to error output.


### `curl_download`
> Arguments:  _`src_file_url dst_file`_

Download the specified resource with HTTP `GET`.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.

```
$ curl_download httpbin.org/get foo
       Downloading httpbin.org/get... done
```


### `curl_check`
> Arguments:  _`src_url`_

Access the specified resource with HTTP `HEAD`.

Returns `1` on failure.

```
$ curl_check httpbin.org/status/404
       Checking httpbin.org/status/404... 404
```


### `curl_upload`
> Arguments:  _`src_file dst_file_url`_

Upload the specified file with HTTP `PUT`.

**Overwrites** existing resources without warning.  Returns `1` on failure.

```
$ curl_upload foo httpbin.org/put
       Uploading httpbin.org/put... done
```


### `curl_delete`
> Arguments:  _`dst_url`_

Delete the specified resource with HTTP `DELETE`.

Returns `1` on failure.

```
$ curl_delete httpbin.org/delete
       Deleting httpbin.org/delete... done
```




Amazon S3 transfer functions { .funs }
----------------------------

> Dependencies:
> [`log.sh`](https://github.com/mietek/bashmenot/blob/master/src/log.sh),
> [`expect.sh`](https://github.com/mietek/bashmenot/blob/master/src/expect.sh),
> [`line.sh`](https://github.com/mietek/bashmenot/blob/master/src/line.sh),
> [`date.sh`](https://github.com/mietek/bashmenot/blob/master/src/date.sh),
> [`curl.sh`](https://github.com/mietek/bashmenot/blob/master/src/curl.sh)

Functions to simplify Amazon S3 transfers, with user-friendly logging and failure handling.  _curl_ and OpenSSL are required.

Authentication details are defined by the [`HALCYON_AWS_ACCESS_KEY_ID`](#halcyon_aws_access_key_id) and [`HALCYON_AWS_SECRET_ACCESS_KEY`](#halcyon_aws_secret_access_key) environment variables.

> Contents of [`s3.sh`](https://github.com/mietek/bashmenot/blob/master/src/s3.sh):


### `echo_s3_host`
> Arguments:  _none_

Output the S3 hostname, `s3.amazonaws.com`.


### `echo_s3_url`
> Arguments:  _`resource`_

Output the S3 URL of the specified resource.

```
$ echo_s3_url /foo/bar
https://s3.amazonaws.com/foo/bar
```


### `read_s3_listing_xml`
> Arguments:  _none_

Parse an S3 bucket listing in XML format into a file of objects.


### `s3_do`
> Arguments:  _`url`_

S3-specific wrapper for [`curl_do`](#curl_do) with REST authentication.  Used by every function in this module.

All messages are logged to error output.


### `s3_download`
> Arguments:  _`src_bucket src_object dst_file`_

Download the specified resource from S3 with HTTP `GET`.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.

```
$ s3_download foo.halcyon.sh foo/bar bar
       Downloading s3://foo.halcyon.sh/foo/bar... done
```


### `s3_list`
> Arguments:  _`src_bucket src_prefix`_

Output the contents of the specified S3 bucket with HTTP `GET`, listing the resources which start with the specified prefix.

An empty prefix can be specified to list the contents of bucket without any filtering.

Returns `1` on failure.

```
$ s3_list foo.halcyon.sh foo
       Listing s3://foo.halcyon.sh/?prefix=foo... done
foo/bar
```
```
$ s3_list foo.halcyon.sh ''
       Listing s3://foo.halcyon.sh/... done
foo/bar
bar/baz/foo
baz
```


### `s3_check`
> Arguments:  _`src_bucket src_object`_

Access the specified S3 resource with HTTP `HEAD`.

An empty source object can be specified to access the bucket itself.

Returns `1` on failure.

```
$ s3_check foo.halcyon.sh no-foo
       Checking s3://foo.halcyon.sh/no-foo... 404
```


### `s3_upload`
> Arguments:  _`src_file dst_bucket dst_object dst_acl`_

Upload the specified file to S3 with HTTP `PUT`.

The destination resource is assigned the specified ACL.  Commonly used values are `private` and `public-read`.

**Overwrites** existing resources without warning.  Returns `1` on failure.

```
$ s3_upload foo foo.halcyon.sh bar/foo private
       Uploading s3://foo.halcyon.sh/bar/foo... done
```


### `s3_create`
> Arguments:  _`dst_bucket dst_acl`_

Create an S3 bucket with HTTP `PUT`.

As with [`s3_upload`](#s3_upload), the destination is assigned the specified ACL.

Returns `1` on failure.

```
$ s3_create foo.halcyon.sh private
       Creating s3://foo.halcyon.sh/... done
```


### `s3_copy`
> Arguments:  _`src_bucket src_object dst_bucket dst_object dst_acl`_

Copy the specified resource on S3 with HTTP `PUT` without downloading or uploading the resource data.

The source and destination may be the same bucket or separate buckets.

As with [`s3_upload`](#s3_upload), the destination is assigned the specified ACL.

Returns `1` on failure.

```
$ s3_copy foo.halcyon.sh foo bar.halcyon.sh bar private
       Copying s3://foo.halcyon.sh/foo to s3://bar.halcyon.sh/bar... done
```


### `s3_delete`
> Arguments:  _`dst_bucket dst_object`_

Delete the specified resource from S3 with HTTP `DELETE`.

An empty destination object is used to delete the bucket itself.

Returns `1` on failure.

```
$ s3_delete foo.halcyon.sh foo/bar
       Deleting s3://foo.halcyon.sh/foo/bar... done, 204
```
```
$ s3_delete foo.halcyon.sh ''
       Deleting s3://foo.halcyon.sh/... done, 204
```




Environment variables { .vars }
---------------------


### `HALCYON_AWS_ACCESS_KEY_ID`
> Default value:  _none_

Part of the authentication details used by all [Amazon S3 transfer functions](#amazon-s3-transfer-functions).


### `HALCYON_AWS_SECRET_ACCESS_KEY`
> Default value:  _none_

Like [`HALCYON_AWS_ACCESS_KEY_ID`](#halcyon_aws_access_key_id), but secret.
