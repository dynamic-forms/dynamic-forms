import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormSwitchComponent } from './dynamic-form-switch.component';

export const bsDynamicFormSwitchType: DynamicFormInputType = {
  type: 'switch',
  component: BsDynamicFormSwitchComponent,
  wrappers: [ 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withInput(bsDynamicFormSwitchType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormSwitchModule {}
