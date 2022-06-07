import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export type DynamicFormValidatorResult = ValidationErrors | null;

export type DynamicFormAsyncValidatorResult = Observable<ValidationErrors | null>;

export type DynamicFormFieldValidatorBaseFn<
  TValue,
  Control extends DynamicFormFieldControl<TValue>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
> = (control: Control) => ValidatorResult;

export type DynamicFormFieldValidatorFn<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>
> = DynamicFormFieldValidatorBaseFn<TValue, Control, DynamicFormValidatorResult>;

export type DynamicFormFieldAsyncValidatorFn<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>
> = DynamicFormFieldValidatorBaseFn<TValue, Control, DynamicFormAsyncValidatorResult>;

export type DynamicFormFieldValidatorBaseFactory<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Field extends DynamicFormField<TValue, Control> = DynamicFormField<TValue, Control>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult
    = DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
  ValidatorFn extends DynamicFormFieldValidatorBaseFn<TValue, Control, ValidatorResult>
    = DynamicFormFieldValidatorBaseFn<TValue, Control, ValidatorResult>
> = (parameters?: any, message?: string, key?: string, field?: Field, deps?: any[]) => ValidatorFn;

export type DynamicFormFieldValidatorFactory<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Field extends DynamicFormField<TValue, Control> = DynamicFormField<TValue, Control>,
  ValidatorFn extends DynamicFormFieldValidatorFn<TValue, Control> = DynamicFormFieldValidatorFn<TValue, Control>
> = DynamicFormFieldValidatorBaseFactory<TValue, Control, Field, DynamicFormValidatorResult, ValidatorFn>;

export type DynamicFormFieldAsyncValidatorFactory<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Field extends DynamicFormField<TValue, Control> = DynamicFormField<TValue, Control>,
  ValidatorFn extends DynamicFormFieldAsyncValidatorFn<TValue, Control> = DynamicFormFieldAsyncValidatorFn<TValue, Control>
> = DynamicFormFieldValidatorBaseFactory<TValue, Control, Field, DynamicFormAsyncValidatorResult, ValidatorFn>;

export abstract class DynamicFormFieldValidatorBase<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Field extends DynamicFormField<TValue, Control> = DynamicFormField<TValue, Control>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult
    = DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
  ValidatorFn extends DynamicFormFieldValidatorBaseFn<TValue, Control, ValidatorResult>
    = DynamicFormFieldValidatorBaseFn<TValue, Control, ValidatorResult>,
  ValidatorFactory extends DynamicFormFieldValidatorBaseFactory<TValue, Control, Field, ValidatorResult, ValidatorFn>
    = DynamicFormFieldValidatorBaseFactory<TValue, Control, Field, ValidatorResult, ValidatorFn>
> {
  private _factory: ValidatorFactory;
  private _key: string;
  private _field: Field;
  private _deps: any[];

  private _definition: DynamicFormFieldValidatorDefinition;
  private _message: string;

  private _enabled: boolean;
  private _parameters: any;
  private _validatorFn: ValidatorFn;

  constructor(factory: ValidatorFactory, key: string, field: Field, deps?: any[]) {
    this._factory = factory;
    this._key = key;
    this._field = field;
    this._deps = deps;
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
    return this._enabled ? this._factory(this._parameters, this._message, this._key, this._field, this._deps) : undefined;
  }
}

export abstract class DynamicFormFieldValidator<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Field extends DynamicFormField<TValue, Control> = DynamicFormField<TValue, Control>,
  ValidatorFn extends DynamicFormFieldValidatorFn<TValue, Control> = DynamicFormFieldValidatorFn<TValue, Control>,
  ValidatorFactory extends DynamicFormFieldValidatorFactory<TValue, Control, Field, ValidatorFn>
    = DynamicFormFieldValidatorFactory<TValue, Control, Field, ValidatorFn>
> extends DynamicFormFieldValidatorBase<TValue, Control, Field, DynamicFormValidatorResult, ValidatorFn, ValidatorFactory> {

  constructor(factory: ValidatorFactory, key: string, field: Field, deps?: any[]) {
    super(factory, key, field, deps);
  }

  get async(): boolean { return false; }
}

export abstract class DynamicFormFieldAsyncValidator<
  TValue = any,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Field extends DynamicFormField<TValue, Control> = DynamicFormField<TValue, Control>,
  ValidatorFn extends DynamicFormFieldAsyncValidatorFn<TValue, Control> = DynamicFormFieldAsyncValidatorFn<TValue, Control>,
  ValidatorFactory extends DynamicFormFieldAsyncValidatorFactory<TValue, Control, Field, ValidatorFn>
    = DynamicFormFieldAsyncValidatorFactory<TValue, Control, Field, ValidatorFn>
> extends DynamicFormFieldValidatorBase<TValue, Control, Field, DynamicFormAsyncValidatorResult, ValidatorFn, ValidatorFactory> {

  constructor(factory: ValidatorFactory, key: string, field: Field, deps?: any[]) {
    super(factory, key, field, deps);
  }

  get async(): boolean { return true; }
}
