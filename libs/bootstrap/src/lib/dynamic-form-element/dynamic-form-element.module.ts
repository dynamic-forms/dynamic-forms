import { DynamicFormsFeature, withDynamicFormElements, withDynamicFormModalActionHandlers } from '@dynamic-forms/core';
import { bsDynamicFormAccordionType } from './dynamic-form-items/dynamic-form-accordion/dynamic-form-accordion.module';
import { bsDynamicFormTabsType } from './dynamic-form-items/dynamic-form-tabs/dynamic-form-tabs.module';
import { bsDynamicFormModalType } from './dynamic-form-modal/dynamic-form-modal.module';

export const bsDynamicFormElementTypes = [bsDynamicFormAccordionType, bsDynamicFormTabsType, bsDynamicFormModalType];

export function withBsDynamicFormElementDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormElements(...bsDynamicFormElementTypes), withDynamicFormModalActionHandlers()];
}
