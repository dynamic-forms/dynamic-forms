import { DynamicFormsFeature, withDynamicFormElements, withDynamicFormModalActionHandlers } from '@dynamic-forms/core';
import { matDynamicFormAccordionType } from './dynamic-form-items/dynamic-form-accordion/dynamic-form-accordion.module';
import { matDynamicFormTabsType } from './dynamic-form-items/dynamic-form-tabs/dynamic-form-tabs.module';
import { matDynamicFormModalType } from './dynamic-form-modal/dynamic-form-modal.module';

export const matDynamicFormElementTypes = [matDynamicFormAccordionType, matDynamicFormTabsType, matDynamicFormModalType];

export function withMatDynamicFormElementDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormElements(...matDynamicFormElementTypes), withDynamicFormModalActionHandlers()];
}
