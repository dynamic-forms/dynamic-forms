import { By, ElementArrayFinder, ElementFinder, element } from 'protractor';
import { Page } from '../page-base';
import { Control } from './elements';

export interface Example {
  id: string;
  modelId: string;
  name: string;
}

export interface FormTestResult {
  rootPresent: boolean;
  wrapperPresent: boolean;
  formPresent: boolean;
  actions: ElementArrayFinder;
  actionCount: number;
  controls: ElementArrayFinder;
  controlCount: number;
}

export interface FormModalTestResult {
  modalPresent: boolean;
  modalControls?: ElementArrayFinder;
  modalOpenButton: ElementFinder;
  modalOpenButtonPresent: boolean;
  modalCloseButton?: ElementFinder;
  modalCloseButtonPresent?: boolean;
}

export interface FormActionTestResult {
  actionCount: number;
  buttonCount: number;
  anchorCount: number;
}

export interface FormItemsTestResult {
  items?: ElementFinder;
  itemsPresent: boolean;
  itemHeaders?: ElementArrayFinder;
  itemHeaderCount?: number;
}

export interface FormControlTestResult {
  type: string;
  present: boolean;
  inputPresent: boolean;
  inputEditable: boolean;
  inputValuePassed?: boolean;
}

export class ExamplesPage extends Page {
  constructor(public theme: string) {
    super(`/examples/${theme}`);
  }

  async navigateToExample(example: Example): Promise<void> {
    const relativeUrl = example.modelId ? `${example.id}/models/${example.modelId}` : example.id;
    await this.navigateTo(relativeUrl);
  }

  async getFormTestResult(): Promise<FormTestResult> {
    const root = element(By.css('dynamic-form'));
    const rootPresent = await root.isPresent();
    const wrapper = root.element(By.css('.dynamic-form-wrapper'));
    const wrapperPresent = await wrapper.isPresent();
    const form = wrapper.element(By.css('form.dynamic-form'));
    const formPresent = await form.isPresent();
    const actions = form.all(By.css('.dynamic-form-header,.dynamic-form-footer')).all(By.css('dynamic-form-element'));
    const actionCount = await actions.count();
    const controls = this.getFormControls(form);
    const controlCount = await controls.count();
    return { rootPresent, wrapperPresent, formPresent, actions, actionCount, controls, controlCount };
  }

  async getFormActionTestResult(): Promise<FormActionTestResult> {
    const actionWrappers = element.all(By.css('.dynamic-form-header,.dynamic-form-footer'));
    const actions = actionWrappers.all(By.css('dynamic-form-element'));
    const actionCount = await actions.count();
    const buttons = actions.all(By.css('button'));
    const buttonCount = await buttons.count();
    const anchors = actions.all(By.css('a'));
    const anchorCount = await anchors.count();

    if (actionCount === 0) {
      return { actionCount, buttonCount, anchorCount };
    }

    const validateButton = actions.all(By.css('button[id="action-validate"]')).first();
    const resetButton = actions.all(By.css('button[id="action-reset"]')).first();
    const resetDefaultButton = actions.all(By.css('button[id="action-reset-default"]')).first();

    if ((await resetButton.isPresent()) && (await resetButton.isEnabled())) {
      await resetButton.click();
    }

    if ((await validateButton.isPresent()) && (await validateButton.isEnabled())) {
      await validateButton.click();
    }

    if ((await resetDefaultButton.isPresent()) && (await resetDefaultButton.isEnabled())) {
      await resetDefaultButton.click();
    }

    if ((await validateButton.isPresent()) && (await validateButton.isEnabled())) {
      await validateButton.click();
    }

    return { actionCount, buttonCount, anchorCount };
  }

  async getFormModalTestResults(): Promise<FormModalTestResult> {
    const form = element(By.css('form.dynamic-form'));
    const modalOpenButton = form.element(By.css('button[id*="openModal"]'));
    const modalOpenButtonPresent = await modalOpenButton.isPresent();

    if (!modalOpenButtonPresent) {
      return { modalPresent: false, modalOpenButton, modalOpenButtonPresent, modalCloseButtonPresent: false };
    }

    await modalOpenButton.click();

    const modal = element(By.css('.dynamic-form-modal'));
    const modalPresent = await modal.isPresent();
    const modalControls = modalPresent ? this.getFormControls(modal) : undefined;
    const modalCloseButton = modal.all(By.css('button[id*="closeModal"]')).first();
    const modalCloseButtonPresent = await modalCloseButton.isPresent();
    return { modalPresent, modalControls, modalOpenButton, modalOpenButtonPresent, modalCloseButton, modalCloseButtonPresent };
  }

  async getFormItemsTestResult(theme: string): Promise<FormItemsTestResult> {
    const form = element(By.css('form.dynamic-form'));
    const items = form.element(By.css('.dynamic-form-items'));
    const itemsPresent = await items.isPresent();
    if (!itemsPresent) {
      return { items, itemsPresent };
    }

    const itemHeaders = items.all(By.css(theme === 'material' ? '.mdc-tab' : '.dynamic-form-item-header'));
    const itemHeaderCount = await itemHeaders.count();
    return { items, itemsPresent, itemHeaders, itemHeaderCount };
  }

  async getFormControlTestResults(controls: ElementArrayFinder): Promise<FormControlTestResult[]> {
    const results = [] as FormControlTestResult[];
    const count = await controls.count();
    for (let index = 0; index < count; index++) {
      const control = new Control(controls.get(index), this.theme);
      const result = await this.getFormControlTestResult(control);
      results.push(result);
    }
    return results;
  }

  async getFormControlTestResult(control: Control): Promise<FormControlTestResult> {
    const input = await control.getInput();
    const result = {
      type: await control.getControlType(),
      present: await control.isPresent(),
      inputPresent: await input.isPresent(),
      inputEditable: await input.isEditable(),
    };
    if (result.inputEditable) {
      if (!(await input.getInputValue()) || (await input.isInputForFalse())) {
        await input.editInputValue();
      }
      return { ...result, inputValuePassed: await input.checkInputValue() };
    }
    return result;
  }

  getFormItemLast(formItems: ElementFinder): ElementFinder {
    return formItems.all(By.css('.dynamic-form-item')).last();
  }

  getFormControls(formElement: ElementFinder): ElementArrayFinder {
    return formElement.all(By.css('div.dynamic-form-control'));
  }

  findFormFieldAddButton(): ElementFinder {
    const form = element(By.css('form.dynamic-form'));
    return form.element(By.css('button[id*="pushArrayField"],button[id*="registerDictionaryField"]'));
  }

  findFormSubmitButton(): ElementFinder {
    const actionWrappers = element.all(By.css('.dynamic-form-header,.dynamic-form-footer'));
    return actionWrappers.all(By.css('button[id="action-submit"]')).first();
  }
}
