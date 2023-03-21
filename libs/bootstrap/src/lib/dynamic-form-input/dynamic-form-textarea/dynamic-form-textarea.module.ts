import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAddOnsModule } from '../dynamic-form-add-ons/dynamic-form-add-ons.module';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const bsDynamicFormTextareaType: DynamicFormInputType = {
  type: 'textarea',
  component: BsDynamicFormTextareaComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextareaType),
    BsDynamicFormAddOnsModule,
  ],
  declarations: [
    BsDynamicFormTextareaComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormTextareaComponent,
  ],
})
export class BsDynamicFormTextareaModule {}
