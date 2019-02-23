import { Component } from '@angular/core';
import { DynamicFormFieldWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-label-wrapper',
  templateUrl: './dynamic-label-wrapper.component.html',
  styleUrls: ['./dynamic-label-wrapper.component.scss']
})
export class BootstrapDynamicLabelWrapperComponent extends DynamicFormFieldWrapper {}
