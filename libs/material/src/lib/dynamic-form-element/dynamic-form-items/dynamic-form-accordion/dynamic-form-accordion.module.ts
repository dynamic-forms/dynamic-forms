import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
  dynamicFormItemsFactory,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormAccordionComponent } from './dynamic-form-accordion.component';

export const matDynamicFormAccordionType: DynamicFormElementType = {
  type: 'accordion',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormAccordionComponent,
  libraryName: matDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withMatDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormElements(matDynamicFormAccordionType)),
})
export class MatDynamicFormAccordionModule {}
