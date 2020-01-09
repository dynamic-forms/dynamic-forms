import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig } from '../../dynamic-form-config/dynamic-form-config';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element.module';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

export const dynamicFormContainerConfig: DynamicFormConfig = {
  library: 'core',
  elementConfig: {
    types: [
      { type: 'container', component: DynamicFormContainerComponent  }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.forChild(dynamicFormContainerConfig)
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
