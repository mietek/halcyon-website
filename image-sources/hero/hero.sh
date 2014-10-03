#!/usr/bin/env bash

set -e

mkdir out

variants="568x378_small 1136x756_small@2x 1024x682_medium 2048x1364_medium@2x 1440x960_large 2880x1920_large@2x"

for variant in ${variants}; do
  size=${variant%_*}
  suffix=${variant#*_}
  convert hero.jpg -resize "${size}!" out/hero-${suffix}.jpg
done
