import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType, DynamicFormTextboxModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const bsDynamicFormTextboxType: DynamicFormInputType = {
  type: 'textbox',
  component: BsDynamicFormTextboxComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormTextboxModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextboxType),
    BsDynamicFormInputWrapperModule,
  ],
  declarations: [
    BsDynamicFormTextboxComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormTextboxComponent,
  ],
})
export class BsDynamicFormTextboxModule {}
