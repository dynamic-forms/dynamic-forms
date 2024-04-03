import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
  dynamicFormItemsFactory,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const bsDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormAccordionComponent,
  libraryName: bsDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withBsDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormElements(bsDynamicFormAccordionType)),
})
export class BsDynamicFormAccordionModule {}
