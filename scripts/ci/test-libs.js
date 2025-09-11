const runConcurrently = require('./run-concurrently')

const projects = [
    '@ppwcode/ng-async',
    '@ppwcode/ng-common',
    '@ppwcode/ng-common-components',
    '@ppwcode/ng-dialogs',
    '@ppwcode/ng-forms',
    '@ppwcode/ng-router',
    '@ppwcode/ng-state-management',
    '@ppwcode/ng-unit-testing',
    '@ppwcode/ng-wireframe',
    'ppwcode'
]

const commands = projects.map((project) => ({
    name: project,
    command: `ng test ${project} --browsers ChromeHeadless --watch=false --code-coverage`,
    env: { ANGULAR_PROJECT_NAME: project }
}))

runConcurrently.run(commands)
