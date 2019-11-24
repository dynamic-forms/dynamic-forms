import { Provider } from '@angular/core';
import { dynamicFormElementConfig } from './dynamic-form-element/dynamic-form-element-config';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { dynamicFormFieldConfig } from './dynamic-form-field/dynamic-form-field-config';
import { dynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from './dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form/dynamic-form-config.service';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';

export const dynamicFormConfig: DynamicFormConfig = {
  library: 'core',
  elementConfig: dynamicFormElementConfig,
  fieldConfig: dynamicFormFieldConfig,
  inputConfig: dynamicFormInputConfig,
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};

export function dynamicFormConfigServiceFactory(library: string, configs: DynamicFormConfig[]) {
  return new DynamicFormConfigService(configs.find(c => c.library === library));
}

export function getDynamicFormProviders(defaultConfig: DynamicFormConfig, config?: DynamicFormConfig): Provider[] {
  return [
    {
      provide: DYNAMIC_FORM_LIBRARY,
      useValue: config ? config.library : defaultConfig.library
    },
    {
      provide: DYNAMIC_FORM_CONFIG,
      useValue: config || defaultConfig,
      multi: true
    },
    {
      provide: DynamicFormConfigService,
      useFactory: dynamicFormConfigServiceFactory,
      deps: [ DYNAMIC_FORM_LIBRARY, DYNAMIC_FORM_CONFIG ]
    },
    DynamicFormBuilder,
    DynamicFormExpressionBuilder,
    DynamicFormEvaluationBuilder,
    DynamicFormValidationBuilder,
    DynamicFormValidationService,
    DynamicFormComponentFactory
  ];
}
