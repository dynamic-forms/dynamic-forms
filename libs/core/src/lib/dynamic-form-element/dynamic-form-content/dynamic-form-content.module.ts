import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

export const dynamicFormContentType: DynamicFormElementType = {
  type: 'content',
  component: DynamicFormContentComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withElement(dynamicFormContentType)
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
