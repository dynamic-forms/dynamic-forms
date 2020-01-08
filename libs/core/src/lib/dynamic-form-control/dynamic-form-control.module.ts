import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig } from '../dynamic-form-config/dynamic-form-config';
import { DynamicFormsModule } from '../dynamic-forms.module';
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
    DynamicFormsModule.forChild(dynamicFormControlConfig)
  ],
  declarations: [
    DynamicFormControlComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormControlComponent
  ],
  entryComponents: [
    DynamicFormControlComponent
  ]
})
export class DynamicFormControlModule {}
