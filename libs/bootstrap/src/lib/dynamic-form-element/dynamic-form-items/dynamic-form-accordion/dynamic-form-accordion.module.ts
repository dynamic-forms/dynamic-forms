import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { dynamicFormItemsFactory, DynamicFormConfigModule,
  DynamicFormElementModule, DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const bsDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormAccordionComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(bsDynamicFormAccordionType)
  ],
  declarations: [
    BsDynamicFormAccordionComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormAccordionComponent
  ]
})
export class BsDynamicFormAccordionModule {}
