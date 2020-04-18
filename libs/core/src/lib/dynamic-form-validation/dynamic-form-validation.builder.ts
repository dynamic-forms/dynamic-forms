import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormControlValidatorType } from '../dynamic-form-control/dynamic-form-control-validator-type';
import { DynamicFormControlValidatorTypeConfig, DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';

@Injectable()
export class DynamicFormValidationBuilder {
  readonly controlValidatorTypes: DynamicFormControlValidatorType[];

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG)
    private controlValidatorTypeConfig: DynamicFormControlValidatorTypeConfig,
  ) {
    this.controlValidatorTypes = this.libraryService.filterTypes(this.controlValidatorTypeConfig);
  }

  getControlValidatorType(type: string): DynamicFormControlValidatorType {
    return this.controlValidatorTypes.find(f => f.type === type);
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
}
