import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormElementType, dynamicFormItemsFactory } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const matDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormAccordionComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormConfigModule.withElement(matDynamicFormAccordionType)],
  exports: [DynamicFormConfigModule],
})
export class MatDynamicFormAccordionModule {}
