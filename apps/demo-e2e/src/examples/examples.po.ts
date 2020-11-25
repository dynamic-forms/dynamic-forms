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

  findActionsWrapper(): ElementFinder {
    const formElement = this.findForm();
    return formElement.element(By.css('.dynamic-form-footer'));
  }

  findActions(): ElementArrayFinder {
    const actions = this.findActionsWrapper();
    return actions.all(By.css('dynamic-form-element'));
  }

  findActionButtons(): ElementArrayFinder {
    const actionsWrapper = this.findActionsWrapper();
    return actionsWrapper.all(By.css('button'));
  }

  findValidateButton(): ElementFinder {
    const actionsWrapper = this.findActionsWrapper();
    return actionsWrapper.element(By.css('button[id="action-validate"]'));
  }

  findSubmitButton(): ElementFinder {
    const actionsWrapper = this.findActionsWrapper();
    return actionsWrapper.element(By.css('button[id="action-submit"]'));
  }

  findResetButton(): ElementFinder {
    const actionsWrapper = this.findActionsWrapper();
    return actionsWrapper.element(By.css('button[id="action-reset"]'));
  }

  findResetDefaultButton(): ElementFinder {
    const actionsWrapper = this.findActionsWrapper();
    return actionsWrapper.element(By.css('button[id="action-reset-default"]'));
  }

  async pressEscape(): Promise<void> {
    return this.findElement('body').sendKeys(protractor.Key.ESCAPE);
  }
}
