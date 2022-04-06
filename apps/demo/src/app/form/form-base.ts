import { Directive, DoCheck, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent, DynamicFormDefinition } from '@dynamic-forms/core';
import { FormData } from './form-data';
import { FormSubmitBase } from './form-submit-base';

@Directive()
export abstract class FormBase extends FormSubmitBase implements DoCheck {
  @ViewChild(DynamicFormComponent)
  form: DynamicFormComponent;

  @Input() data: FormData;

  formDefinition: DynamicFormDefinition;
  formModel: any;
  formValue: any;

  constructor(protected dialog: MatDialog) {
    super(dialog);
  }

  ngDoCheck(): void {
    if (this.formDefinition !== this.form?.form.definition) {
      this.formDefinition = this.form?.form.definition;
    }
    if (this.formModel !== this.form?.form.model) {
      this.formModel = this.form?.form.model;
    }
    if (this.formValue !== this.form?.form.value) {
      this.formValue = this.form?.form.value;
    }
  }
}
