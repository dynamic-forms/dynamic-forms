import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormTemplate } from './form.model';
import { FormBuilder } from './form.builder';
import { FormGroupField } from '../form-group/form-group.model';

@Component({
  selector: 'dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() template: FormTemplate;
  @Input() model: any;

  formField: FormGroupField;

  constructor(private formBuilder: FormBuilder) {}

  get formGroup(): FormGroup {
    return this.formField.control;
  }

  ngOnInit(): void {
    this.model = this.model || {};
    this.formField = this.formBuilder.createForm(this.template, this.model);
    console.log(this.formField);
  }

  modelChanged(model: any) {
    console.log('form changed:', model);
  }

  submit() {
    console.log('form.value', this.formField.control.value);
  }
}
