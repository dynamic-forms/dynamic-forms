import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicForm } from './dynamic-form.model';
import { DynamicFormBuilder } from './dynamic-form.builder';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;

  @Input()
  template: DynamicForm;
  @Input()
  model: any;

  constructor(private formBuilder: DynamicFormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.createForm(this.template, this.model);
  }

  modelChanged(model: any) {
    console.log('form changed:', model);
  }

  submit() {
    console.log('form.value', this.form.value);
  }
}
