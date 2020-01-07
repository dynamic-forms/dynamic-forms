import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig } from '../dynamic-form/dynamic-form-config';
import { DynamicFormsModule } from '../dynamic-forms.module';
import { DynamicFormArrayComponent } from './dynamic-form-array.component';

export const dynamicFormArrayConfig: DynamicFormConfig = {
  library: 'core',
  fieldConfig: {
    types: [
      { type: 'array', component: DynamicFormArrayComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forChild(dynamicFormArrayConfig)
  ],
  declarations: [
    DynamicFormArrayComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormArrayComponent
  ],
  entryComponents: [
    DynamicFormArrayComponent
  ]
})
export class DynamicFormArrayModule {}
