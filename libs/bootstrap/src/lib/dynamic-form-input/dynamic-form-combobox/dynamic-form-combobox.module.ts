import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const bsDynamicFormComboboxConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'combobox', component: BsDynamicFormComboboxComponent, wrappers: [ 'label', 'hints', 'errors' ] }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsModule.forChild(bsDynamicFormComboboxConfig)
  ],
  declarations: [
    BsDynamicFormComboboxComponent
  ],
  entryComponents: [
    BsDynamicFormComboboxComponent
  ]
})
export class BsDynamicFormComboboxModule {}
