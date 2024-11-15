import { DynamicFormElementType, DynamicFormsFeature, dynamicFormItemsFactory, withDynamicFormElements } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const matDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: MatDynamicFormTabsComponent,
  libraryName: matDynamicFormLibrary.name,
};

export function withMatDynamicFormTabs(): DynamicFormsFeature {
  return withDynamicFormElements(matDynamicFormTabsType);
}
