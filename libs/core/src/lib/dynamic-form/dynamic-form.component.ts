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

  private _field: DynamicForm;
  private _fieldSubmit: Subscription;

  @Input() definition: DynamicFormDefinition;
  @Input() model: any;
  @Output() formSubmit: EventEmitter<DynamicFormSubmit> = new EventEmitter<DynamicFormSubmit>();

  constructor(
    protected formBuilder: DynamicFormBuilder,
    protected validationService: DynamicFormValidationService,
    @Optional() @Inject(DYNAMIC_FORM_THEME) public theme: string
  ) {}

  get formField(): DynamicForm { return this._field; }
  get formGroup(): FormGroup { return this._field.control; }

  get template(): DynamicFormTemplate { return this._field.template; }
  get elements(): DynamicFormElement[] { return this._field.elements; }

  get headerActions(): DynamicFormAction[] { return this._field.headerActions; }
  get footerActions(): DynamicFormAction[] { return this._field.footerActions; }

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
    this.initFormField();
  }

  ngDoCheck(): void {
    this._field.check();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modelChanged = changes.model && !changes.model.firstChange;
    const definitionChanged = changes.definition && !changes.definition.firstChange;
    if (modelChanged || definitionChanged) {
      this.destroyFormField();
      this.initFormField();
    }
  }

  ngOnDestroy(): void {
    this._field.destroy();
    this._fieldSubmit.unsubscribe();
  }

  submit(): void {
    this.formSubmit.emit({ value: this.formGroup.value, model: this.model });
  }

  validate(): void {
    this._field.validate();
  }

  reset(): void {
    this._field.reset();
  }

  resetDefault(): void {
    this._field.resetDefault();
  }

  private initFormField(): void {
    this.model = this.model || {};
    this._field = this.formBuilder.initForm(this.definition, this.model);
    this._fieldSubmit = this._field.submit$.subscribe({ next: () => this.submit() });
  }

  private destroyFormField(): void {
    this._field.destroy();
    this._fieldSubmit.unsubscribe();
  }
}
