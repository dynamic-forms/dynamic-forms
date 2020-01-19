import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const bsDynamicFormComboboxType: DynamicFormInputType = {
  type: 'combobox',
  component: BsDynamicFormComboboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name
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
