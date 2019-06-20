import { Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormSubmit } from './dynamic-form-submit';
import { DynamicFormBuilder } from './dynamic-form.builder';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnDestroy, DoCheck {
  private _formField: DynamicForm;

  @Input() definition: DynamicFormDefinition;
  @Input() model: any;
  @Output() formSubmit = new EventEmitter<DynamicFormSubmit>();

  constructor(private formBuilder: DynamicFormBuilder) {}

  get formField() { return this._formField; }
  get formGroup() { return this._formField.control; }

  ngDoCheck() {
    if (this._formField) {
      this._formField.check();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.template || changes.model) {
      this.model = this.model || {};
      this._formField = this.formBuilder.createForm(this.definition, this.model);
    }
  }

  ngOnDestroy() {
    if (this._formField) {
      this._formField.destroy();
    }
  }

  ngOnSubmit() {
    this.formSubmit.emit({ value: this.formGroup.value, model: this.model });
  }
}
