import { Component, DoCheck, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DynamicForm } from './dynamic-form';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnDestroy, DoCheck {
  private _formField: DynamicForm;

  @Input() template: DynamicFormTemplate;
  @Input() model: any;

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
      this._formField = this.formBuilder.createForm(this.template, this.model);
    }
  }

  ngOnDestroy() {
    if (this._formField) {
      this._formField.destroy();
    }
  }

  submit() {
    console.log('form.value', this.formField.control.value);
  }
}
