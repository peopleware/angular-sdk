#!/usr/bin/env bash
export NODE_ENV="ci"

ng test --browsers ChromeHeadless --watch=false --code-coverage
