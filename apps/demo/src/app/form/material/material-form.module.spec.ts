import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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
  DynamicFormExpressionBuilder,
  DynamicFormIdBuilder,
  DynamicFormLibrary,
  DynamicFormLibraryService,
  DynamicFormValidationBuilder,
  DynamicFormValidationService,
  dynamicFormValidationConfig,
} from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '@dynamic-forms/material';
import { provideMaterialForm } from './material-form.module';

describe('MaterialFormModule', () => {
  const providers = [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()];
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'provideMaterialForm', def: { providers: [...providers, ...provideMaterialForm()] } },
  ];

  testModules.forEach(testModule => {
    describe(`using ${testModule.name}`, () => {
      beforeEach(() => {
        TestBed.configureTestingModule(testModule.def);
      });

      it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(matDynamicFormLibrary);
      }));

      it('provides DYNAMIC_FORM_THEME being undefined', inject([DYNAMIC_FORM_THEME], (theme: string) => {
        expect(theme).toBe('material');
      }));

      it('provides DYNAMIC_FORM_ID_BUILDER being undefined', inject([DYNAMIC_FORM_ID_BUILDER], (service: DynamicFormIdBuilder) => {
        expect(service).toBeTruthy();
      }));

      it('provides DynamicFormLibraryService', inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service).toBeTruthy();
        expect(service.library).toEqual(matDynamicFormLibrary);
        expect(service.libraryNames).toEqual(['material', 'core']);
      }));

      it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeTruthy();
        expect(service.actionTypes.length).toBe(2);
        expect(service.elementTypes.length).toBe(7);
        expect(service.fieldTypes.length).toBe(4);
        expect(service.fieldWrapperTypes.length).toBe(0);
        expect(service.inputTypes.length).toBe(12);
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
        expect(service.controlValidatorTypes.length).toBe(9);
        expect(service.dictionaryValidatorTypes.length).toBe(3);
        expect(service.groupValidatorTypes.length).toBe(3);
      }));

      it('provides DynamicFormValidationService', inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeTruthy();
        expect(service.validationConfig).toEqual({
          ...dynamicFormValidationConfig,
          aliases: {
            ...dynamicFormValidationConfig.aliases,
            matDatepickerMin: 'minDate',
            matDatepickerMax: 'maxDate',
          },
          libraryName: matDynamicFormLibrary.name,
        });
      }));

      it('provides DynamicFormComponentFactory', inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
        expect(service).toBeTruthy();
      }));

      it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service).toBeTruthy();
        expect(service.handlers.length).toBe(25);
      }));

      it('does not provide DynamicFormDateConverter', () => {
        expect(() => TestBed.inject(DynamicFormDateConverter)).toThrowError(/NullInjectorError/);
      });
    });
  });
});
