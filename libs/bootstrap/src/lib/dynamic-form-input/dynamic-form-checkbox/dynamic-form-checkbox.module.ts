import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

export const bsDynamicFormCheckboxType: DynamicFormInputType = {
  type: 'checkbox',
  component: BsDynamicFormCheckboxComponent,
  wrappers: [ 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(bsDynamicFormCheckboxType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormCheckboxModule {}
