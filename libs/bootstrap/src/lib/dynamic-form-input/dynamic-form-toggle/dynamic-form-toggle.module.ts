import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormToggleComponent } from './dynamic-form-toggle.component';

export const bsDynamicFormToggleType: DynamicFormInputType = {
  type: 'toggle',
  component: BsDynamicFormToggleComponent,
  wrappers: [ 'label', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormToggleType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormToggleModule {}
