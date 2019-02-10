import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlInput } from './form-control-input';

@Component({
  selector: 'core-form-control-input',
  templateUrl: './form-control-input.component.html'
})
export class FormControlInputComponent<FormInput = FormControlInput> {
  @Input() id: string;
  @Input() input: FormInput;
  @Input() control: FormControl;
}
