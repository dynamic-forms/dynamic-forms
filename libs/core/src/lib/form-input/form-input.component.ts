import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlInput } from '../form-control';

@Component({
  selector: 'dynamic-form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent {
  @Input() id: string;
  @Input() input: FormControlInput;
  @Input() control: FormControl;
}
