import { NgModule } from '@angular/core';
import { DynamicFormInputType, DynamicFormsFeature, importDynamicFormsProviders, withDynamicFormInputs } from '@dynamic-forms/core';
import { DynamicFormInputMaskControl } from '@dynamic-forms/core/input-mask';
import { matDynamicFormLibrary } from '@dynamic-forms/material';
import { MatDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

export const matDynamicFormInputMaskType: DynamicFormInputType = {
  type: 'input-mask',
  component: MatDynamicFormInputMaskComponent,
  control: DynamicFormInputMaskControl,
  libraryName: matDynamicFormLibrary.name,
};

export function withMatDynamicFormInputMask(): DynamicFormsFeature {
  return withDynamicFormInputs(matDynamicFormInputMaskType);
}

/**
 * @deprecated Use {@link withMatDynamicFormInputMask} instead.
 */
@NgModule({ providers: importDynamicFormsProviders(withMatDynamicFormInputMask()) })
export class MatDynamicFormInputMaskModule {}
