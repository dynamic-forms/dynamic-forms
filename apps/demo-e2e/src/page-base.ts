import { ElementArrayFinder, ElementFinder, browser, by, element } from 'protractor';

export abstract class Page {
  constructor(protected baseUrl: string) {}

  async navigateTo(relativeUrl?: string): Promise<void> {
    await browser.waitForAngularEnabled(false);
    await browser.get(relativeUrl ? `${this.baseUrl}/${relativeUrl}` : this.baseUrl);
  }

  async getUrl(): Promise<string> {
    return await browser.getCurrentUrl();
  }

  async getTitle(): Promise<string> {
    return await browser.getTitle();
  }

  findElement(selector: string): ElementFinder {
    return element(by.css(selector));
  }

  findElements(selector: string): ElementArrayFinder {
    return element.all(by.css(selector));
  }
}
