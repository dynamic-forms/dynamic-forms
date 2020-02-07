import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormGroupFactory } from './dynamic-form-group-factory';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

export const dynamicFormGroupType: DynamicFormFieldType = {
  type: 'group',
  factory: dynamicFormGroupFactory,
  component: DynamicFormGroupComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withField(dynamicFormGroupType)
  ],
  declarations: [
    DynamicFormGroupComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormGroupComponent
  ],
  entryComponents: [
    DynamicFormGroupComponent
  ]
})
export class DynamicFormGroupModule {}
