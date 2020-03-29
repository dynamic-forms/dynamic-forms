import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { dynamicFormControlFactory } from './dynamic-form-control-factory';
import { dynamicFormControlEmailValidatorType, dynamicFormControlMaxLengthValidatorType, dynamicFormControlMaxValidatorType,
  dynamicFormControlMinLengthValidatorType, dynamicFormControlMinValidatorType, dynamicFormControlPatternValidatorType,
  dynamicFormControlRequiredValidatorType } from './dynamic-form-control-validator-type';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

export const dynamicFormControlType: DynamicFormFieldType = {
  type: 'control',
  factory: dynamicFormControlFactory,
  component: DynamicFormControlComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormControlType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlRequiredValidatorType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlEmailValidatorType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlPatternValidatorType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlMinValidatorType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlMaxValidatorType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlMinLengthValidatorType),
    DynamicFormValidationModule.withControlValidator(dynamicFormControlMaxLengthValidatorType)
  ],
  declarations: [
    DynamicFormControlComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormControlComponent
  ],
  entryComponents: [
    DynamicFormControlComponent
  ]
})
export class DynamicFormControlModule {}
