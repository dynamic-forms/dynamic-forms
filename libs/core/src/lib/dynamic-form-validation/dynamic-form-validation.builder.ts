import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayValidator } from '../dynamic-form-array/dynamic-form-array-validator';
import { DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DynamicFormArrayValidatorTypeConfig,
  DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DynamicFormControlValidatorTypeConfig,
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionary } from '../dynamic-form-dictionary/dynamic-form-dictionary';
import { DynamicFormDictionaryValidator } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator';
import { DynamicFormDictionaryValidatorType } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryValidatorTypeConfig,
  DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupValidator } from '../dynamic-form-group/dynamic-form-group-validator';
import { DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DynamicFormGroupValidatorTypeConfig,
  DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';

@Injectable()
export class DynamicFormValidationBuilder {
  readonly controlValidatorTypes: DynamicFormControlValidatorType[];
  readonly groupValidatorTypes: DynamicFormGroupValidatorType[];
  readonly arrayValidatorTypes: DynamicFormArrayValidatorType[];
  readonly dictionaryValidatorTypes: DynamicFormDictionaryValidatorType[];

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG)
    private controlValidatorTypeConfig: DynamicFormControlValidatorTypeConfig,
    @Optional() @Inject(DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG)
    private groupValidatorTypeConfig: DynamicFormGroupValidatorTypeConfig,
    @Optional() @Inject(DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG)
    private arrayValidatorTypeConfig: DynamicFormArrayValidatorTypeConfig,
    @Optional() @Inject(DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG)
    private dictionaryValidatorTypeConfig: DynamicFormDictionaryValidatorTypeConfig
  ) {
    this.controlValidatorTypes = this.libraryService.filterTypes(this.controlValidatorTypeConfig);
    this.groupValidatorTypes = this.libraryService.filterTypes(this.groupValidatorTypeConfig);
    this.arrayValidatorTypes = this.libraryService.filterTypes(this.arrayValidatorTypeConfig);
    this.dictionaryValidatorTypes = this.libraryService.filterTypes(this.dictionaryValidatorTypeConfig);
  }

  getControlValidatorType(type: string): DynamicFormControlValidatorType {
    return this.controlValidatorTypes.find(f => f.type === type);
  }

  getGroupValidatorType(type: string): DynamicFormGroupValidatorType {
    return this.groupValidatorTypes.find(f => f.type === type);
  }

  getArrayValidatorType(type: string): DynamicFormArrayValidatorType {
    return this.arrayValidatorTypes.find(f => f.type === type);
  }

  getDictionaryValidatorType(type: string): DynamicFormDictionaryValidatorType {
    return this.dictionaryValidatorTypes.find(f => f.type === type);
  }

  createControlValidators(control: DynamicFormControl): DynamicFormControlValidator[] {
    return control.template.validation
      ? Object.keys(control.template.validation).map(key => this.createControlValidator(control, key)).filter(validator => !!validator)
      : [];
  }

  createControlValidator(control: DynamicFormControl, key: string): DynamicFormControlValidator {
    if (!(control.template && typeof control.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(control, key);
    const validatorType = this.getControlValidatorType(type);
    return validatorType ? new DynamicFormControlValidator(key, control, validatorType.factory) : undefined;
  }

  createGroupValidators(group: DynamicFormGroup): DynamicFormGroupValidator[] {
    const keys = Object.keys(group.template.validation || {});
    return keys.map(key => this.createGroupValidator(group, key)).filter(validator => !!validator);
  }

  createGroupValidator(group: DynamicFormGroup, key: string): DynamicFormGroupValidator {
    if (!(group.template && typeof group.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(group, key);
    const validatorType = this.getGroupValidatorType(type);
    return validatorType ? new DynamicFormGroupValidator(key, group, validatorType.factory) : undefined;
  }

  createArrayValidators(array: DynamicFormArray): DynamicFormArrayValidator[] {
    const keys = Object.keys(array.template.validation || {});
    return keys.map(key => this.createArrayValidator(array, key)).filter(validator => !!validator);
  }

  createArrayValidator(array: DynamicFormArray, key: string): DynamicFormArrayValidator {
    if (!(array.template && typeof array.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(array, key);
    const validatorType = this.getArrayValidatorType(type);
    return validatorType ? new DynamicFormArrayValidator(key, array, validatorType.factory) : undefined;
  }

  createDictionaryValidators(dictionary: DynamicFormDictionary): DynamicFormDictionaryValidator[] {
    const keys = Object.keys(dictionary.template.validation || {});
    return keys.map(key => this.createDictionaryValidator(dictionary, key)).filter(validator => !!validator);
  }

  createDictionaryValidator(dictionary: DynamicFormDictionary, key: string): DynamicFormDictionaryValidator {
    if (!(dictionary.template && typeof dictionary.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(dictionary, key);
    const validatorType = this.getDictionaryValidatorType(type);
    return validatorType ? new DynamicFormDictionaryValidator(key, dictionary, validatorType.factory) : undefined;
  }

  private getValidatorType(field: DynamicFormField, key: string): string {
    const validator = field.definition.validators && field.definition.validators[key];
    return validator ? validator.type : key;
  }
}
