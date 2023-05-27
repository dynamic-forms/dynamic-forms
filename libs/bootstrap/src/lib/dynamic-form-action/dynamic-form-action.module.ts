import { NgModule } from '@angular/core';
import { DynamicFormActionModule, DynamicFormConfigModule } from '@dynamic-forms/core';
import { bsDynamicFormButtonType } from './dynamic-form-button/dynamic-form-button-type';
import { bsDynamicFormIconType } from './dynamic-form-icon/dynamic-form-icon-type';

export const bsDynamicFormActionTypes = [
  bsDynamicFormButtonType,
  bsDynamicFormIconType,
];

@NgModule({
  imports: [
    DynamicFormActionModule,
    DynamicFormConfigModule.withActions(bsDynamicFormActionTypes),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormActionModule {}
