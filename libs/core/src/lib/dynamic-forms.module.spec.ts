import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormActionService } from './dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from './dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from './dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormLogger } from './dynamic-form-error/dynamic-form.logger';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG } from './dynamic-form-field/dynamic-form-field-type-config';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG } from './dynamic-form-field/dynamic-form-field-wrapper-type-config';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG } from './dynamic-form-input/dynamic-form-input-type-config';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary, dynamicFormLibrary } from './dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library/dynamic-form-library.service';
import { DYNAMIC_FORM_VALIDATION_CONFIGS } from './dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import {
  DynamicFormsModule,
  dynamicFormsDefaultFeatures,
  importDynamicFormsProviders,
  provideDynamicForms,
  provideDynamicFormsWithDefaultFeatures,
} from './dynamic-forms.module';

describe('DynamicFormsModule', () => {
  describe('without DYNAMIC_FORM_LIBRARY using', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      { name: 'DynamicFormsModule', def: { imports: [DynamicFormsModule] } },
      { name: 'DynamicFormsModule.withFeatures', def: { imports: [DynamicFormsModule.withFeatures()] } },
      { name: 'provideDynamicForms', def: { providers: provideDynamicForms() } },
    ];

    testModules.forEach(testModule => {
      describe(`${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('does not provide DYNAMIC_FORM_LIBRARY', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormLibraryService', () => {
          expect(() => TestBed.inject(DynamicFormLibraryService)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_ELEMENT_TYPES', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_ELEMENT_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_FIELD_TYPES', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_INPUT_TYPE_CONFIG', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_INPUT_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_FIELD_WRAPPER_TYPES', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_VALIDATION_CONFIGS', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_VALIDATION_CONFIGS)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormConfigService', () => {
          expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormLogger', () => {
          expect(() => TestBed.inject(DynamicFormLogger)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormBuilder', () => {
          expect(() => TestBed.inject(DynamicFormBuilder)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormExpressionBuilder', () => {
          expect(() => TestBed.inject(DynamicFormExpressionBuilder)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormEvaluationBuilder', () => {
          expect(() => TestBed.inject(DynamicFormEvaluationBuilder)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormValidationBuilder', () => {
          expect(() => TestBed.inject(DynamicFormValidationBuilder)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormValidationService', () => {
          expect(() => TestBed.inject(DynamicFormValidationService)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormComponentFactory', () => {
          expect(() => TestBed.inject(DynamicFormComponentFactory)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DynamicFormActionService', () => {
          expect(() => TestBed.inject(DynamicFormActionService)).toThrowError(/NullInjectorError/);
        });
      });
    });
  });

  describe('with DYNAMIC_FORM_LIBRARY using', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      {
        name: 'DynamicFormsModule',
        def: { imports: [DynamicFormsModule], providers: [{ provide: DYNAMIC_FORM_LIBRARY, useValue: dynamicFormLibrary }] },
      },
      { name: 'provideDynamicForms', def: { providers: provideDynamicForms(dynamicFormLibrary) } },
    ];

    testModules.forEach(testModule => {
      describe(`${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
          expect(library).toEqual(dynamicFormLibrary);
        }));

        it('provides DynamicFormLibraryService', inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
          expect(service).toBeTruthy();
          expect(service.library).toEqual(dynamicFormLibrary);
          expect(service.libraryNames).toEqual(['core']);
        }));

        it('does not provide DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_ELEMENT_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_FIELD_TYPE_CONFIG', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_INPUT_TYPE_CONFIG', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_INPUT_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG)).toThrowError(/NullInjectorError/);
        });

        it('does not provide DYNAMIC_FORM_VALIDATION_CONFIGS', () => {
          expect(() => TestBed.inject(DYNAMIC_FORM_VALIDATION_CONFIGS)).toThrowError(/NullInjectorError/);
        });

        it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
          expect(service).toBeTruthy();
          expect(service.actionTypes.length).toBe(0);
          expect(service.elementTypes.length).toBe(0);
          expect(service.fieldTypes.length).toBe(0);
          expect(service.fieldWrapperTypes.length).toBe(0);
          expect(service.inputTypes.length).toBe(0);
        }));

        it('provides DynamicFormLogger', inject([DynamicFormLogger], (service: DynamicFormLogger) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormBuilder', inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormExpressionBuilder', inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormEvaluationBuilder', inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormValidationBuilder', inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
          expect(service).toBeTruthy();
          expect(service.arrayValidatorTypes.length).toBe(0);
          expect(service.controlValidatorTypes.length).toBe(0);
          expect(service.dictionaryValidatorTypes.length).toBe(0);
          expect(service.groupValidatorTypes.length).toBe(0);
        }));

        it('provides DynamicFormValidationService', inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
          expect(service).toBeTruthy();
          expect(service.validationConfig).toEqual({
            defaultMessage: undefined,
            messages: {},
            aliases: {},
            libraryName: dynamicFormLibrary.name,
          });
        }));

        it('provides DynamicFormComponentFactory', inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
          expect(service).toBeTruthy();
          expect(service.handlers.length).toBe(0);
        }));
      });
    });
  });

  describe('with DYNAMIC_FORM_LIBRARY and default features using', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      {
        name: 'DynamicFormsModule',
        def: {
          imports: [DynamicFormsModule],
          providers: [
            { provide: DYNAMIC_FORM_LIBRARY, useValue: dynamicFormLibrary },
            ...importDynamicFormsProviders(...dynamicFormsDefaultFeatures),
          ],
        },
      },
      { name: 'provideDynamicForms', def: { providers: provideDynamicForms(dynamicFormLibrary, ...dynamicFormsDefaultFeatures) } },
      { name: 'provideDynamicForms', def: { providers: provideDynamicFormsWithDefaultFeatures(dynamicFormLibrary) } },
    ];

    testModules.forEach(testModule => {
      describe(`${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
          expect(library).toEqual(dynamicFormLibrary);
        }));

        it('provides DynamicFormLibraryService', inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
          expect(service).toBeTruthy();
          expect(service.library).toEqual(dynamicFormLibrary);
          expect(service.libraryNames).toEqual(['core']);
        }));

        it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
          expect(service).toBeTruthy();
          expect(service.actionTypes.length).toBe(0);
          expect(service.elementTypes.length).toBe(3);
          expect(service.fieldTypes.length).toBe(4);
          expect(service.fieldWrapperTypes.length).toBe(0);
          expect(service.inputTypes.length).toBe(0);
        }));

        it('provides DynamicFormLogger', inject([DynamicFormLogger], (service: DynamicFormLogger) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormBuilder', inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormExpressionBuilder', inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormEvaluationBuilder', inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormValidationBuilder', inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
          expect(service).toBeTruthy();
          expect(service.arrayValidatorTypes.length).toBe(3);
          expect(service.controlValidatorTypes.length).toBe(7);
          expect(service.dictionaryValidatorTypes.length).toBe(3);
          expect(service.groupValidatorTypes.length).toBe(3);
        }));

        it('provides DynamicFormValidationService', inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
          expect(service).toBeTruthy();
          expect(service.validationConfig).toEqual({
            defaultMessage: undefined,
            messages: {},
            aliases: {},
            libraryName: dynamicFormLibrary.name,
          });
        }));

        it('provides DynamicFormComponentFactory', inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
          expect(service).toBeTruthy();
        }));

        it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
          expect(service).toBeTruthy();
          expect(service.handlers.length).toBe(18);
        }));
      });
    });
  });
});
