import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormElementType, dynamicFormItemsFactory } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const bsDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormTabsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withElement(bsDynamicFormTabsType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormTabsModule {}
