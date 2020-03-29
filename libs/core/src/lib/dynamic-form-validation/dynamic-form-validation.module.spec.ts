import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { dynamicFormValidationConfig, DynamicFormValidationConfig, DynamicFormValidationConfigs,
  DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation.builder';
import { DynamicFormValidationModule } from './dynamic-form-validation.module';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

describe('DynamicFormValidationModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule
        ]
      });
    }));

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.get(DynamicFormValidationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.get(DynamicFormValidationService)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormValidationService',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeDefined();
      })
    );
  });

  describe('withValidation for default config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withValidation()
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS',
      inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(dynamicFormValidationConfig);
      })
    );
  });

  describe('withValidation for provided config', () => {
    const libraryName = 'test';
    const config: DynamicFormValidationConfig = { defaultMessage: 'message', messages: {}, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormValidationModule.withValidation(config)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS',
      inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );
  });
});
