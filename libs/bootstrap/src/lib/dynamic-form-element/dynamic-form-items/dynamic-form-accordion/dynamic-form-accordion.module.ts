import { NgModule } from '@angular/core';
import { DynamicFormElementType, dynamicFormItemsFactory, importDynamicFormsProviders, withDynamicFormElements } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const bsDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormAccordionComponent,
  libraryName: bsDynamicFormLibrary.name,
};

/**
 * @deprecated Use {@link withBsDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({ providers: importDynamicFormsProviders(withDynamicFormElements(bsDynamicFormAccordionType)) })
export class BsDynamicFormAccordionModule {}
