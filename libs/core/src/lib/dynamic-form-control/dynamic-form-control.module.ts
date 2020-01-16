import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

export const dynamicFormControlType: DynamicFormFieldType = {
  library: 'core',
  type: 'control',
  component: DynamicFormControlComponent
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withField(dynamicFormControlType)
  ],
  declarations: [
    DynamicFormControlComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormControlComponent
  ],
  entryComponents: [
    DynamicFormControlComponent
  ]
})
export class DynamicFormControlModule {}
