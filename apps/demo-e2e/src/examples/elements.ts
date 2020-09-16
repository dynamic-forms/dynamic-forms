import { By, ElementArrayFinder, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const KEY = protractor.Key;

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
        const radioElements = this.element.all(By.css('input[type="radio"]'));
        return new Input(controlType, this, radioElements);
      case 'select':
        const selectElement = this.element.element(By.css('select,mat-select'));
        return new Input(controlType, this, selectElement);
      case 'textarea':
        const textareaElement = this.element.element(By.css('textarea'));
        return new Input(controlType, this, textareaElement);
      default:
        const inputElement = this.element.element(By.css('input'));
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
        const checkedRadio = this.control.element.element(By.css('input[type="radio"]:checked'));
        return await checkedRadio.isPresent() ? checkedRadio.getAttribute('value') : null;
      case 'select':
        if (this.control.theme === 'material') {
          const selectedValue = this.control.element.element(By.css('span.mat-select-value-text'));
          return await selectedValue.isPresent() ? selectedValue.getText() : null;
        }
        const selectedOption = this.control.element.element(By.css('option:checked'));
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
        const labelElement = this.control.element.element(By.css('label'));
        if (this.isInputForFalse(inputId)) {
          await labelElement.click();
        }
        return labelElement.click();
      case 'radio':
        return this.control.element.element(By.css(`label[for="${inputId}"]`)).click();
      case 'select':
        const keys = this.control.theme !== 'material'
          ? [ KEY.ARROW_DOWN, KEY.ARROW_DOWN, KEY.ENTER ]
          : [ KEY.ARROW_DOWN, KEY.ENTER ];
        await this.inputElement.click();
        return await this.inputElement.sendKeys(...keys);
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
        return 'Option 1';
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
