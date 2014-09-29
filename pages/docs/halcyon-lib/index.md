---
title: halcyon-lib
body-class: toc
---


halcyon-lib
===========


Logging
-------

### prefix_log
> prefix arg*\

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
```
```
$ foo
-----> fooing... fooed
```


### log_indent
> arg*

Log arguments to _stderr_, prefixed with whitespace.

For less important messages than [log](#log).

```
$ log_indent subfooing
       subfooing
```


### log_indent_begin
> arg*

Like [log_begin](#log_begin), but with whitespace instead of an arrow marker.

To be paired with [log_end](#log_end).

```
function subfoo () {
  log_indent_begin subfooing...
  log_end subfooed
}
```
```
$ subfoo
       subfooing... subfooed
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
```
```
$ foo
   *** ERROR: foo
```


Expectation
-----------

### expect_args
> var* `-- "$@"`

Check the required number of arguments is available; otherwise, die.  Set the specified variables to the values of the corresponding arguments.

Must be called with `-- "$@"` after the variable names.  Argument values may be empty.

```
function foo () {
  local bar baz
  expect_args bar baz -- "$@"
  echo "${bar} ${baz}"
}
```
```
$ foo
   *** ERROR: foo: Expected args: bar baz
```
```
$ foo bar baz
bar baz
```


### expect_vars
> var*

Check the specified variables are available; otherwise, die.

Variables must not be unset, and variable values must not be empty.

```
function foo () {
  expect_vars BAR
  echo "${BAR}"
}
```
```
$ foo
   *** ERROR: foo: Expected var: BAR
```
```
$ BAR=bar
$ foo
bar
```


### expect_existing
> file*

Check the specified files exist; otherwise, die.

```
function foo () {
  expect_existing bar
  echo baz
}
```
```
$ foo
   *** ERROR: foo: Expected existing bar
```
```
$ touch bar
$ foo
baz
```


### expect_no_existing
> file*

Check the specified files do not exist; otherwise, die.

```
function foo () {
  expect_no_existing baz
  echo bar
}
```
```
$ foo
bar
```
```
$ touch baz
$ foo
   *** ERROR: foo: Unexpected existing baz
```


### has_vars
> var*

Check the specified variables are available; otherwise, return `1`.

Variables must not be unset, and variable values must not be empty.

```
function foo () {
  if has_vars BAR; then
    echo "${BAR}"
  else
    echo no BAR
  fi
}
```
```
$ foo
no BAR
```
```
$ BAR=bar
$ foo
bar
```


OS detection
------------

### echo_os_description
> os

Output a human-readable description of the specified OS identifier.

```
$ echo_os_description linux-ubuntu-14-04-x64
Ubuntu 14.04 LTS (x86_64)
```


### detect_arch

Output the architecture part of the host OS identifier.

```
$ detect_arch
x64
```


### detect_os

Output the host OS identifier.

```
$ detect_os
linux-ubuntu-14-04-x64
```


Quoting
-------

### sed_unbuffered
> arg*

Portable _sed_ with minimal buffering.


### quote

Pipe input to _stderr_, prefixed with whitespace.

Like [log_indent,](#log_indent) but for files.

```
$ echo foo | quote
       foo
```


### quote_quietly
> quiet cmd arg*

Execute the specified command with its output quoted or omitted, depending on the _quiet_ parameter and the exit status of the command.

When _quiet_ is `0`, output will always be quoted; otherwise, output will only be quoted if the command returns a non-zero exit status.

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

The sorting functions require GNU _sort_.


### filter_last

Output only the last line of input.

```
$ echo -e "foo\nbar\nbaz" | filter_last
baz
```


### filter_not_last

Output all lines of input except the last.

```
$ echo -e "foo\nbar\nbaz" | filter_not_last
foo
bar
```


### filter_matching
> regex

Output only the lines of input which match the specified regular expression, _awk_ flavor.

```
$ echo -e "foo\nbar\nbaz" | filter_matching '^bar$'
bar
```


### filter_not_matching
> regex

Output only the lines of input which do not match the specified regular expression, _awk_ flavor.

```
$ echo -e "foo\nbar\nbaz" | filter_not_matching '^bar$'
foo
baz
```


### match_at_most_one

Output up to one line of input when the input consists of up to one line; otherwise, return `1`.

```
$ echo foo | match_at_most_one
foo
```
```
$ echo -e "foo\nbar" | match_at_most_one
```

### match_at_least_one

Pipe input to output when the input consists of at least one line; otherwise, return `1`.

```
$ echo -e "foo\nbar" | match_at_least_one
foo
bar
```


### match_exactly_one

Output only one line of input when the input consists of only one line; otherwise, return `1`.

```
$ echo foo | match_exactly_one
foo
```
```
$ echo -e "foo\nbar" | match_exactly_one
```


### strip_trailing_newline

Pipe input to output, removing at most one trailing newline.

```
$ echo -e "foo\n\n" | strip_trailing_newline
foo
 
