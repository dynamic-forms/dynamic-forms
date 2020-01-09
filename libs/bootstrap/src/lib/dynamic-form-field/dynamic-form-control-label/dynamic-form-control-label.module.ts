import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormControlLabelConfig: DynamicFormConfig = {
  library: 'bootstrap',
  wrapperConfig: {
    types: [
      { type: 'label', component: BsDynamicFormControlLabelComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    DynamicFormConfigModule.forChild(bsDynamicFormControlLabelConfig)
  ],
  declarations: [
    BsDynamicFormControlLabelComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormControlLabelComponent
  ],
  entryComponents: [
    BsDynamicFormControlLabelComponent
  ]
})
export class BsDynamicFormControlLabelModule {}
