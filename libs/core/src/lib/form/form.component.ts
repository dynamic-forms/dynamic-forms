import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormTemplate } from './form.model';
import { FormBuilder } from './form.builder';
import { FormGroupField } from '../form-group/form-group.model';

@Component({
  selector: 'dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnChanges, OnDestroy {
  @Input() template: FormTemplate;
  @Input() model: any;
  formField: FormGroupField;

  constructor(private formBuilder: FormBuilder) {}

  get formGroup() {
    return this.formField.control;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.template || changes.model) {
      this.model = this.model || {};
      this.formField = this.formBuilder.createForm(this.template, this.model);
    }
  }

  ngOnDestroy() {
    this.formField.destroy();
  }

  submit() {
    console.log('form.value', this.formField.control.value);
  }
}
