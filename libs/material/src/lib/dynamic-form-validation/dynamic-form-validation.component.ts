import { Component } from '@angular/core';
import { DynamicFormConfigService, DynamicFormValidationComponent } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html',
  styleUrls: ['./dynamic-form-validation.component.scss']
})
export class DynamicFormValidationMaterialComponent extends DynamicFormValidationComponent {
  constructor(configService: DynamicFormConfigService) {
    super(configService);
  }
}
