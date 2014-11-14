#!/usr/bin/env bash

set -e

mkdir out

variants="720x480_small 1440x960_medium 2880x1920_large"

for variant in ${variants}; do
  size=${variant%_*}
  suffix=${variant#*_}
  convert hero.jpg -resize "${size}!" out/hero-${suffix}.jpg
done
