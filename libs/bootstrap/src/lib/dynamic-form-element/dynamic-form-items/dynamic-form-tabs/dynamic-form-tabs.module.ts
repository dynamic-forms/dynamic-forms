import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { dynamicFormItemsFactory, DynamicFormConfigModule,
  DynamicFormElementModule, DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const bsDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormTabsComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(bsDynamicFormTabsType)
  ],
  declarations: [
    BsDynamicFormTabsComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormTabsComponent
  ]
})
export class BsDynamicFormTabsModule {}
