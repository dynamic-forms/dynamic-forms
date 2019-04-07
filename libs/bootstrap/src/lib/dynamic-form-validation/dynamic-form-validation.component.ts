import { Component } from '@angular/core';
import { DynamicFormConfigService, DynamicFormValidationComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html',
  styleUrls: ['./dynamic-form-validation.component.scss']
})
export class DynamicFormValidationBootstrapComponent extends DynamicFormValidationComponent {
  constructor(configService: DynamicFormConfigService) {
    super(configService);
  }
}
