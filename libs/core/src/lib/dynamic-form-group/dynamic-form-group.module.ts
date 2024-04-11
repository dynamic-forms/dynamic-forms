import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, withDynamicFormFields } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule, withDynamicFormGroupValidators } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
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

const modules = [DynamicFormConfigModule, DynamicFormElementModule, DynamicFormFieldModule, DynamicFormValidationModule];

/**
 * @deprecated Use {@link withDynamicFormGroupDefaultFeatures} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: importDynamicFormsProviders(...withDynamicFormGroupDefaultFeatures()),
})
export class DynamicFormGroupModule {}
