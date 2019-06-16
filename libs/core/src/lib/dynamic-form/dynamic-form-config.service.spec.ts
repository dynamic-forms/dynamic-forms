import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigService', () => {
  const config: DynamicFormConfig = {
    module: 'test',
    wrapperConfig: {
      types: [ { type: 'wrapper', component: null } ]
    },
    fieldConfig: {
      types: [ { type: 'group', component: null } ]
    },
    inputConfig: {
      types: [ { type: 'input', component: null } ]
    },
    validationConfig: {
      defaultMessage: null,
      messages: {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config
        },
        DynamicFormConfigService
      ]
    });
  }));

  it('returns DynamicFormConfig',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      expect(service.config).toEqual(config);
    })
  );

  it('returns DynamicWrapperTypeConfig',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const wrapperTypeConfig = service.getWrapperTypeConfig('wrapper');

      expect(wrapperTypeConfig).toEqual(config.wrapperConfig.types[0]);
    })
  );

  it('returns DynamicWrapperTypeConfig being undefined if not found',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const wrapperTypeConfig = service.getWrapperTypeConfig('wrapper2');

      expect(wrapperTypeConfig).toBeUndefined();
    })
  );

  it('returns DynamicFieldTypeConfig',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const fieldTypeConfig = service.getFieldTypeConfig('group');

      expect(fieldTypeConfig).toEqual(config.fieldConfig.types[0]);
    })
  );

  it('returns DynamicFieldTypeConfig being undefined if not found',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const fieldTypeConfig = service.getFieldTypeConfig('array');

      expect(fieldTypeConfig).toBeUndefined();
    })
  );

  it('returns DynamicFormInputTypeConfig',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const inputTypeConfig = service.getInputTypeConfig('input');

      expect(inputTypeConfig).toEqual(config.inputConfig.types[0]);
    })
  );

  it('returns DynamicFormInputTypeConfig being undefined if not found',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const inputTypeConfig = service.getInputTypeConfig('input2');

      expect(inputTypeConfig).toBeUndefined();
    })
  );

  it('returns DynamicFormValidationConfig',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const validationConfig = service.getValidationConfig();

      expect(validationConfig).toEqual(config.validationConfig);
    })
  );
});
