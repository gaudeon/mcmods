#!/usr/bin/env bash

# Simple script to copy project files from the minecraft server to the git repo

# Location of minecraft server with scriptcraft plugin installed
MCDIR=""

# Location of files for screen modules / plugins
GITDIR=""


# List of files to cp from the minecraft server to the git repo
FILES[0]="/scriptcraft/modules/zelda/"
FILES[7]="/scriptcraft/plugins/zelda/"


if [ -d $MCDIR/scriptcraft ] && [ -d $GITDIR/scriptcraft ]; then
    for FILE in ${FILES[*]}; do
        if [ -e $MCDIR$FILE ]; then
            rsync -a $MCDIR$FILE $GITDIR$FILE 
        fi
    done
else
    echo "ERROR! Both MCDIR and GITDIR variables must be valid"
fi
