import { DynamicFormsFeature } from '@dynamic-forms/core';
import { withDynamicFormInputMaskDefaultConverters } from '@dynamic-forms/core/input-mask';

export function withBsDynamicFormInputMaskConverters(): DynamicFormsFeature {
  return withDynamicFormInputMaskDefaultConverters();
}
