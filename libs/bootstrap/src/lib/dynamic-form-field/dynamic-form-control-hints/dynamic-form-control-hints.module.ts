import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFieldWrapperType } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';

export const bsDynamicFormControlHintsType: DynamicFormFieldWrapperType = {
  type: 'hints',
  component: BsDynamicFormControlHintsComponent
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.withFieldWrapper(bsDynamicFormControlHintsType)
  ],
  declarations: [
    BsDynamicFormControlHintsComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormControlHintsComponent
  ],
  entryComponents: [
    BsDynamicFormControlHintsComponent
  ]
})
export class BsDynamicFormControlHintsModule {}
