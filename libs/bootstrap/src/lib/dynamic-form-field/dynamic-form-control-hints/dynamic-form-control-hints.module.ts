import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';

export const bsDynamicFormControlHintsConfig: DynamicFormConfig = {
  library: 'bootstrap',
  wrapperConfig: {
    types: [
      { type: 'hints', component: BsDynamicFormControlHintsComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.forChild(bsDynamicFormControlHintsConfig)
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
