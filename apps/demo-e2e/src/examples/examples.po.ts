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

  findFormInputElement(formControlElement: ElementFinder): ElementFinder {
    return formControlElement.element(by.css('input,textarea,select,mat-select'));
  }

  findFormActionsElement(): ElementFinder {
    const formElement = this.findFormElement();
    return formElement.element(by.css('.dynamic-form-actions'));
  }

  findFormActionElements(): ElementArrayFinder {
    const formActionsElement = this.findFormActionsElement();
    return formActionsElement.all(by.css('dynamic-form-element'));
  }

  findFormActionButtonElements(): ElementArrayFinder {
    const formActionsElement = this.findFormActionsElement();
    return formActionsElement.all(by.css('button'));
  }

  findFormValidateButtonElement(): ElementFinder {
    const formActionsElement = this.findFormActionsElement();
    return formActionsElement.element(by.cssContainingText('button', 'Validate'));
  }

  async isEditableFormControl(formControlElement: ElementFinder, formInputElement: ElementFinder): Promise<boolean> {
    const className = await formControlElement.getAttribute('class');
    const isReadonly = await formInputElement.getAttribute('readonly');
    const isEnabled = await formInputElement.isEnabled();
    return !className.includes('readonly') && !isReadonly && isEnabled;
  }

  async editFormControl(formControlElement: ElementFinder, formInputElement: ElementFinder): Promise<boolean> {
    const tag = await formInputElement.getTagName();
    const type = await formInputElement.getAttribute('type');

    if (type === 'checkbox') {
      const formLabelElement = formControlElement.element(by.css('label'));
      await formLabelElement.click();
      return true;
    }

    const value = this.getFormInputValue(tag, type);
    if (value) {
      await formInputElement.sendKeys(value);
      return true;
    }

    return false;
  }

  private getFormInputValue(tag: string, type: string): string {
    switch (type) {
      case 'text':
        return 'Test';
      case 'email':
        return 'Test@test.com';
      case 'password':
        return 'Test1234!';
      case 'number':
        return '2020';
      case 'date':
        return '01-01-2020';
      default:
        if (tag === 'textarea') {
          return 'Test line 1\nTest line 2';
        }
        return null;
    }
  }
}
