import { Component, Input, TemplateRef} from '@angular/core';
import { DynamicFormControlAddOn } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-add-ons',
  templateUrl: './dynamic-form-add-ons.component.html',
})
export class BsDynamicFormAddOnsComponent {
  @Input()
  inputTemplate: TemplateRef<any>;

  @Input()
  prefixAddOn: DynamicFormControlAddOn;

  @Input()
  suffixAddOn: DynamicFormControlAddOn;
}
