#!/bin/bash
export NODE_ENV="ci"

declare -a LIBRARIES_LIST=("ng-common" "ng-common-components" "ng-async" "ng-dialogs" "ng-forms" "ng-router" "ng-state-management" "ng-wireframe")
declare -a LIBRARIES_COUNT=${#LIBRARIES_LIST[@]}

# Loop over libs
i=0
for library in ${LIBRARIES_LIST[@]}; do
  i=$((i+1))
  echo ""
  echo '================================================='
  echo 'building project projects/ppwcode/'${library}' ('${i}'/'${LIBRARIES_COUNT}')'
  echo '================================================='
  time ng build @ppwcode/${library}
  # The return value/exit code of the last command is gained through $?
  if [ "$?" == "1" ]; then
    echo 'Failed'
  fi
done

wait
