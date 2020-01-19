import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsType: DynamicFormFieldWrapperType = {
  type: 'errors',
  component: BsDynamicFormControlErrorsComponent,
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withFieldWrapper(bsDynamicFormControlErrorsType)
  ],
  declarations: [
    BsDynamicFormControlErrorsComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormControlErrorsComponent
  ],
  entryComponents: [
    BsDynamicFormControlErrorsComponent
  ]
})
export class BsDynamicFormControlErrorsModule {}
