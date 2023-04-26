import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType, DynamicFormTextboxModule } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const bsDynamicFormTextboxType: DynamicFormInputType = {
  type: 'textbox',
  component: BsDynamicFormTextboxComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormTextboxModule,
    DynamicFormConfigModule.withInput(bsDynamicFormTextboxType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormTextboxModule {}
