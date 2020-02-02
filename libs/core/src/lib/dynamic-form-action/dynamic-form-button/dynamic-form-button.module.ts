import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '../../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormActionType } from '../dynamic-form-action-type';
import { DynamicFormButtonComponent } from './dynamic-form-button.component';

export const dynamicFormButtonType: DynamicFormActionType = {
  type: 'button',
  component: DynamicFormButtonComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withAction(dynamicFormButtonType)
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
