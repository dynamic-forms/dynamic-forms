/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  DoCheck,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementsComponent } from '../dynamic-form-element/dynamic-form-elements.component';
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
  standalone: true,
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  imports: [NgClass, NgIf, ReactiveFormsModule, DynamicFormElementsComponent],
})
export class DynamicFormComponent<Value extends { [key: string]: any } = any, Model extends Value = Value>
  implements OnInit, OnChanges, OnDestroy, DoCheck
{
  private _form: DynamicForm<Value, Model>;
  private _formSubmit: Subscription;
  private _formValueChanges: Subscription;

  @Input() definition: DynamicFormDefinition;
  @Input() model: Model;
  @Output() valueChange = new EventEmitter<Value>();
  @Output() formSubmit = new EventEmitter<DynamicFormSubmit>();

  constructor(
    protected formBuilder: DynamicFormBuilder,
    protected validationService: DynamicFormValidationService,
    @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string,
  ) {}

  get value(): any {
    return this._form.value;
  }

  get form(): DynamicForm<Value, Model> {
    return this._form;
  }

  get formGroup(): FormGroupBase<Value> {
    return this._form.control;
  }

  get template(): DynamicFormTemplate {
    return this._form.template;
  }

  get children(): DynamicFormElement[] {
    return this._form.children;
  }

  get headerActions(): DynamicFormAction[] {
    return this._form.headerActions;
  }

  get footerActions(): DynamicFormAction[] {
    return this._form.footerActions;
  }

  get errors(): DynamicFormValidationErrors {
    return this.form.errors;
  }

  get hasErrors(): boolean {
    return this.form.hasErrors;
  }

  get showErrors(): boolean {
    return this.form.showErrors;
  }

  get errorMessage(): string {
    return this.validationService.getErrorMessage(this.errors);
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngDoCheck(): void {
    this._form.check();
  }

  ngOnChanges({ model, definition }: SimpleChanges): void {
    const modelChanged = model && !model.firstChange;
    const definitionChanged = definition && !definition.firstChange;
    if (modelChanged || definitionChanged) {
      this.destroyForm();
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this._form.destroy();
    this._formSubmit.unsubscribe();
    this._formValueChanges.unsubscribe();
  }

  submit(): void {
    this.formSubmit.emit({ value: this.value, model: this.model, files: this.form.getFiles() });
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
    this.model = this.model || ({} as Model);
    this._form = this.formBuilder.initForm<Value, Model>(this.definition, this.model);
    this._formSubmit = this._form.submit$.subscribe(() => this.submit());
    this._formValueChanges = this.formGroup.valueChanges.subscribe(value => this.valueChange.emit(value));
  }

  private destroyForm(): void {
    this._form.destroy();
    this._formSubmit.unsubscribe();
    this._formValueChanges.unsubscribe();
  }
}
