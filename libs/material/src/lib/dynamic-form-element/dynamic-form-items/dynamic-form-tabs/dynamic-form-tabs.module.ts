import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { dynamicFormItemsFactory, DynamicFormConfigModule,
  DynamicFormElementModule, DynamicFormElementType, DynamicFormModalModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const matDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormTabsComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    DynamicFormElementModule,
    DynamicFormModalModule,
    DynamicFormConfigModule.withElement(matDynamicFormTabsType)
  ],
  declarations: [
    MatDynamicFormTabsComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormTabsComponent
  ]
})
export class MatDynamicFormTabsModule {}
