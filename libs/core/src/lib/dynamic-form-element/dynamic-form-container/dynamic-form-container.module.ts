import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementType } from '../dynamic-form-element-config';
import { DynamicFormElementModule } from '../dynamic-form-element.module';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

export const dynamicFormContainerType: DynamicFormElementType = {
  library: 'core',
  type: 'container',
  component: DynamicFormContainerComponent
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withElement(dynamicFormContainerType)
  ],
  declarations: [
    DynamicFormContainerComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormContainerComponent
  ],
  entryComponents: [
    DynamicFormContainerComponent
  ]
})
export class DynamicFormContainerModule {}
