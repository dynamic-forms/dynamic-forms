import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const bsDynamicFormRadioConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'radio', component: BsDynamicFormRadioComponent, wrappers: [ 'label', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(bsDynamicFormRadioConfig)
  ],
  declarations: [
    BsDynamicFormRadioComponent
  ],
  entryComponents: [
    BsDynamicFormRadioComponent
  ]
})
export class BsDynamicFormRadioModule {}
