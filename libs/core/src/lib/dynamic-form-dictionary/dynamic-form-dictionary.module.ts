import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { dynamicFormDictionaryFactory } from './dynamic-form-dictionary-factory';
import { dynamicFormDictionaryValidatorTypes } from './dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryComponent } from './dynamic-form-dictionary.component';

export const dynamicFormDictionaryType: DynamicFormFieldType = {
  type: 'dictionary',
  factory: dynamicFormDictionaryFactory,
  component: DynamicFormDictionaryComponent,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule,
    DynamicFormConfigModule.withField(dynamicFormDictionaryType),
    DynamicFormValidationModule.withDictionaryValidators(dynamicFormDictionaryValidatorTypes)
  ],
  declarations: [
    DynamicFormDictionaryComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormActionModule,
    DynamicFormDictionaryComponent
  ],
  entryComponents: [
    DynamicFormDictionaryComponent
  ]
})
export class DynamicFormDictionaryModule {}
