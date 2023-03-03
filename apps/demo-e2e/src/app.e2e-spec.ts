
import { browser } from 'protractor';
import { AppPage } from './app.po';

const remote = require('selenium-webdriver/remote');

describe('dynamic-forms demo app', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.setFileDetector(new remote.FileDetector());
    page = new AppPage();
  });

  it('has url and title', async () => {
    await page.navigateTo();

    expect(await page.getUrl()).toContain('/home');
    expect(await page.getTitle()).toEqual('dynamic-forms');
  });
});
