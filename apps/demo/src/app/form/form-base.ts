import { Directive, DoCheck, input, output, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFormComponent, DynamicFormDefinition } from '@dynamic-forms/core';
import { FormData } from './form-data';
import { FormSubmitBase } from './form-submit-base';

@Directive({})
export abstract class FormBase extends FormSubmitBase implements DoCheck {
  readonly form = viewChild(DynamicFormComponent);

  readonly data = input<FormData>(undefined);

  readonly valueChange = output<any>();

  formDefinition: DynamicFormDefinition;
  formModel: any;
  formValue: any;

  constructor(protected override dialog: MatDialog) {
    super(dialog);
  }

  ngDoCheck(): void {
    const form = this.form();
    if (this.formDefinition !== form?.form.definition) {
      this.formDefinition = form?.form.definition;
    }
    if (this.formModel !== form?.form.model) {
      this.formModel = form?.form.model;
    }
    if (this.formValue !== form?.form.value) {
      this.formValue = form?.form.value;
    }
  }
}
