// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    junitReporter: {
      outputDir: require('path').join(__dirname, '../../dist/v20/tests'),
      outputFile: 'dynamic-forms-markdown.junit.xml',
      useBrowserName: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './../../apps/demo/src/assets/coverage/markdown'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'cobertura' },
        { type: 'json-summary' }
      ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
