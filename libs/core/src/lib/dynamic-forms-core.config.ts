import { DynamicFormArrayComponent } from './dynamic-form-array/dynamic-form-array.component';
import { DynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { DynamicFormGroupComponent } from './dynamic-form-group/dynamic-form-group.component';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationComponent } from './dynamic-form-validation/dynamic-form-validation.component';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormConfig } from './dynamic-form/dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form/dynamic-form-config.service';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

export const dynamicFormsCoreConfig: DynamicFormConfig = {
  module: 'core',
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: DynamicFormControlComponent }
    ]
  },
  inputConfig: {
    types: []
  },
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

export const dynamicFormsCoreComponents = [
  DynamicFormComponent,
  DynamicFormFieldComponent,
  DynamicFormValidationComponent
];

export const dynamicFormsCoreEntryComponents = [
  DynamicFormGroupComponent,
  DynamicFormArrayComponent,
  DynamicFormControlComponent
];

export const dynamicFormsCoreServices = [
  DynamicFormBuilder,
  DynamicFormExpressionBuilder,
  DynamicFormEvaluationBuilder,
  DynamicFormValidationBuilder,
  DynamicFormValidationService,
  DynamicFormComponentFactory
];

export function dynamicFormsCoreConfigFactory(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === dynamicFormsCoreConfig.module);
  return new DynamicFormConfigService(config);
}
