#!/usr/bin/env bash

set -e -o pipefail

rm -rf input
mkdir input

declare -A examples
examples[haskell-lang]='http://haskell-lang.org/'
examples[circuithub]='http://circuithub.com/'
examples[howistart]='http://howistart.org/'
examples[tryhaskell]='http://tryhaskell.org/'
examples[tryidris]='http://tryidris.org/'
examples[trypurescript]='http://try.purescript.org/'
examples[tryhaste]='http://tryplayg.herokuapp.com/'
examples[gitit]='http://gitit.net/'

for example in "${!examples[@]}"; do
	url="${examples[${example}]}"
	webkit2png "${url}" --width=1440 --height=1440 --fullsize --dir=input --filename="${example}"
	mv "input/${example}-full.png" "input/example-${example}.png"
done
