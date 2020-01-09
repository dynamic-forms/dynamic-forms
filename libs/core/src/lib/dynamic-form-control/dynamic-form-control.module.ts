import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig } from '../dynamic-form-config/dynamic-form-config';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

export const dynamicFormControlConfig: DynamicFormConfig = {
  library: 'core',
  fieldConfig: {
    types: [
      { type: 'control', component: DynamicFormControlComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(dynamicFormControlConfig)
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
