import { browser, element, by, ExpectedConditions as ec } from 'protractor';
import { promise, By } from 'selenium-webdriver';

export function waitForElement(selector: By) {
  return browser.wait(ec.presenceOf(element(selector)));
}
