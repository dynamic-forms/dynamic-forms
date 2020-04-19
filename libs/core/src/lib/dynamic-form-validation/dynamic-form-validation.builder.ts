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

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG)
    private controlValidatorTypeConfig: DynamicFormControlValidatorTypeConfig,
    @Optional() @Inject(DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG)
    private groupValidatorTypeConfig: DynamicFormGroupValidatorTypeConfig,
    @Optional() @Inject(DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG)
    private arrayValidatorTypeConfig: DynamicFormArrayValidatorTypeConfig
  ) {
    this.controlValidatorTypes = this.libraryService.filterTypes(this.controlValidatorTypeConfig);
    this.groupValidatorTypes = this.libraryService.filterTypes(this.groupValidatorTypeConfig);
    this.arrayValidatorTypes = this.libraryService.filterTypes(this.arrayValidatorTypeConfig);
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

  createControlValidators(control: DynamicFormControl): DynamicFormControlValidator[] {
    return control.template.validation ? Object.keys(control.template.validation).map(key => {
      return this.createControlValidator(control, key);
    }).filter(validator => !!validator) : [];
  }

  createControlValidator(control: DynamicFormControl, key: string): DynamicFormControlValidator {
    if (!(control.template && typeof control.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const validatorType = this.getControlValidatorType(key);
    return validatorType ? new DynamicFormControlValidator(key, control, validatorType.factory) : undefined;
  }

  createGroupValidators(group: DynamicFormGroup): DynamicFormGroupValidator[] {
    return group.template.validation ? Object.keys(group.template.validation).map(key => {
      return this.createGroupValidator(group, key);
    }).filter(validator => !!validator) : [];
  }

  createGroupValidator(group: DynamicFormGroup, key: string): DynamicFormGroupValidator {
    if (!(group.template && typeof group.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const validatorType = this.getGroupValidatorType(key);
    return validatorType ? new DynamicFormGroupValidator(key, group, validatorType.factory) : undefined;
  }

  createArrayValidators(array: DynamicFormArray): DynamicFormArrayValidator[] {
    return array.template.validation ? Object.keys(array.template.validation).map(key => {
      return this.createArrayValidator(array, key);
    }).filter(validator => !!validator) : [];
  }

  createArrayValidator(array: DynamicFormArray, key: string): DynamicFormArrayValidator {
    if (!(array.template && typeof array.template.validation[key] === 'boolean')) {
      return undefined;
    }

    const validatorType = this.getArrayValidatorType(key);
    return validatorType ? new DynamicFormArrayValidator(key, array, validatorType.factory) : undefined;
  }
}
