import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const bsDynamicFormDatepickerConfig: DynamicFormConfig = {
  library: 'bootstrap',
  inputConfig: {
    types: [
      { type: 'datepicker', component: BsDynamicFormDatepickerComponent, wrappers: [ 'label', 'hints', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(bsDynamicFormDatepickerConfig)
  ],
  declarations: [
    BsDynamicFormDatepickerComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormDatepickerComponent
  ],
  entryComponents: [
    BsDynamicFormDatepickerComponent
  ]
})
export class BsDynamicFormDatepickerModule {}
