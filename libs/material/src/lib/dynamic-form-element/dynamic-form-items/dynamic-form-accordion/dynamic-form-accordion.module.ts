import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { dynamicFormItemsFactory, DynamicFormConfigModule,
  DynamicFormElementModule, DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const matDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormAccordionComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    DynamicFormElementModule,
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(matDynamicFormAccordionType)
  ],
  declarations: [
    MatDynamicFormAccordionComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormAccordionComponent
  ]
})
export class MatDynamicFormAccordionModule {}
