import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
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

/**
 * @deprecated Use {@link dynamicFormConfigProviders} instead.
 */
@NgModule({ providers: dynamicFormConfigProviders })
export class DynamicFormConfigModule {
  /**
   * @deprecated Use {@link withDynamicFormElements} instead.
   */
  static withElement(elementType: DynamicFormElementType): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormElements(elementType);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormElements} instead.
   */
  static withElements(elementTypes: DynamicFormElementType[]): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormElements(...elementTypes);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormFields} instead.
   */
  static withField(fieldType: DynamicFormFieldType): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormFields(fieldType);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormFields} instead.
   */
  static withFields(fieldTypes: DynamicFormFieldType[]): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormFields(...fieldTypes);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormActions} instead.
   */
  static withAction(actionType: DynamicFormActionType): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormActions(actionType);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormActions} instead.
   */
  static withActions(actionTypes: DynamicFormActionType[]): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormActions(...actionTypes);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormInputs} instead.
   */
  static withInput(inputType: DynamicFormInputType): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormInputs(inputType);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormInputs} instead.
   */
  static withInputs(inputTypes: DynamicFormInputType[]): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormInputs(...inputTypes);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormFieldWrappers} instead.
   */
  static withFieldWrapper(fieldWrapperType: DynamicFormFieldWrapperType): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormFieldWrappers(fieldWrapperType);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }

  /**
   * @deprecated Use {@link withDynamicFormFieldWrappers} instead.
   */
  static withFieldWrappers(fieldWrapperTypes: DynamicFormFieldWrapperType[]): ModuleWithProviders<DynamicFormConfigModule> {
    const feature = withDynamicFormFieldWrappers(...fieldWrapperTypes);
    return { ngModule: DynamicFormConfigModule, providers: feature.providers };
  }
}
