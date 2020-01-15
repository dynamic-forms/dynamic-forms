import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const bsDynamicFormComboboxType: DynamicFormInputType = {
  library: 'bootstrap',
  type: 'combobox',
  component: BsDynamicFormComboboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormComboboxType)
  ],
  declarations: [
    BsDynamicFormComboboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormComboboxComponent
  ],
  entryComponents: [
    BsDynamicFormComboboxComponent
  ]
})
export class BsDynamicFormComboboxModule {}
