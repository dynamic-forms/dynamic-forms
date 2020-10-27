import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
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
  protected _evaluators: DynamicFormControlEvaluator<Input>[] = [];

  constructor(root: DynamicForm, parent: DynamicFormField, definition: Definition) {
    super(root, parent, definition);
    this._model = this.createModel();
    this._control = this.createControl();
    this._valueSubscription = this.createValueSubscription();
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'control'; }

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

  private get updateOn(): 'change' | 'blur' | 'submit' {
    if (this.settings.updateType === 'debounce') {
      return 'change';
    }
    return this.settings.updateType;
  }

  private createValueSubscription(): Subscription {
    const valueChanges = this._control.valueChanges;
    const observer = { next: model => this.setModel(model) };
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

  private setModel(model: any): void {
    this.parent.model[this.key] = model;
    this._model = this.parent.model[this.key];
  }

  private checkValue(): void {
    const model = this.parent.model[this.key];
    if (!this._valueChanging && (this._control.value !== model || this._model !== model)) {
      this._model = model;
      this._control.setValue(model, { onlySelf: true, emitEvent: false });
      this._control.markAsTouched();
    }
    this._evaluators.forEach(evaluator => evaluator.func(this));
  }
}
