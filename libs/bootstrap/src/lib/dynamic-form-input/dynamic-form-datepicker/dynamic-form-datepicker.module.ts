import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const bsDynamicFormDatepickerConfig: DynamicFormConfig = {
  library: 'material',
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
    DynamicFormsModule.forChild(bsDynamicFormDatepickerConfig)
  ],
  declarations: [
    BsDynamicFormDatepickerComponent
  ],
  entryComponents: [
    BsDynamicFormDatepickerComponent
  ]
})
export class BsDynamicFormDatepickerModule {}
