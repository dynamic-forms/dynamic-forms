import { NgModule } from '@angular/core';
import { DynamicFormActionModule, DynamicFormConfigModule } from '@dynamic-forms/core';
import { matDynamicFormButtonType } from './dynamic-form-button/dynamic-form-button-type';
import { matDynamicFormIconType } from './dynamic-form-icon/dynamic-form-icon-type';

export const matDynamicFormActionTypes = [matDynamicFormButtonType, matDynamicFormIconType];

@NgModule({
  imports: [DynamicFormActionModule, DynamicFormConfigModule.withActions(matDynamicFormActionTypes)],
  exports: [DynamicFormConfigModule],
})
export class MatDynamicFormActionModule {}
