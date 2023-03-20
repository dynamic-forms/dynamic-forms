import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import { dynamicFormFieldDefaultDebounce } from '../dynamic-form-field/dynamic-form-field-settings';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormControlAddOn, DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlEvaluator } from './dynamic-form-control-evaluator';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlAsyncValidator, DynamicFormControlValidator } from './dynamic-form-control-validator';

export class DynamicFormControl<
  Value = any,
  Input extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Template extends DynamicFormControlTemplate<Value, Input> = DynamicFormControlTemplate<Value, Input>,
  Definition extends DynamicFormControlDefinition<Value, Input, Template> = DynamicFormControlDefinition<Value, Input, Template>,
  Type extends DynamicFormFieldType = DynamicFormFieldType
> extends DynamicFormField<Value, Value, FormControlBase<Value>, Template, Definition, Type> {

  private _valueChanging: boolean;
  protected _valueSubscription: Subscription;
  protected _evaluators: DynamicFormControlEvaluator[] = [];

  protected _prefixAddOn: DynamicFormControlAddOn;
  protected _suffixAddOn: DynamicFormControlAddOn;

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition, type: Type) {
    super(builder, root, parent, definition, type);
    if (!this.template.input) {
      this.template.input = {} as Input;
    }
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

  get prefixAddOn(): DynamicFormControlAddOn { return this._prefixAddOn; }
  get suffixAddOn(): DynamicFormControlAddOn { return this._suffixAddOn; }

  override init(): void {
    super.init();
    this.initEvaluators();
    this.initPrefixAddOn();
    this.initSuffixAddOn();
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

  resetEmpty(): void {
    this._control.reset(null);
  }

  resetDefault(): void {
    const defaultValue = this.defaultValue;
    this._control.reset(defaultValue);
  }

  validate(): void {
    this._control.markAsTouched();
  }

  patchModel(model: any): void {
    this.setModel(model);
    this.setValue(model, false);
  }

  protected override afterInitExpressions(): void {
    const keys = Object.keys(this.expressions);
    if (keys.includes('input.defaultValue')) {
      this.checkDefaultValue();
    }
  }

  protected getChildren(): DynamicFormElement[] {
    return undefined;
  }

  protected override getHeaderActions(): DynamicFormAction[] {
    return undefined;
  }

  protected override getFooterActions(): DynamicFormAction[] {
    return undefined;
  }

  protected getValidators(): (DynamicFormControlValidator | DynamicFormControlAsyncValidator)[] {
    return this._builder.createControlValidators(this);
  }

  protected getEvaluators(): DynamicFormControlEvaluator[] {
    return this._builder.createControlEvaluators(this);
  }

  protected initEvaluators(): void {
    this._evaluators = this.getEvaluators();
  }

  protected getPrefixAddOn(): DynamicFormControlAddOn {
    return this._builder.createFormControlAddOn(this.root, this, this.definition.prefixAddOn);
  }

  protected initPrefixAddOn(): void {
    this._prefixAddOn = this.getPrefixAddOn();
  }

  protected getSuffixAddOn(): DynamicFormControlAddOn {
    return this._builder.createFormControlAddOn(this.root, this, this.definition.suffixAddOn);
  }

  protected initSuffixAddOn(): void {
    this._suffixAddOn = this.getSuffixAddOn();
  }

  private createModel(): any {
    if (this.parentField.model[this.key] === undefined) {
      this.parentField.model[this.key] = this.defaultValue;
    }
    return this.parentField.model[this.key];
  }

  private createControl(): FormControlBase<Value> {
    const options = { updateOn: this.getUpdateOn() };
    return new FormControlBase<Value>(this._model, options);
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

  protected override get defaultValue(): any {
    return this.input?.defaultValue !== undefined ? this.input.defaultValue : super.defaultValue || null;
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
    if (this.model !== this.defaultValue) {
      this.setModel(this.defaultValue);
      this.setValue(this.defaultValue, false);
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
