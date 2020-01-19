import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

export const bsDynamicFormCheckboxType: DynamicFormInputType = {
  type: 'checkbox',
  component: BsDynamicFormCheckboxComponent,
  wrappers: [ 'errors' ],
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormCheckboxType)
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
