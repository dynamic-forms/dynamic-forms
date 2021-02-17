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

  findFormRoot(): ElementFinder {
    return this.findElement('dynamic-form');
  }

  findFormWrapper(): ElementFinder {
    const root = this.findFormRoot();
    return root.element(By.css('.dynamic-form-wrapper'));
  }

  findForm(): ElementFinder {
    const wrapper = this.findFormWrapper();
    return wrapper.element(By.css('form.dynamic-form'));
  }

  findFormElements(): ElementArrayFinder {
    const form = this.findForm();
    return form.all(By.css('dynamic-form-element'));
  }

  findFormControls(): ElementArrayFinder {
    const form = this.findForm();
    return form.all(By.css('div.dynamic-form-control'));
  }

  findFormActionWrappers(): ElementArrayFinder {
    const formElement = this.findForm();
    return formElement.all(By.css('.dynamic-form-header,.dynamic-form-footer'));
  }

  findFormActions(): ElementArrayFinder {
    const actionWrappers = this.findFormActionWrappers();
    return actionWrappers.all(By.css('dynamic-form-element'));
  }

  findFormActionButtons(): ElementArrayFinder {
    const actionWrappers = this.findFormActionWrappers();
    return actionWrappers.all(By.css('button'));
  }

  findFormValidateButton(): ElementFinder {
    const actionWrappers = this.findFormActionWrappers();
    return actionWrappers.all(By.css('button[id="action-validate"]')).first();
  }

  findFormSubmitButton(): ElementFinder {
    const actionWrappers = this.findFormActionWrappers();
    return actionWrappers.all(By.css('button[id="action-submit"]')).first();
  }

  findFormResetButton(): ElementFinder {
    const actionWrappers = this.findFormActionWrappers();
    return actionWrappers.all(By.css('button[id="action-reset"]')).first();
  }

  findFormResetDefaultButton(): ElementFinder {
    const actionWrappers = this.findFormActionWrappers();
    return actionWrappers.all(By.css('button[id="action-reset-default"]')).first();
  }

  findFormFieldAddButton(): ElementFinder {
    const form = this.findForm();
    return form.element(By.css('button[id*="pushArrayField"],button[id*="registerDictionaryField"]'));
  }

  findFormModalOpenButton(): ElementFinder {
    const form = this.findForm();
    return form.element(By.css('button[id*="openModal"]'));
  }

  findFormModalCloseButton(): ElementFinder {
    return this.findElements('button[id*="closeModal"]').first();
  }

  findFormModal(): ElementFinder {
    return this.findElement('.dynamic-form-modal');
  }

  findFormModalControls(): ElementArrayFinder {
    const formModal = this.findFormModal();
    return formModal.all(By.css('div.dynamic-form-control'));
  }

  async pressEscape(): Promise<void> {
    return this.findElement('body').sendKeys(protractor.Key.ESCAPE);
  }
}
