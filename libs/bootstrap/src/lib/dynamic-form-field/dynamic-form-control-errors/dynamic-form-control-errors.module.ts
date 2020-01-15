import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsType: DynamicFormFieldWrapperType = {
  library: 'bootstrap',
  type: 'errors',
  component: BsDynamicFormControlErrorsComponent
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
