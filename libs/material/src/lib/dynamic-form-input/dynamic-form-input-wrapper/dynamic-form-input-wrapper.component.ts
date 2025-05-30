import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mat-dynamic-form-input-wrapper',
  imports: [NgClass],
  templateUrl: './dynamic-form-input-wrapper.component.html',
})
export class MatDynamicFormInputWrapperComponent {
  @Input() label: string;
  @Input() inputId: string;
  @Input() required: boolean;
  @Input({ required: true }) disabled: boolean;
  @Input({ required: true }) invalid: boolean;
  @Input({ required: true }) hasValidation: boolean;
  @Input() errorMessage: boolean;
}
