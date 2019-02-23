import { Component } from '@angular/core';
import { FormControlComponent } from '@dynamic-forms/core';
import { FormComponentFactory } from '@dynamic-forms/core';

@Component({
  selector: 'bootstrap-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class BootstrapFormControlComponent extends FormControlComponent {
  constructor(componentFactory: FormComponentFactory) {
    super(componentFactory);
  }
}
