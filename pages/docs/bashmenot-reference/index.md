---
title: bashmenot reference
html-class: insert-toc
---


bashmenot reference
===================


Logging
-------

No dependencies.


> [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh):

### prefix_log
> prefix arg*

Log arguments to _stderr_ with the specified prefix.

```
$ prefix_log foo bar
foobar
```


### prefix_log_begin
> prefix arg*

Like [prefix_log](#prefix_log), but with a space instead of a newline at the end.


### log
> arg*

Log arguments to _stderr_, prefixed with an arrow marker.

```
$ log fooing
-----> fooing
```


### log_begin
> arg*

Like [log](#log), but with a space instead of a newline at the end.


### log_end
> arg*

Log arguments to _stderr_ with no prefix.

To be paired with [log_begin](#log_begin).

```
function foo () {
  log_begin fooing...
  log_end fooed
}
$ foo
-----> fooing... fooed
```


### log_indent
> arg*

Log arguments to _stderr_, prefixed with whitespace.

For less important messages than [log](#log).

```
$ log_indent baring
       baring
```


### log_indent_begin
> arg*

Like [log_begin](#log_begin), but with whitespace instead of an arrow marker.

To be paired with [log_end](#log_end).

```
function bar () {
  log_indent_begin baring...
  log_end bared
}
$ bar
       baring... bared
```


### log_debug
> arg*

Log arguments to _stderr_, prefixed with a debug marker.

```
$ log_debug foo
   *** DEBUG: foo
```


### log_warning
> arg*

Log arguments to _stderr_, prefixed with a warning marker.

```
$ log_warning foo
   *** WARNING: foo
```


### log_error
> arg*

Log arguments to _stderr_, prefixed with an error marker.

```
$ log_error foo
   *** ERROR: foo
```


### die
> arg*

Log an error and exit with `1` as the exit status.

```
function foo () {
  false || die foo
}
$ foo
   *** ERROR: foo
```


Expecting preconditions
-----------------------

Depends on [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh).


> [expect.sh](https://github.com/mietek/bashmenot/blob/master/src/expect.sh):

### expect_args
> var* `-- "$@"`

- Check the required number of arguments is available.  Otherwise, die.
- Set the specified variables to the values of corresponding arguments.

Must be called with `-- "$@"` after the variable names.  Argument values may be empty.

```
function foo () {
  local bar baz
  expect_args bar baz -- "$@"
  echo "${bar} ${baz}"
}
$ foo
   *** ERROR: foo: Expected args: bar baz
```


### expect_vars
> var*

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


### expect_existing
> file*

Check the specified files exist.  Otherwise, die.

```
function foo () {
  expect_existing bar
  cat bar
}
$ foo
   *** ERROR: foo: Expected existing bar
```


### expect_no_existing
> file*

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


### has_vars
> var*

Check the specified variables are not unset and not empty.  Otherwise, return `1`.

```
function foo () {
  if has_vars BAR; then
    echo "${BAR}"
  else
    echo no BAR
  fi
}
$ foo
no BAR
```


OS detection
------------

Depends on [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh).


> [os.sh](https://github.com/mietek/bashmenot/blob/master/src/os.sh):

### echo_os_description
> os

Output a human-readable description of the specified OS identifier.

```
$ echo_os_description linux-ubuntu-14-04-x64
Ubuntu 14.04 LTS (x86_64)
```


### detect_arch
>

Output the architecture part of the host OS identifier.

```
$ detect_arch
x64
```


### detect_os
>

Output the host OS identifier.

```
$ detect_os
linux-ubuntu-14-04-x64
```


Quoting
-------

Depends on [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh) and [os.sh](https://github.com/mietek/bashmenot/blob/master/src/os.sh).


> [quote.sh](https://github.com/mietek/bashmenot/blob/master/src/quote.sh):

### sed_unbuffered
> arg*

Portable _sed_ with minimal buffering.


### quote
>

Pipe input to _stderr_, prefixed with whitespace.

Like [log_indent,](#log_indent) but for files.

```
$ echo foo | quote
       foo
```


### quote_quietly
> quiet cmd arg*

Execute the specified command with its output quoted or omitted, depending on the value of _quiet_ and the exit status of the command.

If _quiet_ is `0`, output is always quoted.  Otherwise, output is quoted if the command returns a non-zero exit status.

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


Line processing
---------------

Depends on [expect.sh](https://github.com/mietek/bashmenot/blob/master/src/expect.sh).


> [line.sh](https://github.com/mietek/bashmenot/blob/master/src/line.sh):

### filter_last
>

Output the last line of input.

Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_last
baz
```


### filter_not_last
>

Output all lines of input except the last.

Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_not_last
foo
bar
```


### filter_matching
> regex

Output lines of input which match the specified regular expression.

Wrapper for _awk_.  Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_matching '^bar$'
bar
```


### filter_not_matching
> regex

Output lines of input which do not match the specified regular expression.

Wrapper for _awk_.  Never fails.

```
$ echo -e "foo\nbar\nbaz" | filter_not_matching '^bar$'
foo
baz
```


### match_at_most_one
>

Output up to one line of input if the input consists of up to one line.  Otherwise, return `1`.

```
$ echo -n | match_at_most_one
```
```
$ echo foo | match_at_most_one
foo
```
```
$ echo -e "foo\nbar" | match_at_most_one ; echo $?
1
```


### match_at_least_one
>

Pipe input to output if the input consists of one line or more.  Otherwise, return `1`.

```
$ echo -n | match_at_least_one ; echo $?
1
```
```
$ echo foo | match_at_least_one
foo
```
```
$ echo -e "foo\nbar" | match_at_least_one
foo
bar
```


### match_exactly_one
>

Output one line of input if the input consists of only one line.  Otherwise, return `1`.

```
$ echo -n | match_exactly_one ; echo $?
1
```
```
$ echo foo | match_exactly_one
foo
```
```
$ echo -e "foo\nbar" | match_exactly_one ; echo $?
1
```


### strip_trailing_newline
>

Pipe input to output, removing at most one trailing newline.

```
echo foo | strip_trailing_newline ; echo
foo
```
```
$ echo -e "foo\n" | strip_trailing_newline
foo
```


Sorting
-------

Requires GNU _sort_.  Depends on [os.sh](https://github.com/mietek/bashmenot/blob/master/src/os.sh).


> [sort.sh](https://github.com/mietek/bashmenot/blob/master/src/sort.sh):

### sort_naturally
>

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


### sort0_naturally
>

Like [sort_naturally](#sort_naturally), but with input separated by `NUL` bytes instead of newlines.


File operations
---------------

Depends on [expect.sh](https://github.com/mietek/bashmenot/blob/master/src/expect.sh) and [line.sh](https://github.com/mietek/bashmenot/blob/master/src/line.sh).


> [file.sh](https://github.com/mietek/bashmenot/blob/master/src/file.sh):

### find_added
> old_dir new_dir

Output paths to files which exist in the old directory and do not exist in the new one, in natural order.

```
$ mkdir foo1 foo2
$ touch foo2/bar2
$ find_added foo1 foo2
bar2
```


### find_changed
> old_dir new_dir

Output paths to files which differ between the two directories, in natural order.

```
$ mkdir foo1 foo2
$ echo bar1 >foo1/bar
$ echo bar2 >foo2/bar
$ find_changed foo1 foo2
bar
```


### find_not_changed
> old_dir new_dir

Output paths to files which do not differ between the two directories, in natural order.

```
$ mkdir foo1 foo2
$ echo baz >foo1/baz
$ echo baz >foo2/baz
$ find_not_changed foo1 foo2
baz
```


### find_removed
> old_dir new_dir

Output paths to files which exist in the old directory and do not exist in the new one, in natural order.

```
$ mkdir foo1 foo2
$ touch foo1/bar1
$ find_removed foo1 foo2
bar1
```


### compare_recursively
> old_dir new_dir

Like [find_added](#find_added), [find_changed](#find_changed), [find_not_changed](#find_not_changed), and [find_removed](#find_removed) combined.

The paths are prefixed with `+` for added, `*` for changed, `=` for not changed, and `-` for removed.

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


### find_spaceless_recursively
> dir

Output paths to all files in the specified directory which are reachable using paths which do not contain spaces.

```
$ mkdir foo 'foo/foo bar'
$ touch foo/baz 'foo/foo bar/baz'
$ find_spaceless_recursively foo
foo/baz
```


### measure_recursively
> dir

Output a human-readable size of the contents of the specified directory.

```
$ mkdir foo
$ measure_recursively foo
0B
```


### strip0

Remove symbols from each file specified in input, separated by `NUL` bytes.


Archiving
---------

Depends on [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh), [expect.sh](https://github.com/mietek/bashmenot/blob/master/src/expect.sh), and [file.sh](https://github.com/mietek/bashmenot/blob/master/src/file.sh).


> [tar.sh](https://github.com/mietek/bashmenot/blob/master/src/tar.sh):

### echo_tar_format_flag
> archive_name

Output the flag needed for non-GNU _tar_ to recognize the compression format of the specified archive.

```
$ echo_tar_format_flag foo.tar.gz
-z
```
```
$ echo_tar_format_flag bar.tar.xz
-J
```


### tar_archive
> src_dir archive_file

Archive the specified directory, using a compression format determined by the name of the archive.

Does not overwrite existing files.  Creates the destination directory if needed.


### tar_extract
> archive_file dst_dir

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


Date formatting
---------------

Requires GNU _date_.  Depends on [os.sh](https://github.com/mietek/bashmenot/blob/master/src/os.sh).


> [date.sh](https://github.com/mietek/bashmenot/blob/master/src/date.sh):

### echo_date
> args*

Portable _date_.


### echo_http_date
> args*

Output the UTC date and time in RFC 2822 format.

```
$ echo_http_date
Fri, 26 Sep 2014 13:11:54 +0000
```


### echo_timestamp
> args*

Output the UTC date and time in a compact format.

```
$ echo_timestamp
20140926131509
```


HTTP transfers
--------------

Requires _curl_.  Depends on [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh) and [expect.sh](https://github.com/mietek/bashmenot/blob/master/src/expect.sh).


> [curl.sh](https://github.com/mietek/bashmenot/blob/master/src/curl.sh):

### curl_do
> url

Wrapper for _curl_ with uniform logging and failure handling.  Used by every function in this module.

All messages are logged to _stderr_.


### curl_download
> src_file_url dst_file

Download the specified resource with HTTP `GET`.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.

```
$ curl_download httpbin.org/get foo
       Downloading httpbin.org/get... done
```


### curl_check
> src_url

Access the specified resource with HTTP `HEAD`.

Returns `1` on failure.

```
$ curl_check httpbin.org/status/404
       Checking httpbin.org/status/404... 404
```


### curl_upload
> src_file dst_file_url

Upload the specified file with HTTP `PUT`.

**Overwrites** existing resources without warning.  Returns `1` on failure.

```
$ curl_upload foo httpbin.org/put
       Uploading httpbin.org/put... done
```


### curl_delete
> dst_url

Delete the specified resource with HTTP `DELETE`.

Returns `1` on failure.

```
$ curl_delete httpbin.org/delete
       Deleting httpbin.org/delete... done
```


Amazon S3 transfers
-------------------

Requires _curl_ and OpenSSL.  Depends on [log.sh](https://github.com/mietek/bashmenot/blob/master/src/log.sh), [expect.sh](https://github.com/mietek/bashmenot/blob/master/src/expect.sh), [line.sh](https://github.com/mietek/bashmenot/blob/master/src/line.sh), [date.sh](https://github.com/mietek/bashmenot/blob/master/src/date.sh), and [curl.sh](https://github.com/mietek/bashmenot/blob/master/src/curl.sh).

Authentication details are defined by `BASHMENOT_AWS_ACCESS_KEY_ID` and `BASHMENOT_AWS_SECRET_ACCESS_KEY`.


> [s3.sh](https://github.com/mietek/bashmenot/blob/master/src/s3.sh):

### echo_s3_host
>

Output the S3 hostname, `s3.amazonaws.com`.


### echo_s3_url
> resource

Output the S3 URL for the specified resource.

```
$ echo_s3_url /foo/bar
https://s3.amazonaws.com/foo/bar
```


### read_s3_listing_xml
>

Parse a S3 bucket listing in XML format into a file of S3 objects.


### s3_do
> url

S3-specific wrapper for [curl_do](#curl_do) with REST authentication.  Used by every function in this module.

All messages are logged to _stderr_.


### s3_download
> src_bucket src_object dst_file

Download the specified resource from S3 with HTTP `GET`.

Does not overwrite existing files.  Creates the destination directory if needed.  Returns `1` on failure.

```
$ s3_download foo.halcyon.sh foo/bar bar
       Downloading s3://foo.halcyon.sh/foo/bar... done
```


### s3_list
> src_bucket src_prefix

Output the contents of the specified S3 bucket with HTTP `GET`, listing the resources which start with the specified prefix.

The source prefix may be empty.

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


### s3_check
> src_bucket src_object

Access the specified S3 resource with HTTP `HEAD`.

The source object may be empty.

Returns `1` on failure.

```
$ s3_check foo.halcyon.sh no-foo
       Checking s3://foo.halcyon.sh/no-foo... 404
```


### s3_upload
> src_file dst_bucket dst_object dst_acl

Upload the specified file to S3 with HTTP `PUT`.

The destination resource is assigned the specified ACL.  Commonly used values are `private` and `public-read`.

**Overwrites** existing resources without warning.  Returns `1` on failure.

```
$ s3_upload foo foo.halcyon.sh bar/foo private
       Uploading s3://foo.halcyon.sh/bar/foo... done
```


### s3_create
> dst_bucket dst_acl

Create an S3 bucket with HTTP `PUT`.

As with [s3_upload](#s3_upload), the destination is assigned the specified ACL.

Returns `1` on failure.

```
$ s3_create foo.halcyon.sh private
       Creating s3://foo.halcyon.sh/... done
```


### s3_copy
> src_bucket src_object dst_bucket dst_object dst_acl

Copy the specified resource on S3 with HTTP `PUT` without downloading or uploading the resource data.

The source and destination may be the same bucket or separate buckets.

As with [s3_upload](#s3_upload), the destination is assigned the specified ACL.

Returns `1` on failure.

```
$ s3_copy foo.halcyon.sh foo bar.halcyon.sh bar private
       Copying s3://foo.halcyon.sh/foo to s3://bar.halcyon.sh/bar... done
```


### s3_delete
> dst_bucket dst_object

Delete the specified resource from S3 with HTTP `DELETE`.

The destination object may be empty.

Returns `1` on failure.

```
$ s3_delete foo.halcyon.sh foo/bar
       Deleting s3://foo.halcyon.sh/foo/bar... done, 204
```
```
$ s3_delete foo.halcyon.sh ''
       Deleting s3://foo.halcyon.sh/... done, 204
```
