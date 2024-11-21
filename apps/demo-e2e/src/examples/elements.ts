import PATH from 'path';
import { Locator, Page } from '@playwright/test';

const KEY = {
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: 'Space',
  TAB: 'Tab',
};

export class Control {
  private readonly _types: string[] = [
    'checkbox',
    'combobox',
    'datepicker',
    'input-mask',
    'file',
    'numberbox',
    'radio',
    'select',
    'switch',
    'textarea',
    'textbox',
    'toggle',
  ];

  constructor(
    readonly theme: string,
    readonly locator: Locator,
    readonly page: Page,
  ) {}

  locate(css: string): Locator {
    return this.locator.locator(`css=${css}`).first();
  }

  async isPresent(): Promise<boolean> {
    const count = await this.locator.count();
    return count > 0;
  }

  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }

  async isEditable(): Promise<boolean> {
    const hidden = await this.locator.getAttribute('hidden');
    if (hidden === 'true') {
      return false;
    }
    const className = await this.locator.getAttribute('class');
    return !(className.includes('hidden') || className.includes('readonly'));
  }

  async getControlType(): Promise<string> {
    const className = await this.locator.getAttribute('class');
    return this.getType(className);
  }

  async getInput(): Promise<Input> {
    const controlType = await this.getControlType();
    switch (controlType) {
      case 'file':
        return new Input(this.page, controlType, this, this.locate('input:not([type="file"])'));
      case 'radio':
        return new Input(this.page, controlType, this, this.locate('input[type="radio"]'));
      case 'select':
        return new Input(this.page, controlType, this, this.locate('select,mat-select'));
      case 'switch':
        return new Input(this.page, controlType, this, this.locate('input[type="checkbox"],mat-slide-toggle'));
      case 'textarea':
        return new Input(this.page, controlType, this, this.locate('textarea'));
      case 'toggle':
        return new Input(this.page, controlType, this, this.locate('input[type="radio"],mat-button-toggle'));
      default:
        return new Input(this.page, controlType, this, this.locate('input'));
    }
  }

  private getType(className: string): string {
    return this._types.find(type => className.includes(type));
  }
}

export class Input {
  private static readonly inputIdsForFalse = ['hidden-input', 'hidden', 'disabled-input', 'disabled', 'readonly-input', 'readonly'];

  constructor(
    readonly page: Page,
    readonly controlType: string,
    readonly control: Control,
    readonly locator: Locator,
  ) {}

  async isPresent(): Promise<boolean> {
    const count = await this.locator.count();
    return count > 0;
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async isEditable(): Promise<boolean> {
    const controlEditable = await this.control.isEditable();
    const inputEditable = await this.locator.isEnabled();
    return controlEditable && inputEditable;
  }

  async getInputId(): Promise<string> {
    return this.locator.getAttribute('id');
  }

  async getInputType(): Promise<string> {
    return this.locator.getAttribute('type');
  }

  async isInputForFalse(): Promise<boolean> {
    const inputId = await this.locator.getAttribute('id');
    return Input.inputIdsForFalse.includes(inputId);
  }

  async getInputValue(): Promise<string | boolean> {
    if (this.controlType === 'checkbox') {
      return this.locator.isChecked();
    }

    if (this.controlType === 'file') {
      const files = await this.locator.inputValue();
      return files ? files.trim() : files;
    }

    if (this.controlType === 'radio') {
      const element = this.control.locate('input[type="radio"]:checked');
      const elementVisible = await element.isVisible();
      return elementVisible ? true : false;
    }

    if (this.controlType === 'select') {
      if (this.control.theme === 'material') {
        const element = this.control.locate('span.mat-mdc-select-value-text');
        const elementVisible = await element.isVisible();
        return elementVisible ? element.innerText() : null;
      }

      const element = await this.locator.inputValue();
      return element !== 'null' ? element : null;
    }

    if (this.controlType === 'switch') {
      const element = this.control.locate('input[type="checkbox"]:checked,mat-slide-toggle.mat-mdc-slide-toggle-checked');
      const elementVisible = await element.isVisible();
      return elementVisible ? true : false;
    }

    if (this.controlType === 'toggle') {
      const element = this.control.locate('input[type="radio"]:checked,mat-button-toggle.mat-button-toggle-checked');
      const elementVisible = await element.isVisible();
      return elementVisible ? true : false;
    }

    const value = await this.locator.inputValue();
    return value ? value.trim() : value;
  }

  async checkInputValue(): Promise<boolean> {
    const inputValue = await this.getInputValue();
    const inputForFalse = await this.isInputForFalse();
    return inputForFalse ? !inputValue : !!inputValue;
  }

  async editInputValue(): Promise<void> {
    if (this.controlType === 'checkbox') {
      const inputForFalse = await this.isInputForFalse();
      const inputValue = await this.getInputValue();
      if (inputForFalse && !inputValue) {
        await this.locator.press(KEY.SPACE);
      }
      return this.locator.press(KEY.SPACE);
    }

    if (this.controlType === 'file') {
      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.control.locate('button').click();
      const fileChooser = await fileChooserPromise;
      return fileChooser.setFiles(PATH.resolve(__dirname, 'file.txt'));
    }

    if (this.controlType === 'radio') {
      return this.locator.press(KEY.SPACE);
    }

    if (this.controlType === 'select') {
      const keys =
        this.control.theme !== 'material'
          ? [KEY.ARROW_DOWN, KEY.ARROW_DOWN, KEY.ENTER, KEY.ESCAPE]
          : [KEY.ARROW_DOWN, KEY.ENTER, KEY.ESCAPE];

      await this.locator.click();

      for (const key of keys) {
        await this.locator.press(key);
      }

      return;
    }

    if (this.controlType === 'switch') {
      return this.control.theme !== 'material' ? this.locator.press(KEY.SPACE) : this.locator.click();
    }

    if (this.controlType === 'toggle') {
      return this.control.theme !== 'material' ? this.locator.press(KEY.SPACE) : this.locator.click();
    }

    const inputType = await this.getInputType();
    const value = await this.getEditInputValue(inputType);

    if (!value) {
      return Promise.resolve();
    }

    await this.locator.fill(value.toString());
    // await this.locator.fill(value.toString(), { force: true });
    return this.locator.press(KEY.TAB);
  }

  private async getEditInputValue(type?: string): Promise<string | number> {
    switch (this.controlType) {
      case 'combobox':
        return 'Value1';
      case 'input-mask':
        return this.getEditInputMaskValue();
      case 'numberbox':
        return 5;
      case 'datepicker':
        return '2020-01-01';
      case 'textarea':
        return 'Line 1\nLine 2';
      case 'textbox':
        return type === 'email' ? 'user@mail.com' : type === 'password' ? 'Test1234!' : 'Value';
      default:
        return null;
    }
  }

  private async getEditInputMaskValue(): Promise<string | number> {
    const id = await this.getInputId();
    switch (id) {
      case 'email':
        return 'user@mail.com';
      case 'mac':
        return '00:00:00:00:00:00';
      case 'ssn':
        return '123-45-6789';
      case 'url':
        return 'dynamic-forms.azurewebsites.net/';
      case 'vin':
        return 'WVWZZZ1JZ3W386752';
      default:
        return '192.0.0.0';
    }
  }
}
