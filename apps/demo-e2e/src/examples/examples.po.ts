import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { Page } from '../page-base';

export interface Example {
   id: string;
   modelId: string;
   name: string;
}

export class ExamplesPage extends Page {
  constructor(theme: string) {
    super(`/examples/${theme}`);
  }

  async navigateToExample(example: Example): Promise<void> {
    const relativeUrl = example.modelId ? `${example.id}/models/${example.modelId}` : example.id;
    await this.navigateTo(relativeUrl);
  }

  findRootElement(): ElementFinder {
    return element(by.css('dynamic-form'));
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

  findFormControlElements(): ElementArrayFinder {
    const formElement = this.findFormElement();
    return formElement.all(by.css('dynamic-form-control'));
  }

  findFormActionsElement(): ElementFinder {
    const formElement = this.findFormElement();
    return formElement.element(by.css('.dynamic-form-actions'));
  }

  findFormActionElements(): ElementArrayFinder {
    const formActionsElement = this.findFormActionsElement();
    return formActionsElement.all(by.css('dynamic-form-element'));
  }

  findFormInputElement(formControlElement: ElementFinder): ElementFinder {
    return formControlElement.element(by.css('input,textarea,select,mat-select'));
  }

  findFormActionButtonElements(): ElementArrayFinder {
    const formActionsElement = this.findFormActionsElement();
    return formActionsElement.all(by.css('button'));
  }

  findFormValidateButtonElement(): ElementFinder {
    const formActionsElement = this.findFormActionsElement();
    return formActionsElement.element(by.cssContainingText('button', 'Validate'));
  }
}
