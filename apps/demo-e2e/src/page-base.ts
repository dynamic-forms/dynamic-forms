import { browser, by, element, promise, ElementArrayFinder, ElementFinder } from 'protractor';

export abstract class Page {
  constructor(protected baseUrl: string) {}

  navigateTo(relativeUrl?: string): promise.Promise<any> {
    return browser.get(relativeUrl ? `${this.baseUrl}/${relativeUrl}` : this.baseUrl);
  }

  getUrl(): promise.Promise<string> {
    return browser.getCurrentUrl();
  }

  getTitle(): promise.Promise<string> {
    return browser.getTitle();
  }

  findElement(selector: string): ElementFinder {
    return element(by.css(selector));
  }

  findElements(selector: string): ElementArrayFinder {
    return element.all(by.css(selector));
  }
}
