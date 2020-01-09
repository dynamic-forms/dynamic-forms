import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { BsDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

export const bsDynamicFormCheckboxConfig: DynamicFormConfig = {
  library: 'bootstrap',
  inputConfig: {
    types: [
      { type: 'checkbox', component: BsDynamicFormCheckboxComponent, wrappers: [ 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.forChild(bsDynamicFormCheckboxConfig)
  ],
  declarations: [
    BsDynamicFormCheckboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormCheckboxComponent
  ],
  entryComponents: [
    BsDynamicFormCheckboxComponent
  ]
})
export class BsDynamicFormCheckboxModule {}
