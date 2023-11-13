import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormElementType, dynamicFormItemsFactory } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const matDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormTabsComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormConfigModule.withElement(matDynamicFormTabsType)],
  exports: [DynamicFormConfigModule],
})
export class MatDynamicFormTabsModule {}
