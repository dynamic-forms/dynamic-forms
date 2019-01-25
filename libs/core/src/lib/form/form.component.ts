import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormTemplate } from './form.model';
import { FormBuilder } from './form.builder';
import { FormGroupField } from '../form-group/form-group.model';

@Component({
  selector: 'dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() template: FormTemplate;
  @Input() model: any;
  formField: FormGroupField;

  constructor(private formBuilder: FormBuilder) {}

  get formGroup(): FormGroup {
    return this.formField.control;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.template || changes.model) {
      this.model = this.model || {};
      this.formField = this.formBuilder.createForm(this.template, this.model);
    }
  }

  ngOnDestroy(): void {
    this.formField.destroy();
  }

  submit() {
    console.log('form.value', this.formField.control.value);
  }
}
