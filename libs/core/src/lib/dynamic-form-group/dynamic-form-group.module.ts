import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig } from '../dynamic-form-config/dynamic-form-config';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

export const dynamicFormGroupConfig: DynamicFormConfig = {
  library: 'core',
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.forChild(dynamicFormGroupConfig)
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
