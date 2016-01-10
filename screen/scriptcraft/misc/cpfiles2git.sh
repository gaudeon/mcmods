#!/usr/bin/env bash

# Simple script to copy project files from the minecraft server to the git repo

# Location of minecraft server with scriptcraft plugin installed
MCDIR=""

# Location of files for screen modules / plugins
GITDIR=""


# List of files to cp from the minecraft server to the git repo
FILES[0]="/scriptcraft/modules/bukkit/dye-colors.js"
FILES[1]="/scriptcraft/modules/debug/index.js"
FILES[2]="/scriptcraft/modules/frame/index.js"
FILES[3]="/scriptcraft/modules/movie/index.js"
FILES[4]="/scriptcraft/modules/pixel/index.js"
FILES[5]="/scriptcraft/modules/screen/index.js"


if [ -d $MCDIR/scriptcraft ] && [ -d $GITDIR/scriptcraft ]; then
    for FILE in ${FILES[*]}; do
        if [ -e $MCDIR$FILE ]; then
            rsync -a $MCDIR$FILE $GITDIR$FILE 
        fi
    done
else
    echo "ERROR! Both MCDIR and GITDIR variables must be valid"
fi
