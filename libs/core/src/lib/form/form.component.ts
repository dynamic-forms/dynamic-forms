import { Component, DoCheck, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroupField } from '../form-group/models/form-group-field';
import { FormBuilder } from './form.builder';
import { FormTemplate } from './models/form-template';

@Component({
  selector: 'dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnChanges, OnDestroy, DoCheck {
  private _formField: FormGroupField;

  @Input() template: FormTemplate;
  @Input() model: any;

  constructor(private formBuilder: FormBuilder) {}

  get formField() { return this._formField; }
  get formGroup() { return this._formField.control; }

  ngDoCheck() {
    this._formField.check();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.template || changes.model) {
      this.model = this.model || {};
      this._formField = this.formBuilder.createForm(this.template, this.model);
    }
  }

  ngOnDestroy() {
    this._formField.destroy();
  }

  submit() {
    console.log('form.value', this.formField.control.value);
  }
}
