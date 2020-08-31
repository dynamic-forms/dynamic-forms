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

  findRootElement(): ElementFinder {
    return this.findElement('dynamic-form');
  }

  findWrapperElement(): ElementFinder {
    const rootElement = this.findRootElement();
    return rootElement.element(by.css('.dynamic-form-wrapper'));
  }

  findFormElement(): ElementFinder {
    const wrapperElement = this.findWrapperElement();
    return wrapperElement.element(by.css('form.dynamic-form'));
  }

  findFormElements(): ElementArrayFinder {
    const formElement = this.findFormElement();
    return formElement.all(by.css('dynamic-form-element'));
  }

  findControlElements(): ElementArrayFinder {
    const formElement = this.findFormElement();
    return formElement.all(by.css('div.dynamic-form-control'));
  }

  findActionsElement(): ElementFinder {
    const formElement = this.findFormElement();
    return formElement.element(by.css('.dynamic-form-actions'));
  }

  findActionElements(): ElementArrayFinder {
    const actionsElement = this.findActionsElement();
    return actionsElement.all(by.css('dynamic-form-element'));
  }

  findActionButtonElements(): ElementArrayFinder {
    const actionsElement = this.findActionsElement();
    return actionsElement.all(by.css('button'));
  }

  findValidateButtonElement(): ElementFinder {
    const formActionsElement = this.findActionsElement();
    return formActionsElement.element(by.cssContainingText('button', 'Validate'));
  }

  findSubmitButtonElement(): ElementFinder {
    const formActionsElement = this.findActionsElement();
    return formActionsElement.element(by.cssContainingText('button', 'Submit'));
  }

  async closeOverlayBackdrop(): Promise<void> {
    const backdropElement = this.findElement('.cdk-overlay-backdrop');
    return await backdropElement.isPresent()
      ? await backdropElement.click()
      : Promise.resolve();
  }
}
