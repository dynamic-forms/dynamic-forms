import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { DynamicFormControlAddOn, DynamicFormElementComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-input-wrapper',
  imports: [NgTemplateOutlet, DynamicFormElementComponent],
  templateUrl: './dynamic-form-input-wrapper.component.html',
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
