import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldEvaluatorFn } from './dynamic-form-field-evaluator-type';

export abstract class DynamicFormFieldEvaluator<
  Field extends DynamicFormField = DynamicFormField,
  EvaluatorFn extends DynamicFormFieldEvaluatorFn<Field> = DynamicFormFieldEvaluatorFn<Field>
> {
  private _key: string;
  private _type: string;
  private _field: Field;
  private _func: EvaluatorFn;

  constructor(key: string, type: string, field: Field, func: EvaluatorFn) {
    this._key = key;
    this._type = type;
    this._field = field;
    this._func = func;
  }

  get key(): string { return this._key; }
  get type(): string { return this._type; }
  get field(): Field { return this._field; }
  get func(): EvaluatorFn { return this._func; }

  abstract get enabled(): boolean;
}
