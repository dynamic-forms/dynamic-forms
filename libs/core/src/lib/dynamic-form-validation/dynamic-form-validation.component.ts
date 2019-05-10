import { Component, Input } from '@angular/core';
import { DynamicFormValidationErrors } from './dynamic-form-validation-errors';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html',
  styleUrls: ['./dynamic-form-validation.component.scss']
})
export class DynamicFormValidationComponent {
  @Input() errors: DynamicFormValidationErrors;

  constructor(protected validationService: DynamicFormValidationService) {}

  get errorMessage() {
    return this.validationService.getErrorMessage(this.errors);
  }
}
