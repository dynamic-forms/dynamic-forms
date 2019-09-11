import { ValidatorFn } from '@angular/forms';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export type DynamicFormControlValidatorFactory = (parameters: any) => ValidatorFn;

export class DynamicFormControlValidator {
  private _enabled: boolean;
  private _parameters: any;
  private _validatorFn: ValidatorFn;

  constructor(
    readonly key: string,
    readonly template: DynamicFormControlTemplate,
    readonly factory: DynamicFormControlValidatorFactory
  ) {
    this._enabled = template.validation[key];
    this._parameters = template.input[key];
    this._validatorFn = this._enabled ? factory(this._parameters) : undefined;
  }

  get enabled() { return this._enabled; }
  get parameters() { return this._parameters; }
  get validatorFn() { return this._validatorFn; }

  checkChanges(): boolean {
    const enabled = this.template.validation[this.key];
    const parameters = this.template.input[this.key];
    if (this._enabled !== enabled || this._parameters !== parameters) {
      this._enabled = enabled;
      this._parameters = parameters;
      this._validatorFn = enabled ? this.factory(parameters) : undefined;
      return true;
    }
    return false;
  }
}
