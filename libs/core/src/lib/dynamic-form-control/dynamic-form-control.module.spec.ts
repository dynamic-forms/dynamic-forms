import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormControlEvaluatorTypes } from './dynamic-form-control-evaluator-type';
import {
  DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
  DynamicFormControlEvaluatorTypeConfig,
} from './dynamic-form-control-evaluator-type-config';
import { dynamicFormControlValidatorTypes } from './dynamic-form-control-validator-type';
import {
  DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
  DynamicFormControlValidatorTypeConfig,
} from './dynamic-form-control-validator-type-config';
import { DynamicFormControlModule, dynamicFormControlType } from './dynamic-form-control.module';

describe('DynamicFormControlModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormControlModule],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
      ],
    });
  });

  it('provides DYNAMIC_FORM_FIELD_TYPES', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    const types = service.fieldTypes;

    expect(types.length).toBe(1);
    expect(types[0]).toEqual(dynamicFormControlType);
    expect(types[0].factory).toEqual(jasmine.any(Function));
    expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('provides DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG],
    (config: DynamicFormControlEvaluatorTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config).toEqual(dynamicFormControlEvaluatorTypes);
    },
  ));

  it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG],
    (config: DynamicFormControlValidatorTypeConfig) => {
      expect(config.length).toBe(7);
      expect(config).toEqual(dynamicFormControlValidatorTypes);
    },
  ));

  it('provides DYNAMIC_FORM_ACTION_HANDLERS', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handlers = service.handlers;

    expect(handlers.length).toBe(6);
  }));
});
