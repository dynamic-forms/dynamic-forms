import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormTextComponent } from './dynamic-form-text.component';

export const dynamicFormTextType: DynamicFormElementType = {
  type: 'text',
  component: DynamicFormTextComponent,
  libraryName: dynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withElement(dynamicFormTextType),
  ],
  declarations: [
    DynamicFormTextComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormTextComponent,
  ],
})
export class DynamicFormTextModule {}
