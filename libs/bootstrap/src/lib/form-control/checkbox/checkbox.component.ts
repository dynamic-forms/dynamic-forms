import { Component } from '@angular/core';
import { FormControlInputComponent } from '@dynamic-forms/core';
import { CheckboxInput } from './checkbox-input';

@Component({
  selector: 'bootstrap-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends FormControlInputComponent<CheckboxInput> {}
