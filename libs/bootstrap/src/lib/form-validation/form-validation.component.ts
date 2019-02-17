import { Component } from '@angular/core';
import { FormConfigService, FormValidationComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bootstrap-form-validation',
  templateUrl: './form-validation.component.html'
})
export class BootstrapFormValidationComponent extends FormValidationComponent {
  constructor(formConfigService: FormConfigService) {
    super(formConfigService);
  }
}
