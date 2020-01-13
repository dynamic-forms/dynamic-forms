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

    it('returns DynamicElementType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('content');

        expect(elementType).toEqual(config.elementConfig.types[0]);
      })
    );

    it('returns DynamicElementType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('element');

        expect(elementType).toBeUndefined();
      })
    );

    it('returns DynamicFieldType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('group');

        expect(fieldType).toEqual(config.fieldConfig.types[0]);
      })
    );

    it('returns DynamicFieldType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('array');

        expect(fieldType).toBeUndefined();
      })
    );

    it('returns DynamicFormInputType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input');

        expect(inputType).toEqual(config.inputConfig.types[0]);
      })
    );

    it('returns DynamicFormInputType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input2');

        expect(inputType).toBeUndefined();
      })
    );

    it('returns DynamicFieldWrapperType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const wrapperType = service.getFieldWrapperType('wrapper');

        expect(wrapperType).toEqual(config.wrapperConfig.types[0]);
      })
    );

    it('returns DynamicFieldWrapperType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const wrapperType = service.getFieldWrapperType('wrapper2');

        expect(wrapperType).toBeUndefined();
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

    it('throws error for DynamicElementType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getElementType('')).toThrowError();
      })
    );

    it('throws error for DynamicFieldType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getFieldType('')).toThrowError();
      })
    );

    it('throws error for DynamicInputType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getInputType('')).toThrowError();
      })
    );

    it('throws error for DynamicFieldWrapperType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(() => service.getFieldWrapperType('')).toThrowError();
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
