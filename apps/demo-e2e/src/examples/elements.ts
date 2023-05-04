import PATH from 'path';
import { protractor, By, ElementArrayFinder, ElementFinder } from 'protractor';

const KEY = protractor.Key;

export class Control {
  private readonly _types: string[] = [
    'checkbox', 'combobox', 'datepicker', 'file', 'numberbox', 'radio', 'select', 'switch', 'textarea', 'textbox', 'toggle',
  ];

  constructor(public element: ElementFinder, public theme: string) {}

  findElement(css: string): ElementFinder {
    return this.element.element(By.css(css));
  }

  findElements(css: string): ElementArrayFinder {
    return this.element.all(By.css(css));
  }

  async isPresent(): Promise<boolean> {
    return this.element.isPresent();
  }

  async isEditable(): Promise<boolean> {
    const hidden = await this.element.getAttribute('hidden');
    if (hidden === 'true') {
      return false;
    }
    const className = await this.element.getAttribute('class');
    return !(className.includes('hidden') || className.includes('readonly'));
  }

  async getControlType(): Promise<string> {
    const className = await this.element.getAttribute('class');
    return this.getType(className);
  }

  async getInput(): Promise<Input> {
    const controlType = await this.getControlType();
    switch (controlType) {
      case 'file':
        return new Input(controlType, this, this.findElement('input[type="file"]'));
      case 'radio':
        return new Input(controlType, this, this.findElements('input[type="radio"]'));
      case 'select':
        return new Input(controlType, this, this.findElement('select,mat-select'));
      case 'switch':
        return new Input(controlType, this, this.findElements('input[type="checkbox"],mat-slide-toggle'));
      case 'textarea':
        return new Input(controlType, this, this.findElement('textarea'));
      case 'toggle':
        return new Input(controlType, this, this.findElements('input[type="radio"],mat-button-toggle'));
      default:
        return new Input(controlType, this, this.findElement('input'));
    }
  }

  private getType(className: string): string {
    return this._types.find(type => className.includes(type));
  }
}

export class Input {
  readonly inputElement: ElementFinder;

  constructor(public controlType: string, public control: Control, public inputElements: ElementFinder | ElementArrayFinder) {
    this.inputElement = this.inputElements instanceof ElementArrayFinder ? this.inputElements.get(0) : this.inputElements;
  }

  async isPresent(): Promise<boolean> {
    return this.inputElement.isPresent();
  }

  async isEditable(): Promise<boolean> {
    return await this.control.isEditable() && await this.inputElement.isEnabled();
  }

  async getInputType(): Promise<string> {
    return this.inputElement.getAttribute('type');
  }

  async isInputForFalse(): Promise<boolean> {
    const inputId = await this.inputElement.getAttribute('id');
    switch (inputId) {
      case 'input-hidden':
      case 'input-hidden-input':
      case 'input-disabled':
      case 'input-disabled-input':
      case 'input-readonly':
      case 'input-readonly-input':
        return true;
      default:
        return false;
    }
  }

  async getInputValue(): Promise<string | boolean> {
    if (this.controlType === 'checkbox') {
      return this.inputElement.getAttribute('checked');
    }

    if (this.controlType === 'file') {
      const element = this.control.findElement('input:not([type="file"])');
      const files = await element.getAttribute('value');
      return files ? files.trim() : files;
    }

    if (this.controlType === 'radio') {
      const element = this.control.findElement('input[type="radio"]:checked');
      return await element.isPresent() ? true : false;
    }

    if (this.controlType === 'select') {
      if (this.control.theme === 'material') {
        const element = this.control.findElement('span.mat-mdc-select-value-text');
        return await element.isPresent() ? element.getText() : null;
      }

      const element = await this.inputElement.getAttribute('value');
      return element !== 'null' ? element : null;
    }

    if (this.controlType === 'switch') {
      const element = this.control.findElement('input[type="checkbox"]:checked,mat-slide-toggle.mat-mdc-slide-toggle-checked');
      return await element.isPresent() ? true : false;
    }

    if (this.controlType === 'toggle') {
      const element = this.control.findElement('input[type="radio"]:checked,mat-button-toggle.mat-button-toggle-checked');
      return await element.isPresent() ? true : false;
    }

    const element = await this.inputElement.getAttribute('value');
    return element ? element.trim() : element;
  }

  async checkInputValue(): Promise<boolean> {
    const inputValue = await this.getInputValue();
    return await this.isInputForFalse() ? !inputValue : !!inputValue;
  }

  async editInputValue(): Promise<void> {
    if (this.controlType === 'checkbox') {
      if (await this.isInputForFalse() && !await this.getInputValue()) {
        await this.inputElement.sendKeys(KEY.SPACE);
      }
      return this.inputElement.sendKeys(KEY.SPACE);
    }

    if (this.controlType === 'file') {
      const file = PATH.resolve(__dirname, 'file.txt');
      return this.inputElement.sendKeys(file);
    }

    if (this.controlType === 'radio') {
      return this.inputElement.sendKeys(KEY.SPACE);
    }

    if (this.controlType === 'select') {
      const keys = this.control.theme !== 'material'
        ? [ KEY.ARROW_DOWN, KEY.ARROW_DOWN, KEY.ENTER, KEY.ESCAPE ]
        : [ KEY.ARROW_DOWN, KEY.ENTER, KEY.ESCAPE ];
      await this.inputElement.click();
      return this.inputElement.sendKeys(...keys);
    }

    if (this.controlType === 'switch') {
      return this.control.theme !== 'material'
        ? this.inputElement.sendKeys(KEY.SPACE)
        : this.inputElement.click();
    }

    if (this.controlType === 'toggle') {
      return  this.control.theme !== 'material'
        ? this.inputElement.sendKeys(KEY.SPACE)
        : this.inputElement.click();
    }

    const inputType = await this.getInputType();
    const value = await this.getEditInputValue(inputType);
    return value ? this.inputElement.sendKeys(value, KEY.TAB) : Promise.resolve();
  }

  private getEditInputValue(type?: string): string | number {
    switch (this.controlType) {
      case 'combobox':
        return 'Value1';
      case 'numberbox':
        return 5;
      case 'datepicker':
        return '01-01-2020';
      case 'textarea':
        return 'Line 1\nLine 2';
      case 'textbox':
        return type === 'email'
          ? 'user@mail.com'
          : type === 'password'
            ? 'Test1234!'
            : 'Value';
      default:
        return null;
    }
  }
}
