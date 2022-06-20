import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export type DynamicFormValidatorResult = ValidationErrors | null;

export type DynamicFormAsyncValidatorResult = Observable<ValidationErrors | null>;

export type DynamicFormFieldValidatorBaseFn<
  Value,
  Control extends DynamicFormFieldControl<Value>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
> = (control: Control) => ValidatorResult;

export type DynamicFormFieldValidatorFn<
  Value = any,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>
> = DynamicFormFieldValidatorBaseFn<Value, Control, DynamicFormValidatorResult>;

export type DynamicFormFieldAsyncValidatorFn<
Value = any,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>
> = DynamicFormFieldValidatorBaseFn<Value, Control, DynamicFormAsyncValidatorResult>;

export type DynamicFormFieldValidatorBaseFactory<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Field extends DynamicFormField<Value, Model, Control> = DynamicFormField<Value, Model, Control>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult
    = DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
  ValidatorFn extends DynamicFormFieldValidatorBaseFn<Value, Control, ValidatorResult>
    = DynamicFormFieldValidatorBaseFn<Value, Control, ValidatorResult>
> = (parameters?: any, message?: string, key?: string, field?: Field, deps?: any[]) => ValidatorFn;

export type DynamicFormFieldValidatorFactory<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Field extends DynamicFormField<Value, Model, Control> = DynamicFormField<Value, Model, Control>,
  ValidatorFn extends DynamicFormFieldValidatorFn<Value, Control> = DynamicFormFieldValidatorFn<Value, Control>
> = DynamicFormFieldValidatorBaseFactory<Value, Model, Control, Field, DynamicFormValidatorResult, ValidatorFn>;

export type DynamicFormFieldAsyncValidatorFactory<
Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Field extends DynamicFormField<Value, Model, Control> = DynamicFormField<Value, Model, Control>,
  ValidatorFn extends DynamicFormFieldAsyncValidatorFn<Value, Control> = DynamicFormFieldAsyncValidatorFn<Value, Control>
> = DynamicFormFieldValidatorBaseFactory<Value, Model, Control, Field, DynamicFormAsyncValidatorResult, ValidatorFn>;

export abstract class DynamicFormFieldValidatorBase<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Field extends DynamicFormField<Value, Model, Control> = DynamicFormField<Value, Model, Control>,
  ValidatorResult extends DynamicFormValidatorResult | DynamicFormAsyncValidatorResult
    = DynamicFormValidatorResult | DynamicFormAsyncValidatorResult,
  ValidatorFn extends DynamicFormFieldValidatorBaseFn<Value, Control, ValidatorResult>
    = DynamicFormFieldValidatorBaseFn<Value, Control, ValidatorResult>,
  ValidatorFactory extends DynamicFormFieldValidatorBaseFactory<Value, Model, Control, Field, ValidatorResult, ValidatorFn>
    = DynamicFormFieldValidatorBaseFactory<Value, Model, Control, Field, ValidatorResult, ValidatorFn>
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
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Field extends DynamicFormField<Value, Model, Control> = DynamicFormField<Value, Model, Control>,
  ValidatorFn extends DynamicFormFieldValidatorFn<Value, Control> = DynamicFormFieldValidatorFn<Value, Control>,
  ValidatorFactory extends DynamicFormFieldValidatorFactory<Value, Model, Control, Field, ValidatorFn>
    = DynamicFormFieldValidatorFactory<Value, Model, Control, Field, ValidatorFn>
> extends DynamicFormFieldValidatorBase<Value, Model, Control, Field, DynamicFormValidatorResult, ValidatorFn, ValidatorFactory> {

  constructor(factory: ValidatorFactory, key: string, field: Field, deps?: any[]) {
    super(factory, key, field, deps);
  }

  get async(): boolean { return false; }
}

export abstract class DynamicFormFieldAsyncValidator<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Field extends DynamicFormField<Value, Model, Control> = DynamicFormField<Value, Model, Control>,
  ValidatorFn extends DynamicFormFieldAsyncValidatorFn<Value, Control> = DynamicFormFieldAsyncValidatorFn<Value, Control>,
  ValidatorFactory extends DynamicFormFieldAsyncValidatorFactory<Value, Model, Control, Field, ValidatorFn>
    = DynamicFormFieldAsyncValidatorFactory<Value, Model, Control, Field, ValidatorFn>
> extends DynamicFormFieldValidatorBase<Value, Model, Control, Field, DynamicFormAsyncValidatorResult, ValidatorFn, ValidatorFactory> {

  constructor(factory: ValidatorFactory, key: string, field: Field, deps?: any[]) {
    super(factory, key, field, deps);
  }

  get async(): boolean { return true; }
}
