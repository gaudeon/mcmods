#!/usr/bin/env bash

# Simple script to copy project files from the minecraft server to the git repo

# Location of minecraft server with scriptcraft plugin installed
MCDIR=""

# Location of files for screen modules / plugins
GITDIR=""


# List of files to cp from the minecraft server to the git repo
FILES[0]="/scriptcraft/modules/bukkit/dye-colors.js"
FILES[1]="/scriptcraft/modules/debug/index.js"
FILES[2]="/scriptcraft/modules/screen/event.js"
FILES[3]="/scriptcraft/modules/screen/frame.js"
FILES[4]="/scriptcraft/modules/screen/movie.js"
FILES[5]="/scriptcraft/modules/screen/pixel.js"
FILES[6]="/scriptcraft/modules/screen/screen.js"
FILES[7]="/scriptcraft/plugins/screen.js"


if [ -d $MCDIR/scriptcraft ] && [ -d $GITDIR/scriptcraft ]; then
    for FILE in ${FILES[*]}; do
        if [ -e $MCDIR$FILE ]; then
            rsync -a $MCDIR$FILE $GITDIR$FILE 
        fi
    done
else
    echo "ERROR! Both MCDIR and GITDIR variables must be valid"
fi
