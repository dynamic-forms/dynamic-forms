import { browser, promise } from 'protractor';

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
}
