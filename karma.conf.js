module.exports = function (config) {
    // Get project name from environment variable, fallback to default
    let subdir = process.env.ANGULAR_PROJECT_NAME || '+application+'

    // Try to determine the project from the karma config if available (as backup)
    if (config.projectName) {
        subdir = config.projectName
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
            require('karma-junit-reporter')
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
