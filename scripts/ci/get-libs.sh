#!/bin/bash

# This script fetches all the libraries in the folders and sets environment variables to be used by
# other scripts in CI.

cd projects/ppwcode/
export LIBRARIES_LIST=`ls -d */ | tr -d /`
cd ../

export LIBRARIES_COUNT=`wc -w <<< ${LIBRARIES_LIST}`

#  Output for better debuggability
echo 'Found libraries:' ${LIBRARIES_LIST}
echo 'Libraries count:' ${LIBRARIES_COUNT}
