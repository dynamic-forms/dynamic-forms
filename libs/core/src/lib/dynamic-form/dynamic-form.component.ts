import { Component, Input, OnInit } from '@angular/core';
import { FormTemplate } from './dynamic-form.model';
import { FormBuilder } from './dynamic-form.builder';
import { FormField } from '../dynamic-form-field';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class FormComponent implements OnInit {
  formField: FormField;

  @Input()
  template: FormTemplate;
  @Input()
  model: any;

  constructor(private formBuilder: FormBuilder) {}

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
