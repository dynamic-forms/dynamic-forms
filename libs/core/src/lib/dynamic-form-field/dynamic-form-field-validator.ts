import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export type DynamicFormValidatorResult = ValidationErrors | null;

export type DynamicFormAsyncValidatorResult = Observable<ValidationErrors | null>;

export type DynamicFormFieldValidatorBaseFn<
  Control extends DynamicFormFieldControl,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
> = (control: Control) => ValidatorResult;

export type DynamicFormFieldValidatorFn<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl
> = DynamicFormFieldValidatorBaseFn<Control, DynamicFormValidatorResult>;

export type DynamicFormFieldAsyncValidatorFn<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl
> = DynamicFormFieldValidatorBaseFn<Control, DynamicFormAsyncValidatorResult>;

export type DynamicFormFieldValidatorBaseFactory<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult
    = DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
  ValidatorFn extends DynamicFormFieldValidatorBaseFn<Control, ValidatorResult>
    = DynamicFormFieldValidatorBaseFn<Control, ValidatorResult>
> = (parameters?: any, message?: string, key?: string, field?: Field) => ValidatorFn;

export type DynamicFormFieldValidatorFactory<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>,
  ValidatorFn extends DynamicFormFieldValidatorFn<Control> = DynamicFormFieldValidatorFn<Control>
> = DynamicFormFieldValidatorBaseFactory<Control, Field, DynamicFormValidatorResult, ValidatorFn>;

export type DynamicFormFieldAsyncValidatorFactory<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>,
  ValidatorFn extends DynamicFormFieldAsyncValidatorFn<Control> = DynamicFormFieldAsyncValidatorFn<Control>
> = DynamicFormFieldValidatorBaseFactory<Control, Field, DynamicFormAsyncValidatorResult, ValidatorFn>;

export abstract class DynamicFormFieldValidatorBase<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult
    = DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
  ValidatorFn extends DynamicFormFieldValidatorBaseFn<Control, ValidatorResult>
    = DynamicFormFieldValidatorBaseFn<Control, ValidatorResult>,
  ValidatorFactory extends DynamicFormFieldValidatorBaseFactory<Control, Field, ValidatorResult, ValidatorFn>
    = DynamicFormFieldValidatorBaseFactory<Control, Field, ValidatorResult, ValidatorFn>
> {
  private _key: string;
  private _field: Field;
  private _factory: ValidatorFactory;

  private _definition: DynamicFormFieldValidatorDefinition;
  private _message: string;

  private _enabled: boolean;
  private _parameters: any;
  private _validatorFn: ValidatorFn;

  constructor(key: string, field: Field, factory: ValidatorFactory) {
    this._key = key;
    this._field = field;
    this._factory = factory;
    this._definition = field.definition.validators && field.definition.validators[key];
    this._message = this._definition && this._definition.message;
    this.init();
  }

  abstract get async(): boolean;

  get key(): string { return this._key; }
  get field(): Field { return this._field; }
  get factory(): ValidatorFactory { return this._factory; }

  get definition(): DynamicFormFieldValidatorDefinition { return this._definition; }
  get message(): any { return this._message; }

  get enabled(): boolean { return this._enabled; }
  get parameters(): any { return this._parameters; }
  get validatorFn(): ValidatorFn { return this._validatorFn; }

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

  protected abstract getParameters(): any;

  private init(): void {
    this._enabled = this.getEnabled();
    this._parameters = this.getParameters();
    this._validatorFn = this.getValidatorFn();
  }

  private getEnabled(): boolean {
    return this._field.template.validation[this._key];
  }

  private getValidatorFn(): ValidatorFn {
    return this._enabled ? this._factory(this._parameters, this._message, this._key, this._field) : undefined;
  }
}

export abstract class DynamicFormFieldValidator<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>,
  ValidatorFn extends DynamicFormFieldValidatorFn<Control> = DynamicFormFieldValidatorFn<Control>,
  ValidatorFactory extends DynamicFormFieldValidatorFactory<Control, Field, ValidatorFn>
    = DynamicFormFieldValidatorFactory<Control, Field, ValidatorFn>
> extends DynamicFormFieldValidatorBase<Control, Field, DynamicFormValidatorResult, ValidatorFn, ValidatorFactory> {

  constructor(key: string, field: Field, factory: ValidatorFactory) {
    super(key, field, factory);
  }

  get async(): boolean { return false; }
}

export abstract class DynamicFormFieldAsyncValidator<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Field extends DynamicFormField<Control> = DynamicFormField<Control>,
  ValidatorFn extends DynamicFormFieldAsyncValidatorFn<Control> = DynamicFormFieldAsyncValidatorFn<Control>,
  ValidatorFactory extends DynamicFormFieldAsyncValidatorFactory<Control, Field, ValidatorFn>
    = DynamicFormFieldAsyncValidatorFactory<Control, Field, ValidatorFn>
> extends DynamicFormFieldValidatorBase<Control, Field, DynamicFormAsyncValidatorResult, ValidatorFn, ValidatorFactory> {

  constructor(key: string, field: Field, factory: ValidatorFactory) {
    super(key, field, factory);
  }

  get async(): boolean { return true; }
}
