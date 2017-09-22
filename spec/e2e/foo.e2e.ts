import { browser, element, by } from 'protractor';

import { waitForElement } from './helpers/helpers';

describe('Protractor Demo App', function() {
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    waitForElement(by.css('h3'));

    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).toEqual('3'); // This is wrong!
  });
});