```
```
$ echo -e "foo\n" | strip_trailing_newline
foo
```


### sort_naturally

Portable version sort. 

Requires GNU _sort_.

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

Like [sort_naturally](#sort_naturally), but with `NUL` delimiters instead of newlines.

Requires GNU _sort_.


File operations
---------------

### find_added
> old_dir new_dir

### find_changed
> old_dir new_dir

### find_not_changed
> old_dir new_dir

### find_removed
> old_dir new_dir

### compare_recursively
> old_dir new_dir

### find_spaceless
> dir

### measure_recursively
> dir

### strip0


Archiving
---------

### echo_tar_format_flag
> archive_name

### tar_archive
> src_dir archive_file

### tar_extract
> archive_file dst_dir


Date formatting
---------------

### echo_date

Portable _date_.

Requires GNU _date_.


### echo_http_date
> args*

Output the UTC date and time in RFC 2822 format.

Requires GNU _date_.

```
$ echo_http_date
Fri, 26 Sep 2014 13:11:54 +0000
```


### echo_timestamp
> args*

Output the UTC date and time in a compact format.

Requires GNU _date_.

```
$ echo_timestamp
20140926131509
```


HTTP transfers
--------------

Requires _curl_.


### curl_do
> url

Wrapper for _curl_ with uniform logging and failure handling; used by every function in this module.

All messages are logged to _stderr_.


### curl_download
> src_file_url dst_file

Download the specified resource using HTTP `GET`; on failure, return `1`.

Will **not overwrite** existing files.

```
$ curl_download httpbin.org/get foo
       Downloading httpbin.org/get... done
```


### curl_check
> src_url

Check the specified resource using HTTP `HEAD`; on failure, return `1`.

```
$ curl_check httpbin.org/status/404
       Checking httpbin.org/status/404... 404
```


### curl_upload
> src_file dst_file_url

Upload the specified file using HTTP `PUT`; on failure, return `1`.

Will **overwrite** existing resources.

```
$ curl_upload foo httpbin.org/put
       Uploading httpbin.org/put... done
```


### curl_delete
> dst_url

Delete the specified resource using HTTP `DELETE`; on failure, return `1`.

```
$ curl_delete httpbin.org/delete
       Deleting httpbin.org/delete... done
```


Amazon S3 transfers
-------------------

Requires _curl_ and OpenSSL.


### echo_s3_host

Output the S3 hostname, `s3.amazonaws.com`.


### echo_s3_url
> resource

Output the S3 URL for the specified resource.

```
$ echo_s3_url /foo/bar
https://s3.amazonaws.com/foo/bar
```


### read_s3_listing_xml

Parse a S3 bucket listing in XML format into a file of S3 objects.


### s3_do
> url

S3-specific wrapper for [curl_do](#curl_do) with REST authentication; used by every function in this module.

All messages are logged to _stderr_.


### s3_download
> src_bucket src_object dst_file

Download the specified resource from S3 using HTTP `GET`; on failure, return `1`.

Will **not overwrite** existing files.

```
$ s3_download foo.halcyon.sh foo/bar bar
       Downloading s3://foo.halcyon.sh/foo/bar... done
```


### s3_list
> src_bucket src_prefix

List the contents of the specified S3 bucket, outputting resources starting with the specified prefix; on failure, return `1`.

The source prefix may be empty.

```
$ s3_list foo.halcyon.sh foo
       Listing s3://foo.halcyon.sh/?prefix=foo... done
foo/bar
```
```
$ s3_list foo.halcyon.sh ''
       Listing s3://foo.halcyon.sh/... done
foo/bar
bar/foo/baz
baz
```


### s3_check
> src_bucket src_object

Check the specified S3 resource using HTTP `HEAD`; on failure, return `1`.

The source object may be empty.

```
$ s3_check foo.halcyon.sh no-foo
       Checking s3://foo.halcyon.sh/no-foo... 404
```


### s3_upload
> src_file dst_bucket dst_object dst_acl

Upload the specified file to S3 using HTTP `PUT`; on failure, return `1`.

The destination resource will be available under the specified ACL; commonly used values are `private` and `public-read`.

Will **overwrite** existing resources.

```
$ s3_upload foo foo.halcyon.sh bar/foo private
       Uploading s3://foo.halcyon.sh/bar/foo... done
```


### s3_create
> dst_bucket dst_acl

Create an S3 bucket; on failure, return `1`.

Like with [s3_upload](#s3_upload), the specified ACL is applied to the destination bucket.

```
$ s3_create foo.halcyon.sh private
       Creating s3://foo.halcyon.sh/... done
```


### s3_copy
> src_bucket src_object dst_bucket dst_object dst_acl

Copy the specified resource on S3 in the most efficient way, without downloading and uploading the resource data; on failure, return `1`.

The source and destination may be in different S3 buckets.  Like with [s3_upload](#s3_upload), the specified ACL is applied to the destination resource.

```
$ s3_copy foo.halcyon.sh foo bar.halcyon.sh bar private
       Copying s3://foo.halcyon.sh/foo to s3://bar.halcyon.sh/bar... done
```


### s3_delete
> dst_bucket dst_object

Delete the specified resource from S3 using HTTP `DELETE`; on failure, return `1`.

To delete an S3 bucket, specify an empty source object.

```
$ s3_delete foo.halcyon.sh foo/bar
       Deleting s3://foo.halcyon.sh/foo/bar... done, 204
```
```
$ s3_delete foo.halcyon.sh ''
       Deleting s3://foo.halcyon-lib/... done, 204
```
