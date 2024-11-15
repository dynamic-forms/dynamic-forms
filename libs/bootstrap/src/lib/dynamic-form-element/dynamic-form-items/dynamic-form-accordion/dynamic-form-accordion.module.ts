import { DynamicFormElementType, DynamicFormsFeature, dynamicFormItemsFactory, withDynamicFormElements } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const bsDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormAccordionComponent,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormAccordion(): DynamicFormsFeature {
  return withDynamicFormElements(bsDynamicFormAccordionType);
}
