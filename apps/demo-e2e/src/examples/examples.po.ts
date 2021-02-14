import { protractor, By, ElementArrayFinder, ElementFinder } from 'protractor';
import { Page } from '../page-base';

export interface Example {
   id: string;
   modelId: string;
   name: string;
}

export class ExamplesPage extends Page {
  constructor(public theme: string) {
    super(`/examples/${theme}`);
  }

  async navigateToExample(example: Example): Promise<void> {
    const relativeUrl = example.modelId ? `${example.id}/models/${example.modelId}` : example.id;
    await this.navigateTo(relativeUrl);
  }

  findRoot(): ElementFinder {
    return this.findElement('dynamic-form');
  }

  findWrapper(): ElementFinder {
    const root = this.findRoot();
    return root.element(By.css('.dynamic-form-wrapper'));
  }

  findForm(): ElementFinder {
    const wrapper = this.findWrapper();
    return wrapper.element(By.css('form.dynamic-form'));
  }

  findElements(): ElementArrayFinder {
    const form = this.findForm();
    return form.all(By.css('dynamic-form-element'));
  }

  findControls(): ElementArrayFinder {
    const form = this.findForm();
    return form.all(By.css('div.dynamic-form-control'));
  }

  findActionWrappers(): ElementArrayFinder {
    const formElement = this.findForm();
    return formElement.all(By.css('.dynamic-form-header,.dynamic-form-footer'));
  }

  findActions(): ElementArrayFinder {
    const actionWrappers = this.findActionWrappers();
    return actionWrappers.all(By.css('dynamic-form-element'));
  }

  findActionButtons(): ElementArrayFinder {
    const actionWrappers = this.findActionWrappers();
    return actionWrappers.all(By.css('button'));
  }

  findValidateButton(): ElementFinder {
    const actionWrappers = this.findActionWrappers();
    return actionWrappers.all(By.css('button[id="action-validate"]')).first();
  }

  findSubmitButton(): ElementFinder {
    const actionWrappers = this.findActionWrappers();
    return actionWrappers.all(By.css('button[id="action-submit"]')).first();
  }

  findResetButton(): ElementFinder {
    const actionWrappers = this.findActionWrappers();
    return actionWrappers.all(By.css('button[id="action-reset"]')).first();
  }

  findResetDefaultButton(): ElementFinder {
    const actionWrappers = this.findActionWrappers();
    return actionWrappers.all(By.css('button[id="action-reset-default"]')).first();
  }

  findAddFieldButton(): ElementFinder {
    const form = this.findForm();
    return form.element(By.css('button[id*="pushArrayField"],button[id*="registerDictionaryField"]'));
  }

  async pressEscape(): Promise<void> {
    return this.findElement('body').sendKeys(protractor.Key.ESCAPE);
  }
}
