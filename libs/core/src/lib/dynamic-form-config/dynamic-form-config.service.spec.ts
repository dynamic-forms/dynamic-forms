import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

describe('DynamicFormConfigService', () => {
  describe('with single config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: 'test'
          },
          DynamicFormConfigService
        ]
      });
    }));

    // it('returns DynamicFormConfig',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(service.config).toEqual(config);
    //   })
    // );

    // it('returns DynamicElementType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     const elementType = service.getElementType('content');

    //     expect(elementType).toEqual(config.elementConfig.types[0]);
    //   })
    // );

    it('returns DynamicElementType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('element');

        expect(elementType).toBeUndefined();
      })
    );

    // it('returns DynamicFieldType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     const fieldType = service.getFieldType('group');

    //     expect(fieldType).toEqual(config.fieldConfig.types[0]);
    //   })
    // );

    it('returns DynamicFieldType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('array');

        expect(fieldType).toBeUndefined();
      })
    );

    // it('returns DynamicFormInputType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     const inputType = service.getInputType('input');

    //     expect(inputType).toEqual(config.inputConfig.types[0]);
    //   })
    // );

    it('returns DynamicFormInputType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input2');

        expect(inputType).toBeUndefined();
      })
    );

    // it('returns DynamicFieldWrapperType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     const wrapperType = service.getFieldWrapperType('wrapper');

    //     expect(wrapperType).toEqual(config.wrapperConfig.types[0]);
    //   })
    // );

    it('returns DynamicFieldWrapperType being undefined if not found',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const wrapperType = service.getFieldWrapperType('wrapper2');

        expect(wrapperType).toBeUndefined();
      })
    );

    // it('returns DynamicFormValidationConfig',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     const validationConfig = service.getValidationConfig();

    //     expect(validationConfig).toEqual(config.validationConfig);
    //   })
    // );
  });

  describe('with single config with neither field, element, input, wrapper nor validation config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: 'test'
          },
          DynamicFormConfigService
        ]
      });
    }));

    // it('returns DynamicFormConfig',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(service.config).toEqual(config);
    //   })
    // );

    // it('throws error for DynamicElementType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(() => service.getElementType('')).toThrowError();
    //   })
    // );

    // it('throws error for DynamicFieldType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(() => service.getFieldType('')).toThrowError();
    //   })
    // );

    // it('throws error for DynamicInputType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(() => service.getInputType('')).toThrowError();
    //   })
    // );

    // it('throws error for DynamicFieldWrapperType',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(() => service.getFieldWrapperType('')).toThrowError();
    //   })
    // );

    it('returns DynamicFormValidationConfig being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const validationConfig = service.validationConfig;

        expect(validationConfig).toBeUndefined();
      })
    );
  });

  describe('with multiple configs', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: 'test'
          },
          DynamicFormConfigService
        ]
      });
    }));

    // it('returns DynamicFormConfig being merged',
    //   inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    //     expect(service.config).toEqual({
    //       library: 'test',
    //       validationConfig: {
    //         defaultMessage: 'invalid',
    //         messages: {
    //           required: 'required'
    //         }
    //       }
    //     });
    //   })
    // );
  });
});
