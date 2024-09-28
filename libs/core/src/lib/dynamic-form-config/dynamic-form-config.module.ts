import { Provider } from '@angular/core';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from '../dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type-config';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG } from '../dynamic-form-input/dynamic-form-input-type-config';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DynamicFormConfigService } from './dynamic-form-config.service';

export const dynamicFormConfigProviders: Provider[] = [DynamicFormConfigService];

export function withDynamicFormElements(...elementTypes: DynamicFormElementType[]): DynamicFormsFeature {
  const providers = elementTypes.map(elementType => {
    return {
      provide: DYNAMIC_FORM_ELEMENT_TYPE_CONFIG,
      useValue: elementType,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormFields(...fieldTypes: DynamicFormFieldType[]): DynamicFormsFeature {
  const providers = fieldTypes.map(fieldType => {
    return {
      provide: DYNAMIC_FORM_FIELD_TYPE_CONFIG,
      useValue: fieldType,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormActions(...actionTypes: DynamicFormActionType[]): DynamicFormsFeature {
  const providers = actionTypes.map(actionType => {
    return {
      provide: DYNAMIC_FORM_ACTION_TYPE_CONFIG,
      useValue: actionType,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormInputs(...inputTypes: DynamicFormInputType[]): DynamicFormsFeature {
  const providers = inputTypes.map(inputType => {
    return {
      provide: DYNAMIC_FORM_INPUT_TYPE_CONFIG,
      useValue: inputType,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormFieldWrappers(...fieldWrapperTypes: DynamicFormFieldWrapperType[]): DynamicFormsFeature {
  const providers = fieldWrapperTypes.map(fieldWrapperType => {
    return {
      provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG,
      useValue: fieldWrapperType,
      multi: true,
    };
  });
  return { providers };
}
