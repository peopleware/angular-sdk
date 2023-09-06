const { FindTestsPlugin } = require('@angular-devkit/build-angular/src/builders/karma/find-tests-plugin')

module.exports = function (config) {
    // Before entering this function, the Angular CLI sets a Webpack plugin to detect the tests.
    // We can leverage the configuration of this plugin to determine the directory of the project in which we are
    // executing the tests. This directory name can then be used in the configuration below to put test results and coverage
    // results in a separate directory for that project.
    const findTestsPlugin = config.buildWebpack.webpackConfig.plugins.find(
        (plugin) => plugin instanceof FindTestsPlugin
    )
    let subdir = '.'
    if (findTestsPlugin) {
        const options = findTestsPlugin.options

        const relativeProjectSourceRoot = options.projectSourceRoot.replace(options.workspaceRoot, '')
        console.log('RELATIVE PROJECT SOURCE ROOT', relativeProjectSourceRoot)
        let matchResult = /[\\,\/]projects[\\,\/]ppwcode[\\,\/]([a-z,-]{1,})[\\,\/]src/gm.exec(
            relativeProjectSourceRoot
        )
        if (matchResult) {
            subdir = matchResult[1]
        } else {
            subdir = '+application+'
        }
    }

    console.log('TEST RESULTS SUBDIR', subdir)

    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false
        },
        failOnEmptyTestSuite: false,
        reporters: ['kjhtml', 'progress', 'coverage', 'junit'],
        dir: 'coverage',
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'text', subdir: `${subdir}/text` },
                { type: 'text-summary', subdir: `${subdir}/text-summary` },
                { type: 'html', subdir: `${subdir}/html` },
                { type: 'cobertura', subdir: `${subdir}/cobertura` }
            ],
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true
        },
        junitReporter: {
            outputDir: `test-results/${subdir}`
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        customLaunchers: {
            ChromiumNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-translate', '--disable-extensions']
            }
        },
        singleRun: false,
        restartOnFileChange: true,
        browserNoActivityTimeout: 999999
    })
}
