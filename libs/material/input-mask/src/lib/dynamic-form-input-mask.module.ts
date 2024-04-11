import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormsFeature, importDynamicFormsProviders, withDynamicFormInputs } from '@dynamic-forms/core';
import { DynamicFormInputType } from '@dynamic-forms/core';
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

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link withMatDynamicFormInputMask} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(withMatDynamicFormInputMask()),
})
export class MatDynamicFormInputMaskModule {}
