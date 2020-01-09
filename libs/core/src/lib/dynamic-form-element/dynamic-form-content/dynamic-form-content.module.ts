import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig } from '../../dynamic-form-config/dynamic-form-config';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

export const dynamicFormContentConfig: DynamicFormConfig = {
  library: 'core',
  elementConfig: {
    types: [
      { type: 'content', component: DynamicFormContentComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.forChild(dynamicFormContentConfig)
  ],
  declarations: [
    DynamicFormContentComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormContentComponent
  ],
  entryComponents: [
    DynamicFormContentComponent
  ]
})
export class DynamicFormContentModule {}
