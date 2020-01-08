import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig } from '../../dynamic-form-config/dynamic-form-config';
import { DynamicFormsModule } from '../../dynamic-forms.module';
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
    DynamicFormsModule.forChild(dynamicFormContainerConfig)
  ],
  declarations: [
    DynamicFormContainerComponent
  ],
  exports: [
    DynamicFormsModule,
    DynamicFormContainerComponent
  ],
  entryComponents: [
    DynamicFormContainerComponent
  ]
})
export class DynamicFormContainerModule {}
