import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const bsDynamicFormTextareaType: DynamicFormInputType = {
  type: 'textarea',
  component: BsDynamicFormTextareaComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextareaType),
    BsDynamicFormInputWrapperModule,
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
