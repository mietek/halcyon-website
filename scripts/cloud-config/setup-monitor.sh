#!/usr/bin/env bash

echo -e 'HTTP/1.1 200 OK\r'
echo -e "Date: $( date -Ru )\r"
echo -e 'Access-Control-Allow-Origin: *\r'
echo -e 'Content-Type: text/plain; charset=utf-8\r'
echo -e 'Connection: close\r\n\r'

tail -n +0 -F --pid=$( <'/var/run/setup.pid' ) '/var/log/setup.log'

echo -en
echo -e '\r'

sleep 1
