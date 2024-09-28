import { DynamicFormElementType, DynamicFormsFeature, dynamicFormModalFactory, withDynamicFormElements } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormModalComponent } from './dynamic-form-modal.component';

export const matDynamicFormModalType: DynamicFormElementType = {
  type: 'modal',
  factory: dynamicFormModalFactory,
  component: MatDynamicFormModalComponent,
  libraryName: matDynamicFormLibrary.name,
};

export function withMatDynamicFormModal(): DynamicFormsFeature {
  return withDynamicFormElements(matDynamicFormModalType);
}
