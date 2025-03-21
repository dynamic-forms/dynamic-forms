import { withDynamicFormElements } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { dynamicFormContainerType } from './dynamic-form-container/dynamic-form-container-type';
import { dynamicFormContentType } from './dynamic-form-content/dynamic-form-content-type';
import { dynamicFormTextType } from './dynamic-form-text/dynamic-form-text-type';

export const dynamicFormElementTypes = [dynamicFormContainerType, dynamicFormContentType, dynamicFormTextType];

export function withDynamicFormElementDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormElements(...dynamicFormElementTypes)];
}
