import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig } from '../../dynamic-form/dynamic-form-config';
import { DynamicFormsModule } from '../../dynamic-forms.module';
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
    DynamicFormsModule.forChild(dynamicFormContentConfig)
  ],
  declarations: [
    DynamicFormContentComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormContentComponent
  ],
  entryComponents: [
    DynamicFormContentComponent
  ]
})
export class DynamicFormContentModule {}
