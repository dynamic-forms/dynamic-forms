import { DynamicFormElementType, DynamicFormsFeature, dynamicFormItemsFactory, withDynamicFormElements } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const matDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormAccordionComponent,
  libraryName: matDynamicFormLibrary.name,
};

export function withMatDynamicFormAccordion(): DynamicFormsFeature {
  return withDynamicFormElements(matDynamicFormAccordionType);
}
