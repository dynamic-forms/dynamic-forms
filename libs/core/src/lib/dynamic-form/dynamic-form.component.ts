import { Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormSubmit } from './dynamic-form-submit';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy, DoCheck {
  private _formField: DynamicForm;

  @Input() definition: DynamicFormDefinition;
  @Input() model: any;
  @Output() formSubmit = new EventEmitter<DynamicFormSubmit>();

  constructor(private formBuilder: DynamicFormBuilder) {}

  get formField(): DynamicForm { return this._formField; }
  get formGroup(): FormGroup { return this._formField.control; }

  get template(): DynamicFormTemplate { return this._formField.template; }
  get elements(): DynamicFormElement[] { return this._formField.elements; }
  get actions(): DynamicFormAction[] { return this._formField.actions; }

  ngOnInit(): void {
    this.model = this.model || {};
    this._formField = this.formBuilder.initForm(this.definition, this.model);
  }

  ngDoCheck(): void {
    this._formField.check();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modelChanged = changes.model && !changes.model.firstChange;
    const definitionChanged = changes.definition && !changes.definition.firstChange;
    if (modelChanged || definitionChanged) {
      this.model = this.model || {};
      this._formField = this.formBuilder.initForm(this.definition, this.model);
    }
  }

  ngOnDestroy(): void {
    this._formField.destroy();
  }

  ngOnSubmit(): void {
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
}
