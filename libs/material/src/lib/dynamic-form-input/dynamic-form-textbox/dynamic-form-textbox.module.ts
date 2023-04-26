import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const matDynamicFormTextboxType: DynamicFormInputType = {
  type: 'textbox',
  component: MatDynamicFormTextboxComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [

    DynamicFormConfigModule.withInput(matDynamicFormTextboxType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class MatDynamicFormTextboxModule {}
