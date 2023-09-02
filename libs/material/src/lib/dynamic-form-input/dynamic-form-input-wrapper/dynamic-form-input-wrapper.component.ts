import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-input-wrapper',
  templateUrl: './dynamic-form-input-wrapper.component.html',
  imports: [CommonModule],
})
export class MatDynamicFormInputWrapperComponent {
  @Input() label: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() invalid: boolean;
  @Input() errorMessage: boolean;
}
