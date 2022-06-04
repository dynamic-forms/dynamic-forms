import { Component, Input } from '@angular/core';

@Component({
  selector: 'mat-dynamic-form-input-wrapper',
  templateUrl: './dynamic-form-input-wrapper.component.html',
})
export class MatDynamicFormInputWrapperComponent {
  @Input() label: string;
  @Input() required: boolean;
  @Input() invalid: boolean;
  @Input() errorMessage: boolean;
}
