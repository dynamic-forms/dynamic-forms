import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const bsDynamicFormComboboxType: DynamicFormInputType = {
  type: 'combobox',
  component: BsDynamicFormComboboxComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(bsDynamicFormComboboxType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormComboboxModule {}
