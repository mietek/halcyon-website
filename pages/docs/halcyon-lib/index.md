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
$ prefix_log Foo bar
Foobar
```


### prefix_log_begin
> prefix arg*

Like [prefix_log](#prefix_log), but with a space instead of a newline at the end.


### log
> arg*

Log arguments to _stderr_, prefixed with an arrow marker.

```
$ log Fooing
-----> Fooing
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
  log_begin Fooing...
  log_end Fooed
}
```
```
$ foo
-----> Fooing... Fooed
```


### log_indent
> arg*

Log arguments to _stderr_, prefixed with whitespace.

For less important messages than [log](#log).

```
$ log_indent Subfooing
       Subfooing
```


### log_indent_begin
> arg*

Like [log_begin](#log_begin), but with whitespace instead of an arrow marker.

To be paired with [log_end](#log_end).

```
function subfoo () {
  log_indent_begin Subfooing...
  log_end Subfooed
}
```
```
$ subfoo
       Subfooing... Subfooed
```


### log_debug
> arg*

Log arguments to _stderr_, prefixed with a debug marker.

```
$ log_debug Foo
   *** DEBUG: Foo
```


### log_warning
> arg*

Log arguments to _stderr_, prefixed with a warning marker.

```
$ log_warning Foo
   *** WARNING: Foo
```


### log_error
> arg*

Log arguments to _stderr_, prefixed with an error marker.

```
$ log_error Foo
   *** ERROR: Foo
```


### die
> arg*

Log an error and exit with `1` as the exit status.

```
function foo () {
  false || die Foo
}
```
```
$ foo
   *** ERROR: Foo
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
$ foo Bar Baz
Bar Baz
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
$ BAR=Bar
$ foo
Bar
```


### expect_existing
> file*

Check the specified files exist; otherwise, die.

```
function foo () {
  expect_existing bar
  echo Baz
}
```
```
$ foo
   *** ERROR: foo: Expected existing bar
```
```
$ touch bar
$ foo
Baz
```


### expect_no_existing
> file*

Check the specified files do not exist; otherwise, die.

```
function foo () {
  expect_no_existing baz
  echo Bar
}
```
```
$ foo
Bar
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
$ BAR=Bar
$ foo
Bar
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
$ echo Foo | quote
       Foo
```


### quote_quietly
> quiet cmd arg*

Execute the specified command with its output quoted or omitted, depending on the _quiet_ parameter and the exit status of the command.

When _quiet_ is `0`, output will always be quoted; otherwise, output will only be quoted if the command exits with a non-zero exit status.

```sh
function foo () {
  echo Foo
  return 0
}
function bar () {
  echo Bar
  return 1
}
```
```
$ quote_quietly 0 foo
       Foo
$ quote_quietly 0 bar
       Bar
```
```
$ quote_quietly 1 foo
$ quote_quietly 1 bar
       Bar
```


Line processing
---------------

Requires GNU _sort_.

### filter_last

Output only the last line of input.

```
$ echo -e "Foo\nBar\nBaz" | filter_last
Baz
```


### filter_not_last

Output all lines of input except the last.

```
$ echo -e "Foo\nBar\nBaz" | filter_not_last
Foo
Bar
```


### filter_matching
> regex

Output only the lines of input which match the specified regular expression.

```
$ echo -e "Foo\nBar\nBaz" | filter_matching '^Bar$'
Bar
```


### filter_not_matching
> regex

Output only the lines of input which do not match the specified regular expression.

```
$ echo -e "Foo\nBar\nBaz" | filter_not_matching '^Bar$'
Foo
Baz
```


### match_at_most_one

### match_at_least_one

### match_exactly_one

### strip_trailing_newline

### sort_naturally

### sort0_naturally


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

Requires GNU _date_.

### echo_date

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

Requires _curl_.

### curl_do
> url

Wrapper for _curl_ with uniform logging and failure handling.


### curl_download
> src_file_url dst_file

Download the specified resource to file using HTTP `GET`; on failure, return `1`.

Will not overwrite existing files.

```
$ curl_download httpbin.org/get foo
       Downloading httpbin.org/get... done
```
```
$ curl_download httpbin.org/status/400 bar
       Downloading httpbin.org/status/400... 400
```


### curl_check
> src_url

Check the specified resource using HTTP `HEAD`; on failure, return `1`.

```
$ curl_check httpbin.org/get
       Checking httpbin.org/get... done
```
```
$ curl_check httpbin.org/status/400
       Checking httpbin.org/status/400... 400
```


### curl_upload
> src_file dst_file_url

Upload the specified file to resource using HTTP `PUT`; on failure, return `1`.

Will overwrite existing resources.

```
$ touch foo
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

Output the S3 host, `s3.amazonaws.com`.


### echo_s3_url
> resource

Output the S3 URL for the specified resource.

```
$ echo_s3_url /foo/bar
https://s3.amazonaws.com/foo/bar
```


### read_s3_listing_xml

Parse a XML-formatted S3 bucket listing into a file of S3 objects.


### s3_do
> url

S3-specific wrapper for _curl_ with uniform logging, failure handling, and authentication.


### s3_download
> src_bucket src_object dst_file

Download the specified S3 resource to file using HTTP `GET`; on failure, return `1`.

Will not overwrite existing files.

```
$ s3_download s3.halcyon.sh foo/bar bar
       Downloading s3://s3.halcyon.sh/foo/bar... done
```


### s3_list
> src_bucket src_prefix

List the contents of the specified S3 bucket, returning results starting with _src_prefix_; on failure, return `1`.

The source prefix may be empty.

```
$ s3_list s3.halcyon.sh ''
       Listing s3://s3.halcyon.sh/... done
foo/bar
foo/baz
```


### s3_check
> src_bucket src_object

Check the specified S3 resource using HTTP `HEAD`; on failure, return `1`.

```
$ s3_check s3.halcyon.sh foo/bar
       Checking s3://s3.halcyon.sh/foo/bar... done
```


### s3_upload
> src_file dst_bucket dst_object dst_acl

Upload the specified file to S3 resource using HTTP `PUT`; on failure, return `1`.

The destination resource will be available under the specified ACL; commonly used values are `private` and `public-read`.

Will overwrite existing resources.

```
$ touch foo
$ s3_upload foo test.halcyon.sh bar/foo private
       Uploading s3://test.halcyon.sh/bar/foo... done
```


### s3_create
> dst_bucket dst_acl

### s3_copy
> src_bucket src_object dst_bucket dst_object dst_acl

### s3_delete
> dst_bucket dst_object
