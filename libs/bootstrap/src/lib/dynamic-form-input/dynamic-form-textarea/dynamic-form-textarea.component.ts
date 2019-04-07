import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DynamicFormTextarea } from './dynamic-form-textarea';

@Component({
  selector: 'bs-dynamic-form-textarea',
  templateUrl: './dynamic-form-textarea.component.html'
})
export class DynamicFormTextareaComponent extends DynamicFormInputComponent<DynamicFormTextarea> {}
