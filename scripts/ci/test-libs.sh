#!/usr/bin/env bash
export NODE_ENV="ci"

# List of all projects to test
PROJECTS=(
    "@ppwcode/ng-async"
    "@ppwcode/ng-common"
    "@ppwcode/ng-common-components"
    "@ppwcode/ng-dialogs"
    "@ppwcode/ng-forms"
    "@ppwcode/ng-router"
    "@ppwcode/ng-state-management"
    "@ppwcode/ng-unit-testing"
    "@ppwcode/ng-wireframe"
    "ppwcode"
)

# Run tests for each project with appropriate environment variable
for project in "${PROJECTS[@]}"; do
    echo "Testing project: $project"
    
    # Extract project name for environment variable (remove @ppwcode/ prefix)
    if [[ $project == "@ppwcode/"* ]]; then
        project_name=${project#@ppwcode/}
    else
        project_name=$project
    fi
    
    # Set environment variable and run tests
    ANGULAR_PROJECT_NAME=$project_name ng test $project --browsers ChromeHeadless --watch=false --code-coverage
    
    # Check if the test run was successful
    if [ $? -ne 0 ]; then
        echo "Tests failed for project: $project"
        exit 1
    fi
done

echo "All tests completed successfully!"
