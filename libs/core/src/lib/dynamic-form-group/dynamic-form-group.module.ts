import { withDynamicFormFields } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { withDynamicFormGroupValidators } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { dynamicFormGroupFactory } from './dynamic-form-group-factory';
import { dynamicFormGroupValidatorTypes } from './dynamic-form-group-validator-type';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

export const dynamicFormGroupType: DynamicFormFieldType = {
  type: 'group',
  factory: dynamicFormGroupFactory,
  component: DynamicFormGroupComponent,
  libraryName: dynamicFormLibrary.name,
};

export function withDynamicFormGroupDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormFields(dynamicFormGroupType), withDynamicFormGroupValidators(...dynamicFormGroupValidatorTypes)];
}
