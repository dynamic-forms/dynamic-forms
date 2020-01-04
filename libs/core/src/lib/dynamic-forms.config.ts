import { Provider } from '@angular/core';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfig } from './dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form/dynamic-form-config.service';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';

export const dynamicFormConfig: DynamicFormConfig = {
  library: 'core',
  elementConfig: { types: [] },
  fieldConfig: { types: [] },
  inputConfig: { types: [] },
  wrapperConfig: { types: [] },
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

export const dynamicFormProviders: Provider[] = [
  DynamicFormConfigService,
  DynamicFormBuilder,
  DynamicFormExpressionBuilder,
  DynamicFormEvaluationBuilder,
  DynamicFormValidationBuilder,
  DynamicFormValidationService,
  DynamicFormComponentFactory
];
