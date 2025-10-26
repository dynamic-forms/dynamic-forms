import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import {
  DYNAMIC_FORM_ID_BUILDER,
  DYNAMIC_FORM_LIBRARY,
  DYNAMIC_FORM_THEME,
  DynamicFormActionService,
  DynamicFormBuilder,
  DynamicFormComponentFactory,
  DynamicFormConfigService,
  DynamicFormDateConverter,
  DynamicFormEvaluationBuilder,
  DynamicFormExpressionBuilder,
  DynamicFormIdBuilder,
  DynamicFormLibrary,
  DynamicFormLibraryService,
  DynamicFormNativeDateConverter,
  DynamicFormValidationBuilder,
  DynamicFormValidationService,
  dynamicFormValidationConfig,
  provideDynamicForms,
} from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';
import { provideBsDynamicForms, provideBsDynamicFormsWithDefaultFeatures } from './dynamic-forms.module';

describe('BsDynamicFormsModule', () => {
  describe('without providers', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      { name: 'provideDynamicForms', def: { providers: provideDynamicForms() } },
    ];

    testModules.forEach(testModule => {
      describe(`using ${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('does not provide DYNAMIC_FORM_LIBRARY', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError();
        });

        it('does not provide DYNAMIC_FORM_THEME', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_THEME)).toThrowError();
        });

        it('does not provide DYNAMIC_FORM_ID_BUILDER', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_ID_BUILDER)).toThrowError();
        });

        it('does not provide DynamicFormLibraryService', () => {
          expect(() => TestBed.inject(DynamicFormLibraryService)).toThrowError();
        });

        it('does not provide DynamicFormConfigService', () => {
          expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError();
        });

        it('does not provide DynamicFormExpressionBuilder', () => {
          expect(() => TestBed.inject(DynamicFormExpressionBuilder)).toThrowError();
        });

        it('does not provide DynamicFormEvaluationBuilder', () => {
          expect(() => TestBed.inject(DynamicFormEvaluationBuilder)).toThrowError();
        });

        it('does not provide DynamicFormValidationBuilder', () => {
          expect(() => TestBed.inject(DynamicFormValidationBuilder)).toThrowError();
        });

        it('does not provide DynamicFormComponentFactory', () => {
          expect(() => TestBed.inject(DynamicFormComponentFactory)).toThrowError();
        });
      });
    });
  });

  describe('provideMatDynamicForms', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: provideBsDynamicForms() });
    });

    it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
      expect(library).toEqual(bsDynamicFormLibrary);
    }));
  });

  describe('forRoot', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      { name: 'provideBsDynamicFormsWithDefaultFeatures', def: { providers: provideBsDynamicFormsWithDefaultFeatures() } },
    ];

    testModules.forEach(testModule => {
      describe(`using ${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
          expect(library).toEqual(bsDynamicFormLibrary);
        }));

        it('does not provide DYNAMIC_FORM_THEME', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_THEME)).toThrowError();
        });

        it('does not provide DYNAMIC_FORM_ID_BUILDER', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_ID_BUILDER)).toThrowError();
        });

        it('provides DynamicFormLibraryService', inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
          expect(service).toBeTruthy();
          expect(service.library).toEqual(bsDynamicFormLibrary);
          expect(service.libraryNames).toEqual(['bootstrap', 'core']);
        }));

        it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
          expect(service).toBeTruthy();
          expect(service.actionTypes.length).toBe(2);
          expect(service.elementTypes.length).toBe(6);
          expect(service.fieldTypes.length).toBe(4);
          expect(service.fieldWrapperTypes.length).toBe(3);
          expect(service.inputTypes.length).toBe(11);
        }));

        it('provides DynamicFormBuilder', inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormExpressionBuilder', inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormValidationBuilder', inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
          expect(service).toBeTruthy();
          expect(service.arrayValidatorTypes.length).toBe(3);
          expect(service.controlValidatorTypes.length).toBe(10);
          expect(service.dictionaryValidatorTypes.length).toBe(3);
          expect(service.groupValidatorTypes.length).toBe(3);
        }));

        it('provides DynamicFormValidationService', inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
          expect(service).toBeTruthy();
          expect(service.validationConfig).toEqual({ ...dynamicFormValidationConfig, libraryName: bsDynamicFormLibrary.name });
        }));

        it('provides DynamicFormComponentFactory', inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
          expect(service).toBeTruthy();
          expect(service.handlers.length).toBe(25);
        }));

        it('provides DynamicFormDateConverter', inject([DynamicFormDateConverter], (service: DynamicFormDateConverter) => {
          expect(service).toBeInstanceOf(DynamicFormNativeDateConverter);
        }));
      });
    });
  });

  describe('forRoot with config', () => {
    const config = { theme: 'theme', idBuilder: { createId: () => 'dynamic-form-id' } };
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      { name: 'provideBsDynamicFormsWithDefaultFeatures', def: { providers: provideBsDynamicFormsWithDefaultFeatures(config) } },
    ];

    testModules.forEach(testModule => {
      describe(`using ${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_THEME', inject([DYNAMIC_FORM_THEME], (theme: string) => {
          expect(theme).toBe('theme');
        }));

        it('provides DYNAMIC_FORM_ID_BUILDER being undefined', inject([DYNAMIC_FORM_ID_BUILDER], (service: DynamicFormIdBuilder) => {
          expect(service).toBeTruthy();
        }));
      });
    });
  });
});
