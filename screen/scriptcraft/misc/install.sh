#!/usr/bin/env bash

# Simple script to copy project files from the minecraft server to the git repo

# Location of minecraft server with scriptcraft plugin installed
MCDIR=""

# Location of files for screen modules / plugins
GITDIR=""


if [ -d $MCDIR/scriptcraft ] && [ -d $GITDIR/scriptcraft ]; then
    rsync -a --ignore-existing $GITDIR/scriptcraft/modules $MCDIR/scriptcraft/
    rsync -a --ignore-existing $GITDIR/scriptcraft/plugins $MCDIR/scriptcraft/
else
    echo "ERROR! Both MCDIR and GITDIR variables must be valid"
fi
