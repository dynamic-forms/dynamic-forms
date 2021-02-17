// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const os = require('os');
const path = require('path');
const { SpecReporter } = require('jasmine-spec-reporter');
const BeautifulReporter = require('protractor-beautiful-reporter');

const chromeDriverFileName = os.type() === 'Windows_NT' ? 'chromedriver.exe' : 'chromedriver';
const chromeDriver = process.env.CHROMEWEBDRIVER ? path.join(process.env.CHROMEWEBDRIVER, chromeDriverFileName) : null;

const specReporter = new SpecReporter({ 
  spec: { 
    displayStacktrace: true 
  } 
});

const beautifulReporter = new BeautifulReporter({
  baseDirectory: 'dist/v11/e2e',
  screenshotsSubfolder: 'screenshots',
  jsonsSubfolder: 'jsons',
  takeScreenShotsOnlyForFailedSpecs: false,
  docName: 'report.html',
  docTitle: 'dynamic-forms - demo - e2e',
  preserveDirectory: false
});

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ '--headless' ]
    }
  },
  chromeDriver: chromeDriver,
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(specReporter);
    jasmine.getEnv().addReporter(beautifulReporter.getJasmine2Reporter());
  },
  SELENIUM_PROMISE_MANAGER: false
};