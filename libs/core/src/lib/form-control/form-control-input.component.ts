import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlInput } from './form-control-input';

@Component({
  selector: 'dynamic-form-control-input',
  templateUrl: './form-control-input.component.html'
})
export class FormControlInputComponent {
  @Input() id: string;
  @Input() input: FormControlInput;
  @Input() control: FormControl;
}
