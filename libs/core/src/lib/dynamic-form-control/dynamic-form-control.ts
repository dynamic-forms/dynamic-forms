import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldEvaluator } from '../dynamic-form-field/dynamic-form-field-evaluator';
import { dynamicFormFieldDefaultDebounceTime } from '../dynamic-form-field/dynamic-form-field-options';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

export type DynamicFormControlEvaluator<FormInput extends DynamicFormInput = DynamicFormInput> =
  DynamicFormFieldEvaluator<DynamicFormControl<FormInput>>;

export class DynamicFormControl<FormInput extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormField<FormControl, DynamicFormControlTemplate<FormInput>, DynamicFormControlDefinition<FormInput>> {

  protected _valueSubscription: Subscription;
  protected _evaluators: DynamicFormControlEvaluator[] = [];
  protected _validators: DynamicFormControlValidator[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition<FormInput>) {
    super(root, parent, definition);
    this._model = this.createModel();
    this._control = this.createControl();
    this._valueSubscription = this.createValueSubscription();
  }

  get inputType() { return this.template.input.type; }

  get evaluators() { return this._evaluators; }
  get validators() { return this._validators; }

  setEvaluators(evaluators: DynamicFormControlEvaluator[]) {
    this._evaluators = evaluators || [];
  }

  setValidators(validators: DynamicFormControlValidator[]) {
    this._validators = validators || [];
    this._control.setValidators(this.getValidatorFunctions());
  }

  check() {
    this.checkValue();
    this.checkControl();
    this.checkValidators();
  }

  destroy() {
    this._valueSubscription.unsubscribe();
  }

  reset() {
    this._control.reset(null);
  }

  resetDefault() {
    const defaultValue = this.getDefaultValue();
    this._control.reset(defaultValue);
  }

  validate() {
    this._control.markAsTouched();
  }

  private createModel() {
    const key = this.definition.key;
    if (this.parent.model[key] === undefined) {
      this.parent.model[key] = this.getDefaultValue();
    }
    return this.parent.model[key];
  }

  private getDefaultValue() {
    const input = this.definition.template.input;
    return input && input.defaultValue !== undefined ? input.defaultValue : null;
  }

  private createControl() {
    const options = { updateOn: this.updateOn };
    return new FormControl(this._model, options);
  }

  private get updateOn() {
    const update = this.options.update;
    if (update === 'debounce' || typeof update === 'object') {
      return 'change';
    }
    return update;
  }

  private createValueSubscription() {
    const update = this.options.update;
    const valueChanges = this._control.valueChanges;
    const observer = { next: model => this.setModel(model) };
    if (update === 'debounce') {
      const time = dynamicFormFieldDefaultDebounceTime;
      return valueChanges.pipe(debounceTime(time)).subscribe(observer);
    }
    if (typeof update === 'object') {
      const time = update.time || dynamicFormFieldDefaultDebounceTime;
      return valueChanges.pipe(debounceTime(time)).subscribe(observer);
    }
    return valueChanges.subscribe(observer);
  }

  private setModel(model) {
    this.parent.model[this.definition.key] = model;
    this._model = this.parent.model[this.definition.key];
  }

  private getValidatorFunctions() {
    return this._validators.filter(validator => !!validator.validatorFn)
      .map(validator => validator.validatorFn);
  }

  private checkValue() {
    this._evaluators.forEach(evaluator => evaluator.func(this));
  }

  private checkControl() {
    const disabled = this.parent.control.disabled || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      return disabled ? this.control.disable() : this.control.enable();
    }
  }

  private checkValidators() {
    const validatorsChanged = this.validatorsChanged();
    if (validatorsChanged) {
      this.control.setValidators(this.getValidatorFunctions());
      this.control.updateValueAndValidity();
    }
  }

  private validatorsChanged(): boolean {
    return this._validators
      .map(validator => validator.checkChanges())
      .some(change => !!change);
  }
}
