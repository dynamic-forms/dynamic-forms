import { DynamicFormElementType, DynamicFormsFeature, dynamicFormModalFactory, withDynamicFormElements } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormModalComponent } from './dynamic-form-modal.component';

export const bsDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: BsDynamicFormModalComponent,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormModal(): DynamicFormsFeature {
  return withDynamicFormElements(bsDynamicFormModalType);
}
