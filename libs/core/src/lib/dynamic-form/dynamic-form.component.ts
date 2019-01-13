import { Component, Input, OnInit } from '@angular/core';
import { DynamicForm } from './dynamic-form.model';
import { DynamicFormBuilder } from './dynamic-form.builder';
import { DynamicFormField } from '../dynamic-form-item';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  formField: DynamicFormField;

  @Input()
  template: DynamicForm;
  @Input()
  model: any;

  constructor(private formBuilder: DynamicFormBuilder) {}

  ngOnInit(): void {
    this.formField = this.formBuilder.createFormField(this.template, this.model);
  }

  modelChanged(model: any) {
    console.log('form changed:', model);
  }

  submit() {
    console.log('form.value', this.formField.control.value);
  }
}
