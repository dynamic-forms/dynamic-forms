import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormElementType, dynamicFormItemsFactory } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const bsDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormAccordionComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormConfigModule.withElement(bsDynamicFormAccordionType)],
  exports: [DynamicFormConfigModule],
})
export class BsDynamicFormAccordionModule {}
