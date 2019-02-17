import { Component } from '@angular/core';
import { FormControlComponent } from '@dynamic-forms/core';
import { FormControlFactory } from '@dynamic-forms/core';

@Component({
  selector: 'bootstrap-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class BootstrapFormControlComponent extends FormControlComponent {
  constructor(componentFactory: FormControlFactory) {
    super(componentFactory);
  }
}
