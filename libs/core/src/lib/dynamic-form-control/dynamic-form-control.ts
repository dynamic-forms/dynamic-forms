import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { dynamicFormFieldDefaultDebounceTime } from '../dynamic-form-field/dynamic-form-field-options';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlEvaluator } from './dynamic-form-control-evaluator';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export class DynamicFormControl<
  Input extends DynamicFormInput = DynamicFormInput,
  Template extends DynamicFormControlTemplate<Input> = DynamicFormControlTemplate<Input>,
  Definition extends DynamicFormControlDefinition<Input, Template> = DynamicFormControlDefinition<Input, Template>
> extends DynamicFormField<FormControl, Template, Definition> {

  protected _valueSubscription: Subscription;
  protected _evaluators: DynamicFormControlEvaluator<Input>[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: Definition) {
    super(root, parent, definition);
    this._model = this.createModel();
    this._control = this.createControl();
    this._valueSubscription = this.createValueSubscription();
  }

  get input(): Input { return this.template.input; }
  get inputId(): string { return this.id || this.path; }
  get inputComponentType(): string { return this.input.type; }

  get evaluators(): DynamicFormControlEvaluator<Input>[] { return this._evaluators; }

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

  private createModel(): any {
    if (this.parent.model[this.key] === undefined) {
      this.parent.model[this.key] = this.getDefaultValue();
    }
    return this.parent.model[this.key];
  }

  private getDefaultValue(): any {
    const input = this.definition.template.input;
    return input && input.defaultValue !== undefined ? input.defaultValue : null;
  }

  private createControl(): FormControl {
    const options = { updateOn: this.updateOn };
    return new FormControl(this._model, options);
  }

  private get updateOn(): 'change' | 'blur' {
    const update = this.options.update;
    if (update === 'debounce' || typeof update === 'object') {
      return 'change';
    }
    return update;
  }

  private createValueSubscription(): Subscription {
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

  private setModel(model: any): void {
    this.parent.model[this.key] = model;
    this._model = this.parent.model[this.key];
  }

  private checkValue(): void {
    this._evaluators.forEach(evaluator => evaluator.func(this));
  }

  private checkControl(): void {
    const disabled = this.parent.control.disabled || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      return disabled ? this.control.disable() : this.control.enable();
    }
  }
}
