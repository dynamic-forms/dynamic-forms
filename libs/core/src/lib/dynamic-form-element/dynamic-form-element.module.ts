import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormContainerType } from './dynamic-form-container/dynamic-form-container-type';
import { dynamicFormContentType } from './dynamic-form-content/dynamic-form-content-type';
import { dynamicFormTextType } from './dynamic-form-text/dynamic-form-text-type';

export const dynamicFormElementTypes = [
  dynamicFormContainerType,
  dynamicFormContentType,
  dynamicFormTextType,
];

@NgModule({
  imports: [
    DynamicFormConfigModule.withElements(dynamicFormElementTypes),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class DynamicFormElementModule {}
