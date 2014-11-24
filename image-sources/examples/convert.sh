#!/usr/bin/env bash

set -eu -o pipefail

rm -rf output
mkdir output

width=2880
height=2880
gray6='#6d6661'

declare -A sizes
sizes[640x640]=''
sizes[1280x1280]='@2x'

files=( *.png )
for file in "${files[@]}"; do
	for size in "${!sizes[@]}"; do
		suffix="${sizes[${size}]}"
		convert "${file}" -crop "${width}x${height}+0+0" +repage -resize "${size}!" "output/${file%.png}-color${suffix}.jpg"
		convert "${file}" -crop "${width}x${height}+0+0" +repage -resize "${size}!" -colorspace gray \( +clone -fill "${gray6}" -colorize 100% \) -compose screen -composite "output/${file%.png}-gray${suffix}.jpg"
	done
done
