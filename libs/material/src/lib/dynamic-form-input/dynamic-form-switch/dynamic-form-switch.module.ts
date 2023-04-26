import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormSwitchComponent } from './dynamic-form-switch.component';

export const matDynamicFormSwitchType: DynamicFormInputType = {
  type: 'switch',
  component: MatDynamicFormSwitchComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(matDynamicFormSwitchType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class MatDynamicFormSwitchModule {}
