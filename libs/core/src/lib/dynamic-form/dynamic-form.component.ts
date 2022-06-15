/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import {
  Component, DoCheck, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { FormGroupBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormSubmit } from './dynamic-form-submit';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DYNAMIC_FORM_THEME } from './dynamic-form-theme';
import { DynamicFormBuilder } from './dynamic-form.builder';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent<Value = any, Model extends Value = Value> implements OnInit, OnChanges, OnDestroy, DoCheck {

  private _form: DynamicForm<Value, Model>;
  private _formSubmit: Subscription;

  @Input() definition: DynamicFormDefinition;
  @Input() model: Model;
  @Output() formSubmit: EventEmitter<DynamicFormSubmit> = new EventEmitter<DynamicFormSubmit>();

  constructor(
    protected formBuilder: DynamicFormBuilder,
    protected validationService: DynamicFormValidationService,
    @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string,
  ) {}

  get form(): DynamicForm<Value, Model> { return this._form; }
  get formGroup(): FormGroupBase<Value> { return this._form.control; }

  get template(): DynamicFormTemplate { return this._form.template; }

  get children(): DynamicFormElement[] { return this._form.children; }
  get headerActions(): DynamicFormAction[] { return this._form.headerActions; }
  get footerActions(): DynamicFormAction[] { return this._form.footerActions; }

  get errors(): DynamicFormValidationErrors { return this.form.errors; }
  get hasErrors(): boolean { return this.form.hasErrors; }
  get showErrors(): boolean { return this.form.showErrors; }

  get errorMessage(): string {
    return this.validationService.getErrorMessage(this.errors);
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngDoCheck(): void {
    this._form.check();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modelChanged = changes.model && !changes.model.firstChange;
    const definitionChanged = changes.definition && !changes.definition.firstChange;
    if (modelChanged || definitionChanged) {
      this.destroyForm();
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this._form.destroy();
    this._formSubmit.unsubscribe();
  }

  submit(): void {
    this.formSubmit.emit({ value: this.formGroup.value, model: this.model });
  }

  validate(): void {
    this._form.validate();
  }

  reset(): void {
    this._form.reset();
  }

  resetEmpty(): void {
    this._form.resetEmpty();
  }

  resetDefault(): void {
    this._form.resetDefault();
  }

  private initForm(): void {
    this.model = this.model || {} as Model;
    this._form = this.formBuilder.initForm(this.definition, this.model);
    this._formSubmit = this._form.submit$.subscribe({ next: () => this.submit() });
  }

  private destroyForm(): void {
    this._form.destroy();
    this._formSubmit.unsubscribe();
  }
}
