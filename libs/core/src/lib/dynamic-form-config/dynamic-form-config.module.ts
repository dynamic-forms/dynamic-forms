import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormElementType, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormFieldType, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapperType, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-config';
import { DynamicFormInputType, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationConfig, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { dynamicFormConfig, DynamicFormConfig, DYNAMIC_FORM_CONFIGS } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@NgModule({})
export class DynamicFormConfigModule {
  static forRoot(config: DynamicFormConfig = dynamicFormConfig): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: 'core'
        },
        {
          provide: DYNAMIC_FORM_CONFIGS,
          useValue: config,
          multi: true
        },
        DynamicFormConfigService
      ]
    };
  }

  static forChild(config: DynamicFormConfig): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIGS,
          useValue: config,
          multi: true
        }
      ]
    };
  }

  static withElement(elementType: DynamicFormElementType): ModuleWithProviders<DynamicFormConfigModule> {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ELEMENT_TYPES,
          useValue: elementType,
          multi: true
        }
      ]
    };
  }

  static withField(fieldType: DynamicFormFieldType) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_TYPES,
          useValue: fieldType,
          multi: true
        }
      ]
    };
  }

  static withInput(inputType: DynamicFormInputType) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_INPUT_TYPES,
          useValue: inputType,
          multi: true
        }
      ]
    };
  }

  static withFieldWrapper(fieldWrapperType: DynamicFormFieldWrapperType) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPES,
          useValue: fieldWrapperType,
          multi: true
        }
      ]
    };
  }

  static withValidation(validationConfig: DynamicFormValidationConfig) {
    return {
      ngModule: DynamicFormConfigModule,
      providers: [
        {
          provide: DYNAMIC_FORM_VALIDATION_CONFIGS,
          useValue: validationConfig,
          multi: true
        }
      ]
    };
  }
}
