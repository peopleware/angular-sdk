#!/bin/bash
export NODE_ENV="ci"

declare -a LIBRARIES_LIST=("ng-utils" "ng-common" "ng-common-components" "ng-async" "ng-dialogs" "ng-forms" "ng-router" "ng-state-management" "ng-unit-testing" "ng-wireframe" "ng-sdk")
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
    exit 1
  fi
done

echo 'Building schematics'
cd projects/ppwcode/ng-sdk
time npm run build

wait
