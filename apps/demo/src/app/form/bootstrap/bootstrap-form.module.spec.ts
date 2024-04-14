import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { bsDynamicFormLibrary } from '@dynamic-forms/bootstrap';
import {
  DYNAMIC_FORM_ID_BUILDER,
  DYNAMIC_FORM_LIBRARY,
  DYNAMIC_FORM_THEME,
  DynamicFormActionService,
  DynamicFormBuilder,
  DynamicFormComponentFactory,
  DynamicFormConfigService,
  DynamicFormExpressionBuilder,
  DynamicFormIdBuilder,
  DynamicFormLibrary,
  DynamicFormLibraryService,
  DynamicFormValidationBuilder,
  DynamicFormValidationService,
  dynamicFormValidationConfig,
} from '@dynamic-forms/core';
import { BootstrapFormModule, BootstrapFormModuleWorkaround } from './bootstrap-form.module';

describe('BootstrapFormModule', () => {
  const defaultImports = [HttpClientTestingModule];
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'BootstrapFormModule', def: { imports: [BootstrapFormModule, ...defaultImports] } },
    { name: 'BootstrapFormModuleWorkaround', def: { imports: [BootstrapFormModuleWorkaround, ...defaultImports] } },
  ];

  testModules.forEach(testModule => {
    describe(`using ${testModule.name}`, () => {
      beforeEach(() => {
        TestBed.configureTestingModule(testModule.def);
      });

      it('provides DYNAMIC_FORM_LIBRARY', inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(bsDynamicFormLibrary);
      }));

      it('provides DYNAMIC_FORM_THEME being undefined', inject([DYNAMIC_FORM_THEME], (theme: string) => {
        expect(theme).toBe('bootstrap');
      }));

      it('provides DYNAMIC_FORM_ID_BUILDER being undefined', inject([DYNAMIC_FORM_ID_BUILDER], (service: DynamicFormIdBuilder) => {
        expect(service).toBeTruthy();
      }));

      it('provides DynamicFormLibraryService', inject([DynamicFormLibraryService], (service: DynamicFormLibraryService) => {
        expect(service).toBeTruthy();
        expect(service.library).toEqual(bsDynamicFormLibrary);
        expect(service.libraryNames).toEqual(['bootstrap', 'core']);
      }));

      it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeTruthy();
        expect(service.actionTypes.length).toBe(2);
        expect(service.elementTypes.length).toBe(7);
        expect(service.fieldTypes.length).toBe(4);
        expect(service.fieldWrapperTypes.length).toBe(3);
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
        expect(service.validationConfig).toEqual({ ...dynamicFormValidationConfig, libraryName: bsDynamicFormLibrary.name });
      }));

      it('provides DynamicFormComponentFactory', inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
        expect(service).toBeTruthy();
      }));

      it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service).toBeTruthy();
        expect(service.handlers.length).toBe(25);
      }));
    });
  });
});
