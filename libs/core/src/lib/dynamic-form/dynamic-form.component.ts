import { Component, DoCheck, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
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
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy, DoCheck {

  private _form: DynamicForm;
  private _formSubmit: Subscription;

  @Input() definition: DynamicFormDefinition;
  @Input() model: any;
  @Output() formSubmit: EventEmitter<DynamicFormSubmit> = new EventEmitter<DynamicFormSubmit>();

  constructor(
    protected formBuilder: DynamicFormBuilder,
    protected validationService: DynamicFormValidationService,
    @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string
  ) {}

  get form(): DynamicForm { return this._form; }
  get formGroup(): FormGroup { return this._form.control; }

  get template(): DynamicFormTemplate { return this._form.template; }
  get elements(): DynamicFormElement[] { return this._form.elements; }

  get headerActions(): DynamicFormAction[] { return this._form.headerActions; }
  get footerActions(): DynamicFormAction[] { return this._form.footerActions; }

  get errors(): DynamicFormValidationErrors {
    return this.formGroup.errors;
  }

  get hasErrors(): boolean {
    return (this.errors || false) && true;
  }

  get showErrors(): boolean {
    return this.hasErrors && this.formGroup.touched;
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

  resetDefault(): void {
    this._form.resetDefault();
  }

  private initForm(): void {
    this.model = this.model || {};
    this._form = this.formBuilder.initForm(this.definition, this.model);
    this._formSubmit = this._form.submit$.subscribe({ next: () => this.submit() });
  }

  private destroyForm(): void {
    this._form.destroy();
    this._formSubmit.unsubscribe();
  }
}
