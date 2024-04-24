import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormGroupValidatorTypes } from './dynamic-form-group-validator-type';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG, DynamicFormGroupValidatorTypeConfig } from './dynamic-form-group-validator-type-config';
import { DynamicFormGroupModule, dynamicFormGroupType } from './dynamic-form-group.module';

describe('DynamicFormGroupModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormGroupModule],
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
    expect(types[0]).toEqual(dynamicFormGroupType);
    expect(types[0].factory).toEqual(jasmine.any(Function));
    expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('provides DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG],
    (config: DynamicFormGroupValidatorTypeConfig) => {
      expect(config.length).toBe(3);
      expect(config).toEqual(dynamicFormGroupValidatorTypes);
    },
  ));

  it('provides DYNAMIC_FORM_ACTION_HANDLERS', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handlers = service.handlers;

    expect(handlers.length).toBe(6);
  }));
});
