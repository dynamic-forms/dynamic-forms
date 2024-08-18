import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { DynamicFormControlAddOn, DynamicFormElementComponent } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-input-wrapper',
  templateUrl: './dynamic-form-input-wrapper.component.html',
  imports: [NgTemplateOutlet, DynamicFormElementComponent],
})
export class BsDynamicFormInputWrapperComponent {
  @Input()
  inputTemplate: TemplateRef<any>;

  @Input()
  inputId: string;

  @Input()
  label: string;

  @Input()
  labelFloating: boolean;

  @Input()
  requiredMarker: boolean;

  @Input()
  inputAddOn: DynamicFormControlAddOn;

  @Input()
  prefixAddOn: DynamicFormControlAddOn;

  @Input()
  suffixAddOn: DynamicFormControlAddOn;
}
