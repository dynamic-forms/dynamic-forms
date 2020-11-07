import { Component, DoCheck, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
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

  private _formField: DynamicForm;
  private _formFieldSubmit: Subscription;

  @Input() definition: DynamicFormDefinition;
  @Input() model: any;
  @Output() formSubmit: EventEmitter<DynamicFormSubmit> = new EventEmitter<DynamicFormSubmit>();

  constructor(
    private formBuilder: DynamicFormBuilder,
    @Optional() @Inject(DYNAMIC_FORM_THEME)
    public theme: string
  ) {}

  get formField(): DynamicForm { return this._formField; }
  get formGroup(): FormGroup { return this._formField.control; }

  get template(): DynamicFormTemplate { return this._formField.template; }
  get elements(): DynamicFormElement[] { return this._formField.elements; }

  get headerActions(): DynamicFormAction[] { return this._formField.headerActions; }
  get footerActions(): DynamicFormAction[] { return this._formField.footerActions; }

  ngOnInit(): void {
    this.initFormField();
  }

  ngDoCheck(): void {
    this._formField.check();
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
    this._formField.destroy();
    this._formFieldSubmit.unsubscribe();
  }

  submit(): void {
    this.formSubmit.emit({ value: this.formGroup.value, model: this.model });
  }

  validate(): void {
    this._formField.validate();
  }

  reset(): void {
    this._formField.reset();
  }

  resetDefault(): void {
    this._formField.resetDefault();
  }

  private initFormField(): void {
    this.model = this.model || {};
    this._formField = this.formBuilder.initForm(this.definition, this.model);
    this._formFieldSubmit = this._formField.submit$.subscribe({ next: () => this.submit() });
  }

  private destroyFormField(): void {
    this._formField.destroy();
    this._formFieldSubmit.unsubscribe();
  }
}
