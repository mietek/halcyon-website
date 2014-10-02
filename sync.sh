#!/bin/sh

s3cmd sync --acl-public --exclude='*.git*' --delete-removed --no-preserve out/pub/ s3://halcyon.sh
