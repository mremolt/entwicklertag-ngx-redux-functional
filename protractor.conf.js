require('ts-node/register');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/e2e/**/*.e2e.ts'],

  multiCapabilities: [
    {
      browserName: 'firefox'
    },
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['headless', 'disable-gpu']
      }
    },
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['window-size=400,400']
      }
    }
  ]
};
