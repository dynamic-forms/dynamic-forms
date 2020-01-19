import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const bsDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: BsDynamicFormNumberboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormNumberboxType)
  ],
  declarations: [
    BsDynamicFormNumberboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormNumberboxComponent
  ],
  entryComponents: [
    BsDynamicFormNumberboxComponent
  ]
})
export class BsDynamicFormNumberboxModule {}
