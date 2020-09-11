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

  findActionsWrapper(): ElementFinder {
    const formElement = this.findForm();
    return formElement.element(by.css('.dynamic-form-actions'));
  }

  findActions(): ElementArrayFinder {
    const actions = this.findActionsWrapper();
    return actions.all(by.css('dynamic-form-element'));
  }

  findActionButtons(): ElementArrayFinder {
    const actionsElement = this.findActionsWrapper();
    return actionsElement.all(by.css('button'));
  }

  findValidateButton(): ElementFinder {
    const formActions = this.findActionsWrapper();
    return formActions.element(by.css('button[id="action-validate"]'));
  }

  findSubmitButton(): ElementFinder {
    const formActions = this.findActionsWrapper();
    return formActions.element(by.css('button[id="action-submit"]'));
  }

  findResetButton(): ElementFinder {
    const formActions = this.findActionsWrapper();
    return formActions.element(by.css('button[id="action-reset"]'));
  }

  findResetDefaultButton(): ElementFinder {
    const formActions = this.findActionsWrapper();
    return formActions.element(by.css('button[id="action-reset-default"]'));
  }
}
