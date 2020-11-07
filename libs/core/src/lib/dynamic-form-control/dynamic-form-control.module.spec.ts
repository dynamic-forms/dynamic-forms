import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler,
  dynamicFormFieldValidateHandler, dynamicFormSubmitHandler} from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormControlEvaluatorTypes } from './dynamic-form-control-evaluator-type';
import { DynamicFormControlEvaluatorTypeConfig, DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from './dynamic-form-control-evaluator-type-config';
import { dynamicFormControlValidatorTypes } from './dynamic-form-control-validator-type';
import { DynamicFormControlValidatorTypeConfig, DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from './dynamic-form-control-validator-type-config';
import { dynamicFormControlType, DynamicFormControlModule } from './dynamic-form-control.module';

describe('DynamicFormControlModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary)
        }
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const types = service.fieldTypes;

      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormControlType);
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG',
    inject([DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG], (config: DynamicFormControlEvaluatorTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(dynamicFormControlEvaluatorTypes);
    })
  );

  it('provides DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG',
    inject([DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG], (config: DynamicFormControlValidatorTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(dynamicFormControlValidatorTypes);
    })
  );

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handlers = service.handlers;

      expect(handlers.length).toBe(4);
      expect(handlers[0]).toEqual(dynamicFormFieldResetHandler);
      expect(handlers[0].func).toEqual(jasmine.any(Function));
      expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[1]).toEqual(dynamicFormFieldResetDefaultHandler);
      expect(handlers[1].func).toEqual(jasmine.any(Function));
      expect(handlers[1].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[2]).toEqual(dynamicFormFieldValidateHandler);
      expect(handlers[2].func).toEqual(jasmine.any(Function));
      expect(handlers[2].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[3]).toEqual(dynamicFormSubmitHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
