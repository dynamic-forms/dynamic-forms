import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

export const dynamicFormArrayType: DynamicFormFieldType = {
  type: 'array',
  component: DynamicFormArrayComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withField(dynamicFormArrayType)
  ],
  declarations: [
    DynamicFormArrayComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormArrayComponent
  ],
  entryComponents: [
    DynamicFormArrayComponent
  ]
})
export class DynamicFormArrayModule {}
