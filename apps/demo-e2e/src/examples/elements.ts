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
    public theme: string,
    public locator: Locator,
    public page: Page,
  ) {}

  findInput(css: string): Locator {
    return this.locator.locator(`css=${css}`).first();
  }

  async isPresent(): Promise<boolean> {
    return (await this.locator.count()) > 0;
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
        return new Input(controlType, this, this.findInput('input[type="file"]'), this.page);
      case 'radio':
        return new Input(controlType, this, this.findInput('input[type="radio"]'), this.page);
      case 'select':
        return new Input(controlType, this, this.findInput('select,mat-select'), this.page);
      case 'switch':
        return new Input(controlType, this, this.findInput('input[type="checkbox"],mat-slide-toggle'), this.page);
      case 'textarea':
        return new Input(controlType, this, this.findInput('textarea'), this.page);
      case 'toggle':
        return new Input(controlType, this, this.findInput('input[type="radio"],mat-button-toggle'), this.page);
      default:
        return new Input(controlType, this, this.findInput('input'), this.page);
    }
  }

  private getType(className: string): string {
    return this._types.find(type => className.includes(type));
  }
}

export class Input {
  private static readonly inputIdsForFalse = ['hidden-input', 'hidden', 'disabled-input', 'disabled', 'readonly-input', 'readonly'];

  constructor(
    public controlType: string,
    public control: Control,
    public locator: Locator,
    public page: Page,
  ) {}

  async isPresent(): Promise<boolean> {
    return (await this.locator.count()) > 0;
  }

  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }

  async isEditable(): Promise<boolean> {
    return (await this.control.isEditable()) && (await this.locator.isEnabled());
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
      const element = this.control.findInput('input:not([type="file"])');
      const files = await element.inputValue();
      return files ? files.trim() : files;
    }

    if (this.controlType === 'radio') {
      const element = this.control.findInput('input[type="radio"]:checked');
      return (await element.isVisible()) ? true : false;
    }

    if (this.controlType === 'select') {
      if (this.control.theme === 'material') {
        const element = this.control.findInput('span.mat-mdc-select-value-text');
        return (await element.isVisible()) ? element.innerText() : null;
      }

      const element = await this.locator.inputValue();
      return element !== 'null' ? element : null;
    }

    if (this.controlType === 'switch') {
      const element = this.control.findInput('input[type="checkbox"]:checked,mat-slide-toggle.mat-mdc-slide-toggle-checked');
      return (await element.isVisible()) ? true : false;
    }

    if (this.controlType === 'toggle') {
      const element = this.control.findInput('input[type="radio"]:checked,mat-button-toggle.mat-button-toggle-checked');
      return (await element.isVisible()) ? true : false;
    }

    const value = await this.locator.inputValue();
    return value ? value.trim() : value;
  }

  async checkInputValue(): Promise<boolean> {
    const inputValue = await this.getInputValue();
    return (await this.isInputForFalse()) ? !inputValue : !!inputValue;
  }

  async editInputValue(): Promise<void> {
    if (this.controlType === 'checkbox') {
      if ((await this.isInputForFalse()) && !(await this.getInputValue())) {
        await this.locator.press(KEY.SPACE);
      }
      return this.locator.press(KEY.SPACE);
    }

    if (this.controlType === 'file') {
      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.control.findInput('button').click();
      const fileChooser = await fileChooserPromise;
      return await fileChooser.setFiles(PATH.resolve(__dirname, 'file.txt'));
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
