import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFileModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormFileComponent } from './dynamic-form-file.component';

export const bsDynamicFormFileType: DynamicFormInputType = {
  type: 'file',
  component: BsDynamicFormFileComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormFileModule,
    DynamicFormConfigModule.withInput(bsDynamicFormFileType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormFileModule {}
