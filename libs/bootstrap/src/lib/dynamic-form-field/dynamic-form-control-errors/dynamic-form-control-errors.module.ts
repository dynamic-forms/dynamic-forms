import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsConfig: DynamicFormConfig = {
  library: 'bootstrap',
  wrapperConfig: {
    types: [
      { type: 'errors', component: BsDynamicFormControlErrorsComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.forChild(bsDynamicFormControlErrorsConfig)
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
