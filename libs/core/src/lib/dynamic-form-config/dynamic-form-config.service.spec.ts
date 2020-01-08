import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigService', () => {
  describe('with single config', () => {
    const config: DynamicFormConfig = {
      library: 'test',
      elementConfig: {
        types: [ { type: 'content', component: null } ]
      },
      fieldConfig: {
        types: [ { type: 'group', component: null } ]
      },
      inputConfig: {
        types: [ { type: 'input', component: null } ]
      },
      wrapperConfig: {
        types: [ { type: 'wrapper', component: null } ]
      },
      validationConfig: {
        defaultMessage: 'invalid',
        messages: {
          required: 'required'
        }
      }
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: 'test'
          },
          {
            provide: DYNAMIC_FORM_CONFIG,
            useValue: [ config ]
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

    it('returns DynamicElementTypeConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementTypeConfig = service.getElementTypeConfig('content');

        expect(elementTypeConfig).toEqual(config.elementConfig.types[0]);
      })
    );

    it('returns DynamicElementTypeConfig being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementTypeConfig = service.getElementTypeConfig('element');

        expect(elementTypeConfig).toBeUndefined();
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

    it('returns DynamicFieldWrapperTypeConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const wrapperTypeConfig = service.getWrapperTypeConfig('wrapper');

        expect(wrapperTypeConfig).toEqual(config.wrapperConfig.types[0]);
      })
    );

    it('returns DynamicFieldWrapperTypeConfig being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const wrapperTypeConfig = service.getWrapperTypeConfig('wrapper2');

        expect(wrapperTypeConfig).toBeUndefined();
      })
    );

    it('returns DynamicFormValidationConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const validationConfig = service.getValidationConfig();

        expect(validationConfig).toEqual(config.validationConfig);
      })
    );
  });

  describe('with single config with neither field, element, input, wrapper nor validation config', () => {
    const config: DynamicFormConfig = {
      library: 'test'
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: 'test'
          },
          {
            provide: DYNAMIC_FORM_CONFIG,
            useValue: [ config ]
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

    it('throws error for DynamicElementTypeConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getElementTypeConfig('')).toThrowError();
      })
    );

    it('throws error for DynamicFieldTypeConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getFieldTypeConfig('')).toThrowError();
      })
    );

    it('throws error for DynamicInputTypeConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getInputTypeConfig('')).toThrowError();
      })
    );

    it('throws error for DynamicFieldWrapperTypeConfig',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getWrapperTypeConfig('')).toThrowError();
      })
    );

    it('returns DynamicFormValidationConfig being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const validationConfig = service.getValidationConfig();

        expect(validationConfig).toBeUndefined();
      })
    );
  });

  describe('with multiple configs', () => {
    const configs: DynamicFormConfig[] = [
      {
        library: 'core',
        elementConfig: {
          types: [
            { type: 'container', component: null },
            { type: 'content', component: null }
          ]
        },
        fieldConfig: {
          types: [
            { type: 'group', component: null },
            { type: 'array', component: null },
            { type: 'control', component: null }
          ]
        },
        inputConfig: {
          types: null
        },
        validationConfig: {
          defaultMessage: 'invalid',
          messages: {
            required: 'required'
          }
        }
      },
      {
        library: 'test',
        elementConfig: {
          types: [
            { type: 'button', component: null }
          ]
        },
        fieldConfig: {
          types: null
        },
        inputConfig: {
          types: [ { type: 'input', component: null } ]
        },
        wrapperConfig: {
          types: [ { type: 'wrapper', component: null } ]
        }
      },
      {
        library: 'test2',
        validationConfig: {
          defaultMessage: null,
          messages: {}
        }
      }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: 'test'
          },
          {
            provide: DYNAMIC_FORM_CONFIG,
            useValue: configs
          },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns DynamicFormConfig being merged',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.config).toEqual({
          library: 'test',
          elementConfig: {
            types: [
              { type: 'container', component: null },
              { type: 'content', component: null },
              { type: 'button', component: null }
            ]
          },
          fieldConfig: {
            types: [
              { type: 'group', component: null },
              { type: 'array', component: null },
              { type: 'control', component: null }
            ]
          },
          inputConfig: {
            types: [ { type: 'input', component: null } ]
          },
          wrapperConfig: {
            types: [ { type: 'wrapper', component: null } ]
          },
          validationConfig: {
            defaultMessage: 'invalid',
            messages: {
              required: 'required'
            }
          }
        });
      })
    );
  });
});
