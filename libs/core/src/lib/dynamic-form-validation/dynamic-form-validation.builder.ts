import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayAsyncValidator, DynamicFormArrayValidator } from '../dynamic-form-array/dynamic-form-array-validator';
import { DynamicFormArrayAsyncValidatorType, DynamicFormArrayValidatorType } from '../dynamic-form-array/dynamic-form-array-validator-type';
import { DynamicFormArrayValidatorTypeConfig,
  DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlAsyncValidator, DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlAsyncValidatorType,
  DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DynamicFormControlValidatorTypeConfig,
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionary } from '../dynamic-form-dictionary/dynamic-form-dictionary';
import { DynamicFormDictionaryAsyncValidator,
  DynamicFormDictionaryValidator } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator';
import { DynamicFormDictionaryAsyncValidatorType,
  DynamicFormDictionaryValidatorType } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryValidatorTypeConfig,
  DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupAsyncValidator, DynamicFormGroupValidator } from '../dynamic-form-group/dynamic-form-group-validator';
import { DynamicFormGroupAsyncValidatorType, DynamicFormGroupValidatorType } from '../dynamic-form-group/dynamic-form-group-validator-type';
import { DynamicFormGroupValidatorTypeConfig,
  DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';

@Injectable()
export class DynamicFormValidationBuilder {
  readonly controlValidatorTypes: (DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType)[];
  readonly groupValidatorTypes: (DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType)[];
  readonly arrayValidatorTypes: (DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType)[];
  readonly dictionaryValidatorTypes: (DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType)[];

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

  getControlValidatorType(type: string): DynamicFormControlValidatorType | DynamicFormControlAsyncValidatorType {
    return this.controlValidatorTypes.find(f => f.type === type);
  }

  getGroupValidatorType(type: string): DynamicFormGroupValidatorType | DynamicFormGroupAsyncValidatorType {
    return this.groupValidatorTypes.find(f => f.type === type);
  }

  getArrayValidatorType(type: string): DynamicFormArrayValidatorType | DynamicFormArrayAsyncValidatorType {
    return this.arrayValidatorTypes.find(f => f.type === type);
  }

  getDictionaryValidatorType(type: string): DynamicFormDictionaryValidatorType | DynamicFormDictionaryAsyncValidatorType {
    return this.dictionaryValidatorTypes.find(f => f.type === type);
  }

  createControlValidators(control: DynamicFormControl): (DynamicFormControlValidator | DynamicFormControlAsyncValidator)[] {
    return control.template.validation
      ? Object.keys(control.template.validation).map(key => this.createControlValidator(control, key)).filter(validator => !!validator)
      : [];
  }

  createControlValidator(control: DynamicFormControl, key: string): DynamicFormControlValidator | DynamicFormControlAsyncValidator {
    if (!(control.template && typeof control.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(control, key);
    const validatorType = this.getControlValidatorType(type);
    return validatorType
      ? validatorType.async
        ? new DynamicFormControlAsyncValidator(validatorType.factory, key, control, validatorType.deps)
        : new DynamicFormControlValidator(validatorType.factory, key, control, validatorType.deps)
      : undefined;
  }

  createGroupValidators(group: DynamicFormGroup): (DynamicFormGroupValidator | DynamicFormGroupAsyncValidator)[] {
    const keys = Object.keys(group.template.validation || {});
    return keys.map(key => this.createGroupValidator(group, key)).filter(validator => !!validator);
  }

  createGroupValidator(group: DynamicFormGroup, key: string): DynamicFormGroupValidator | DynamicFormGroupAsyncValidator {
    if (!(group.template && typeof group.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(group, key);
    const validatorType = this.getGroupValidatorType(type);
    return validatorType
      ? validatorType.async
        ? new DynamicFormGroupAsyncValidator(validatorType.factory, key, group, validatorType.deps)
        : new DynamicFormGroupValidator(validatorType.factory, key, group, validatorType.deps)
      : undefined;
  }

  createArrayValidators(array: DynamicFormArray): (DynamicFormArrayValidator | DynamicFormArrayAsyncValidator )[] {
    const keys = Object.keys(array.template.validation || {});
    return keys.map(key => this.createArrayValidator(array, key)).filter(validator => !!validator);
  }

  createArrayValidator(array: DynamicFormArray, key: string): DynamicFormArrayValidator | DynamicFormArrayAsyncValidator {
    if (!(array.template && typeof array.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(array, key);
    const validatorType = this.getArrayValidatorType(type);
    return validatorType
      ? validatorType.async
        ? new DynamicFormArrayAsyncValidator(validatorType.factory, key, array, validatorType.deps)
        : new DynamicFormArrayValidator(validatorType.factory, key, array, validatorType.deps)
      : undefined;
  }

  createDictionaryValidators(
    dictionary: DynamicFormDictionary
  ): (DynamicFormDictionaryValidator | DynamicFormDictionaryAsyncValidator)[] {
    const keys = Object.keys(dictionary.template.validation || {});
    return keys.map(key => this.createDictionaryValidator(dictionary, key)).filter(validator => !!validator);
  }

  createDictionaryValidator(
    dictionary: DynamicFormDictionary, key: string
  ): DynamicFormDictionaryValidator | DynamicFormDictionaryAsyncValidator {
    if (!(dictionary.template && typeof dictionary.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const type = this.getValidatorType(dictionary, key);
    const validatorType = this.getDictionaryValidatorType(type);
    return validatorType
      ? validatorType.async
        ? new DynamicFormDictionaryAsyncValidator(validatorType.factory, key, dictionary, validatorType.deps)
        : new DynamicFormDictionaryValidator(validatorType.factory, key, dictionary, validatorType.deps)
      : undefined;
  }

  private getValidatorType(field: DynamicFormField, key: string): string {
    const validator = field.definition.validators && field.definition.validators[key];
    return validator ? validator.type : key;
  }
}
