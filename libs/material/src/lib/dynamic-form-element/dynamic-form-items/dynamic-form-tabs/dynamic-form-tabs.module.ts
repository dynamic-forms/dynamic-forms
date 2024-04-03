import { NgModule } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
  dynamicFormItemsFactory,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const matDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormTabsComponent,
  libraryName: matDynamicFormLibrary.name,
};

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withMatDynamicFormElementDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withDynamicFormElements(matDynamicFormTabsType)),
})
export class MatDynamicFormTabsModule {}
