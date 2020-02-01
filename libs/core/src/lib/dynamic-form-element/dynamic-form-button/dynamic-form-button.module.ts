import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormButtonComponent } from './dynamic-form-button.component';

export const dynamicFormButtonType: DynamicFormElementType = {
  type: 'button',
  component: DynamicFormButtonComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withElement(dynamicFormButtonType)
  ],
  declarations: [
    DynamicFormButtonComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormButtonComponent
  ],
  entryComponents: [
    DynamicFormButtonComponent
  ]
})
export class DynamicFormButtonModule {}
