import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormElementModule, DynamicFormFileModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
import { BsDynamicFormFileComponent } from './dynamic-form-file.component';

export const bsDynamicFormFileType: DynamicFormInputType = {
  type: 'file',
  component: BsDynamicFormFileComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormFileModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withInput(bsDynamicFormFileType),
    BsDynamicFormInputWrapperModule,
  ],
  declarations: [
    BsDynamicFormFileComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormFileComponent,
  ],
})
export class BsDynamicFormFileModule {}
