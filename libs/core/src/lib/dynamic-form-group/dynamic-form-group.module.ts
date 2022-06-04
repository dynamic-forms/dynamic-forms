import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { dynamicFormGroupFactory } from './dynamic-form-group-factory';
import { dynamicFormGroupValidatorTypes } from './dynamic-form-group-validator-type';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

export const dynamicFormGroupType: DynamicFormFieldType = {
  type: 'group',
  factory: dynamicFormGroupFactory,
  component: DynamicFormGroupComponent,
  libraryName: dynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormGroupType),
    DynamicFormValidationModule.withGroupValidators(dynamicFormGroupValidatorTypes),
  ],
  declarations: [
    DynamicFormGroupComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormGroupComponent,
  ],
})
export class DynamicFormGroupModule {}
