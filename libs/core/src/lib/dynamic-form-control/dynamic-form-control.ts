import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { dynamicFormFieldDefaultDebounce } from '../dynamic-form-field/dynamic-form-field-settings';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlEvaluator } from './dynamic-form-control-evaluator';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export class DynamicFormControl<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<Input> = DynamicFormControlTemplate<Input>,
  Definition extends DynamicFormControlDefinition<Input, Template> = DynamicFormControlDefinition<Input, Template>
> extends DynamicFormField<FormControl, Template, Definition> {

  private _valueChanging: boolean;
  protected _valueSubscription: Subscription;
  protected _evaluators: DynamicFormControlEvaluator[] = [];

  constructor(root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(root, parent, definition);
    this._model = this.createModel();
    this._control = this.createControl();
    this._valueSubscription = this.createValueSubscription();
    this.extendExpressionData({ input: () => this.input });
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'control'; }

  get input(): Input { return this.template.input; }
  get inputId(): string { return this.id || this.path; }
  get inputType(): string { return this.input.type; }

  get evaluators(): DynamicFormControlEvaluator[] { return this._evaluators; }

  initEvaluators(evaluators: DynamicFormControlEvaluator[]): void {
    this._evaluators = evaluators || [];
  }

  check(): void {
    this.checkValue();
    this.checkControl();
    this.checkValidators();
  }

  destroy(): void {
    this._valueSubscription.unsubscribe();
  }

  reset(): void {
    this._control.reset(null);
  }

  resetDefault(): void {
    const defaultValue = this.getDefaultValue();
    this._control.reset(defaultValue);
  }

  validate(): void {
    this._control.markAsTouched();
  }

  patchModel(model: any): void {
    this.setModel(model);
    this.setValue(model, false);
  }

  protected afterInitExpressions(): void {
    const keys = Object.keys(this._expressions);
    if (keys.includes('input.defaultValue')) {
      this.checkDefaultValue();
    }
  }

  private createModel(): any {
    if (this.parentField.model[this.key] === undefined) {
      this.parentField.model[this.key] = this.getDefaultValue();
    }
    return this.parentField.model[this.key];
  }

  private createControl(): FormControl {
    const options = { updateOn: this.getUpdateOn() };
    return new FormControl(this._model, options);
  }

  private createValueSubscription(): Subscription {
    const valueChanges = this._control.valueChanges;
    const observer = { next: value => this.setModel(value) };
    if (this.settings.updateType === 'debounce') {
      const debounce = this.settings.updateDebounce || dynamicFormFieldDefaultDebounce;
      return valueChanges.pipe(
        tap(() => this._valueChanging = true),
        debounceTime(debounce),
        tap(() => this._valueChanging = false),
      ).subscribe(observer);
    }
    return valueChanges.subscribe(observer);
  }

  private getDefaultValue(): any {
    const input = this.definition.template.input;
    return input && input.defaultValue !== undefined ? input.defaultValue : null;
  }

  private getUpdateOn(): 'change' | 'blur' | 'submit' {
    if (this.settings.updateType === 'debounce') {
      return 'change';
    }
    return this.settings.updateType;
  }

  private setModel(value: any): void {
    this.parentField.model[this.key] = value;
    this._model = this.parentField.model[this.key];
  }

  private setValue(value: any, markAsTouched: boolean): void {
    this._control.setValue(value, { onlySelf: true, emitEvent: false });
    return markAsTouched && this._control.markAsTouched();
  }

  private checkDefaultValue(): void {
    const defaultValue = this.getDefaultValue();
    if (this.model !== defaultValue) {
      this.setModel(defaultValue);
      this.setValue(defaultValue, false);
    }
  }

  private checkValue(): void {
    if (this._valueChanging) {
      return;
    }

    const value = this.parentField.model[this.key];
    if (this._control.value !== value || this._model !== value) {
      this.setModel(value);
      this.setValue(value, true);
    }
    this._evaluators.filter(e => !!e.enabled).forEach(e => e.func(this));
  }
}
