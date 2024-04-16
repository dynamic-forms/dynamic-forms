import { NgModule } from '@angular/core';
import { bsDynamicFormLibrary } from '@dynamic-forms/bootstrap';
import { DynamicFormInputType, DynamicFormsFeature, importDynamicFormsProviders, withDynamicFormInputs } from '@dynamic-forms/core';
import { DynamicFormInputMaskControl } from '@dynamic-forms/core/input-mask';
import { BsDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

export const bsDynamicFormInputMaskType: DynamicFormInputType = {
  type: 'input-mask',
  component: BsDynamicFormInputMaskComponent,
  control: DynamicFormInputMaskControl,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormInputMask(): DynamicFormsFeature {
  return withDynamicFormInputs(bsDynamicFormInputMaskType);
}

/**
 * @deprecated Use {@link withBsDynamicFormInputMask} instead.
 */
@NgModule({ providers: importDynamicFormsProviders(withBsDynamicFormInputMask()) })
export class BsDynamicFormInputMaskModule {}
