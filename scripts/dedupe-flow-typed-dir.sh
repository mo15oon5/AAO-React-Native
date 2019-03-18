#!/bin/bash
# Usage: From root of project, run ./scripts/dedupe-flow-typed-dir.sh
# It outputs a diff of installed packages vs. packages with typedefs.
# It also outputs a list of any packages that have more than one typedef.

jq -r '[.dependencies,.devDependencies|keys[]][]' < package.json | sort | uniq > /tmp/aao-pkgs-list
find ./flow-typed/npm -type file | grep -v .DS_Store | cut -d/ -f 4,5 | cut -d_ -f 1 | sort | uniq > /tmp/aao-flow-typed-list
FILES="$(find ./flow-typed/npm -type file | grep -v .DS_Store | cut -d/ -f 4,5 | cut -d_ -f 1 | sort | uniq)"

echo "# diff #"
for file in $FILES; do
	if [[ ! -d ./node_modules/$file ]]; then echo "uh-oh $file"; fi
done
git diff --color --patience -- /tmp/aao-pkgs-list /tmp/aao-flow-typed-list | cat

echo
echo "# duplicate flow-typed files #"
find ./flow-typed/npm -type file | cut -d_ -f1 | sort | uniq -c | grep -v '^\s*1'
