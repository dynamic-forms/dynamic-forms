import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormTemplate } from './form.model';
import { FormBuilder } from './form.builder';
import { FormGroupField } from '../form-group';

@Component({
  selector: 'dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  formField: FormGroupField;

  @Input() template: FormTemplate;
  @Input() model: any;

  constructor(private formBuilder: FormBuilder) {}

  get formGroup(): FormGroup {
    return this.formField.control;
  }

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
