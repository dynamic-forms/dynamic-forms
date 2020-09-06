import { by, ElementArrayFinder, ElementFinder } from 'protractor';
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
    return root.element(by.css('.dynamic-form-wrapper'));
  }

  findForm(): ElementFinder {
    const wrapper = this.findWrapper();
    return wrapper.element(by.css('form.dynamic-form'));
  }

  findElements(): ElementArrayFinder {
    const form = this.findForm();
    return form.all(by.css('dynamic-form-element'));
  }

  findControls(): ElementArrayFinder {
    const form = this.findForm();
    return form.all(by.css('div.dynamic-form-control'));
  }

  findActions(): ElementFinder {
    const formElement = this.findForm();
    return formElement.element(by.css('.dynamic-form-actions'));
  }

  findActionElements(): ElementArrayFinder {
    const actions = this.findActions();
    return actions.all(by.css('dynamic-form-element'));
  }

  findActionButtons(): ElementArrayFinder {
    const actionsElement = this.findActions();
    return actionsElement.all(by.css('button'));
  }

  findValidateButton(): ElementFinder {
    const formActions = this.findActions();
    return formActions.element(by.css('button[id="action-validate"]'));
  }

  findSubmitButton(): ElementFinder {
    const formActions = this.findActions();
    return formActions.element(by.css('button[id="action-submit"]'));
  }

  findResetButton(): ElementFinder {
    const formActions = this.findActions();
    return formActions.element(by.css('button[id="action-reset"]'));
  }

  findResetDefaultButton(): ElementFinder {
    const formActions = this.findActions();
    return formActions.element(by.css('button[id="action-reset-default"]'));
  }

  async closeOverlay(): Promise<void> {
    const backdrop = this.findElement('.cdk-overlay-backdrop');
    return await backdrop.isPresent()
      ? await backdrop.click()
      : Promise.resolve();
  }

  async closeSubmitDialog(): Promise<void> {
    const dialog = this.findElement('app-dynamic-form-dialog');
    if (await dialog.isPresent()) {
      const closeButton = dialog.element(by.css('.mat-dialog-actions button'));
      await closeButton.click();
    }
    return Promise.resolve();
  }
}
