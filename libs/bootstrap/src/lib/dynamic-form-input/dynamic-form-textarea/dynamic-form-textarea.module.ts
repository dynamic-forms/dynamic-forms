import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const bsDynamicFormTextareaType: DynamicFormInputType = {
  type: 'textarea',
  component: BsDynamicFormTextareaComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(bsDynamicFormTextareaType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormTextareaModule {}
