import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormSelectComponent } from './dynamic-form-select.component';

export const bsDynamicFormSelectType: DynamicFormInputType = {
  type: 'select',
  component: BsDynamicFormSelectComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(bsDynamicFormSelectType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormSelectModule {}
