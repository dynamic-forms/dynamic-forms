import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormToggleComponent } from './dynamic-form-toggle.component';

export const matDynamicFormToggleType: DynamicFormInputType = {
  type: 'toggle',
  component: MatDynamicFormToggleComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(matDynamicFormToggleType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class MatDynamicFormToggleModule {}
