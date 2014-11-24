#!/usr/bin/env bash

set -eu -o pipefail

rm -rf out
mkdir out

file='hero.jpg'

declare -A sizes
sizes[720x480]='-small'
sizes[1440x960]='-medium'
sizes[2880x1920]='-large'

for size in "${!sizes[@]}"; do
	suffix="${sizes[${size}]}"
	convert "${file}" -resize "${size}!" "out/${file%.jpg}${suffix}.jpg"
done
