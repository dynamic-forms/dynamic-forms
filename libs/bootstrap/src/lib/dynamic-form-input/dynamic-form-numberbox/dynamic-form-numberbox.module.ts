
import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const bsDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: BsDynamicFormNumberboxComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(bsDynamicFormNumberboxType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormNumberboxModule {}
