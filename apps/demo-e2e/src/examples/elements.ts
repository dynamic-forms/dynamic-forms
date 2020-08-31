import { by, ElementArrayFinder, ElementFinder } from 'protractor';

export interface ControlInfo {
  isPresent: boolean;
  readonly: boolean;
  hidden: boolean;
  type: string;
}

export class Control {
  private readonly _types: string[] = [
    'checkbox', 'combobox', 'datepicker', 'numberbox', 'radio', 'select', 'switch', 'textarea', 'textbox'
  ];

  constructor(public element: ElementFinder, public theme: string) {}

  async getControlType(): Promise<string> {
    const className = await this.element.getAttribute('class');
    return this.getType(className);
  }

  async getControlInfo(): Promise<ControlInfo> {
    const isPresent = await this.element.isPresent();
    const className = await this.element.getAttribute('class');
    const readonly = className.includes('readonly');
    const hidden = className.includes('hidden');
    const type = this.getType(className);
    return { isPresent, readonly, hidden, type };
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

export interface InputInfo {
  isPresent: boolean;
  id: string;
  tag: string;
  type: string;
  readonly: boolean;
  disabled: boolean;
  value: string | boolean;
}

export class Input {
  readonly inputElement: ElementFinder;

  constructor(public controlType: string, public control: Control, public inputElements: ElementFinder | ElementArrayFinder) {
    this.inputElement = this.inputElements instanceof ElementArrayFinder ? this.inputElements.get(0) : this.inputElements;
  }

  async getInputInfo(): Promise<InputInfo> {
    const isPresent = await this.inputElement.isPresent();
    const id = await  this.inputElement.getAttribute('class');
    const tag = await  this.inputElement.getTagName();
    const type = await  this.inputElement.getAttribute('type');
    const className = await  this.inputElement.getAttribute('class');
    const readonly = className.includes('readonly');
    const disabled = !await  this.inputElement.isEnabled();
    const value = await this.getInputValue();
    return { isPresent, id, tag, type, readonly, disabled, value };
  }

  async getInputType(): Promise<string> {
    return await this.inputElement.getAttribute('type');
  }

  async getInputValue(): Promise<string | boolean> {
    switch (this.controlType) {
      case 'checkbox':
      case 'switch':
        return await this.inputElement.getAttribute('checked');
      case 'radio':
        const checkedRadio = this.control.element.element(by.css('input[type="radio"]:checked'));
        return await checkedRadio.isPresent() ? await checkedRadio.getAttribute('value') : null;
      case 'select':
        const selectedOption = this.control.element.element(by.css('option:checked'));
        if (await selectedOption.isPresent()) {
          const value = await selectedOption.getAttribute('value');
          return value !== 'null' ? value : null;
        }
        return null;
      default:
        return await this.inputElement.getAttribute('value');
    }
  }

  async editInputValue(): Promise<void> {
    switch (this.controlType) {
      case 'checkbox':
      case 'switch':
        return this.control.element.element(by.css('label')).click();
      case 'radio':
        const inputElementId = await this.inputElement.getAttribute('id');
        return await this.control.element.element(by.css(`label[for="${inputElementId}"]`)).click();
      case 'select':
        const optionValue = await this.getEditInputValue();
        await this.inputElement.click();
        await this.inputElement.sendKeys(optionValue);
        return await this.inputElement.click();
      default:
        const inputType = await this.getInputType();
        const value = await this.getEditInputValue(inputType);
        return value ? await this.inputElement.sendKeys(value) : Promise.resolve();
    }
  }

  private getEditInputValue(type?: string): string {
    switch (this.controlType) {
      case 'combobox':
        return 'Value1';
      case 'numberbox':
        return '2020';
      case 'datepicker':
        return '01-01-2020';
      case 'select':
        return 'Option 1';
      case 'textarea':
        return 'Test line 1\nTest line 2';
      case 'textbox':
        return type === 'email'
          ? 'Test@test.com'
          : type === 'password'
            ? 'Test1234!'
            : 'Test';
      default:
        return null;
    }
  }

}
