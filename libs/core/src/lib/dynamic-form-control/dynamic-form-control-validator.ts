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
    this._enabled = this.getEnabled();
    this._parameters = this.getParameters();
    this._validatorFn = this.getValidatorFn();
  }

  get enabled() { return this._enabled; }
  get parameters() { return this._parameters; }
  get validatorFn() { return this._validatorFn; }

  checkChanges(): boolean {
    const enabled = this.getEnabled();
    const parameters = this.getParameters();
    if (this._enabled !== enabled || this._parameters !== parameters) {
      this._enabled = enabled;
      this._parameters = parameters;
      this._validatorFn = this.getValidatorFn();
      return true;
    }
    return false;
  }

  private getEnabled() { return this.template.validation[this.key]; }
  private getParameters() { return this.template.input[this.key]; }
  private getValidatorFn() { return this._enabled ? this.factory(this._parameters) : undefined; }
}
