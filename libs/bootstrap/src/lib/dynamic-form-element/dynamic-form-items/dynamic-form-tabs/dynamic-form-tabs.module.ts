import { DynamicFormElementType, DynamicFormsFeature, dynamicFormItemsFactory, withDynamicFormElements } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormTabsComponent } from './dynamic-form-tabs.component';

export const bsDynamicFormTabsType: DynamicFormElementType = {
  type: 'tabs',
  factory: dynamicFormItemsFactory,
  component: BsDynamicFormTabsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormTabs(): DynamicFormsFeature {
  return withDynamicFormElements(bsDynamicFormTabsType);
}
