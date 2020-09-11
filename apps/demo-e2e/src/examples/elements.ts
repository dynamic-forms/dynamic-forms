import { by, ElementArrayFinder, ElementFinder } from 'protractor';

export class Control {
  private readonly _types: string[] = [
    'checkbox', 'combobox', 'datepicker', 'numberbox', 'radio', 'select', 'switch', 'textarea', 'textbox'
  ];

  constructor(public element: ElementFinder, public theme: string) {}

  async isPresent(): Promise<boolean> {
    return this.element.isPresent();
  }

  async isEditable(): Promise<boolean> {
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
      case 'radio':
        const radioElements = this.element.all(by.css('input[type="radio"]'));
        return new Input(controlType, this, radioElements);
      case 'select':
        const selectElement = this.element.element(by.css('select,mat-select'));
        return new Input(controlType, this, selectElement);
      case 'textarea':
        const textareaElement = this.element.element(by.css('textarea'));
        return new Input(controlType, this, textareaElement);
      default:
        const inputElement = this.element.element(by.css('input'));
        return new Input(controlType, this, inputElement);
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

  async getInputValue(): Promise<string | boolean> {
    switch (this.controlType) {
      case 'checkbox':
      case 'switch':
        return this.inputElement.getAttribute('checked');
      case 'radio':
        const checkedRadio = this.control.element.element(by.css('input[type="radio"]:checked'));
        return await checkedRadio.isPresent() ? checkedRadio.getAttribute('value') : null;
      case 'select':
        if (this.control.theme === 'material') {
          const selectedValue = this.control.element.element(by.css('span.mat-select-value-text'));
          return await selectedValue.isPresent() ? selectedValue.getText() : null;
        }
        const selectedOption = this.control.element.element(by.css('option:checked'));
        if (await selectedOption.isPresent()) {
          const selectedValue = await selectedOption.getAttribute('value');
          return selectedValue !== 'null' ? selectedValue : null;
        }
        return null;
      default:
        const value = await this.inputElement.getAttribute('value');
        return value ? value.trim() : value;
    }
  }

  async checkInputValue(): Promise<boolean> {
    const inputId = await this.inputElement.getAttribute('id');
    const inputValue = await this.getInputValue();
    return this.isInputForFalse(inputId) ? !inputValue : !!inputValue;
  }

  async editInputValue(): Promise<void> {
    const inputId = await this.inputElement.getAttribute('id');
    switch (this.controlType) {
      case 'checkbox':
      case 'switch':
        const labelElement = this.control.element.element(by.css('label'));
        if (this.isInputForFalse(inputId)) {
          await labelElement.click();
        }
        return labelElement.click();
      case 'radio':
        return this.control.element.element(by.css(`label[for="${inputId}"]`)).click();
      case 'select':
        const optionValue = await this.getEditInputValue();
        await this.inputElement.click();
        await this.inputElement.sendKeys(optionValue);
        return this.control.theme !== 'material' ?  this.inputElement.click() : Promise.resolve();
      default:
        const inputType = await this.getInputType();
        const value = await this.getEditInputValue(inputType);
        return value ? this.inputElement.sendKeys(value) : Promise.resolve();
    }
  }

  private isInputForFalse(inputId: string): boolean {
    switch (inputId) {
      case 'input-hidden':
      case 'input-disabled':
      case 'input-readonly':
        return true;
      default:
        return false;
    }
  }

  private getEditInputValue(type?: string): string | number {
    switch (this.controlType) {
      case 'combobox':
        return 'Value1';
      case 'numberbox':
        return 5;
      case 'datepicker':
        return '01-01-2020';
      case 'select':
        return 'Option 2';
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
