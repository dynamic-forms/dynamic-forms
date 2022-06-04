import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormSelectComponent } from './dynamic-form-select.component';

export const bsDynamicFormSelectType: DynamicFormInputType = {
  type: 'select',
  component: BsDynamicFormSelectComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormSelectType),
  ],
  declarations: [
    BsDynamicFormSelectComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormSelectComponent,
  ],
})
export class BsDynamicFormSelectModule {}
