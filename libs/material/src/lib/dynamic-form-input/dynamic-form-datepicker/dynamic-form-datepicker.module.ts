import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const matDynamicFormDatepickerType: DynamicFormInputType = {
  type: 'datepicker',
  component: MatDynamicFormDatepickerComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(matDynamicFormDatepickerType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class MatDynamicFormDatepickerModule {}
