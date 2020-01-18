import { Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormSubmit } from './dynamic-form-submit';
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

  get formField() { return this._formField; }
  get formGroup() { return this._formField.control; }

  get template() { return this._formField.template; }
  get elements() { return this._formField.elements; }

  ngOnInit() {
    this.model = this.model || {};
    this._formField = this.formBuilder.initForm(this.definition, this.model);
  }

  ngDoCheck() {
    this._formField.check();
  }

  ngOnChanges(changes: SimpleChanges) {
    const modelChanged = changes.model && !changes.model.firstChange;
    const definitionChanged = changes.definition && !changes.definition.firstChange;
    if (modelChanged || definitionChanged) {
      this.model = this.model || {};
      this._formField = this.formBuilder.initForm(this.definition, this.model);
    }
  }

  ngOnDestroy() {
    this._formField.destroy();
  }

  ngOnSubmit() {
    this.formSubmit.emit({ value: this.formGroup.value, model: this.model });
  }

  validate() {
    this._formField.validate();
  }

  reset() {
    this._formField.reset();
  }

  resetDefault() {
    this._formField.resetDefault();
  }
}
