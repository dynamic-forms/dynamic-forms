import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
  dynamicFormItemsFactory,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const bsDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormTabsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withBsDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormElements(bsDynamicFormTabsType)),
})
export class BsDynamicFormTabsModule {}
