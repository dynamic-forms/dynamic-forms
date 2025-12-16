import { Directive, input, viewChild } from '@angular/core';
import { DynamicFormComponent } from '@dynamic-forms/core';
import { FormData } from './form-data';
import { FormSubmitBase } from './form-submit-base';

@Directive({})
export abstract class FormBase extends FormSubmitBase {
  readonly form = viewChild(DynamicFormComponent);
  readonly data = input<FormData>(undefined);

  get value(): any {
    return this.form()?.value;
  }
}
