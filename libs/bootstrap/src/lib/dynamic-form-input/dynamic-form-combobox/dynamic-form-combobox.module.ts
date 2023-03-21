import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAddOnsModule } from '../dynamic-form-add-ons/dynamic-form-add-ons.module';

import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const bsDynamicFormComboboxType: DynamicFormInputType = {
  type: 'combobox',
  component: BsDynamicFormComboboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormComboboxType),
    BsDynamicFormAddOnsModule,
  ],
  declarations: [
    BsDynamicFormComboboxComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormComboboxComponent,
  ],
})
export class BsDynamicFormComboboxModule {}
