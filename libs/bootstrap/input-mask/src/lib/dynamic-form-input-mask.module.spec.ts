import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { bsDynamicFormLibrary } from '@dynamic-forms/bootstrap';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig, provideDynamicForms } from '@dynamic-forms/core';
import { DynamicFormInputMaskConverterService } from '@dynamic-forms/core/input-mask';
import { withBsDynamicFormInputMaskConverters } from './dynamic-form-input-mask-converter';
import { bsDynamicFormInputMaskType, withBsDynamicFormInputMask } from './dynamic-form-input-mask.module';

describe('BsDynamicFormInputMaskModule', () => {
  describe('withBsDynamicFormInputMask', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      {
        name: 'provideDynamicForms',
        def: { providers: provideDynamicForms(bsDynamicFormLibrary, withBsDynamicFormInputMask()) },
      },
    ];

    testModules.forEach(testModule => {
      describe(`using ${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
          expect(config.length).toBe(1);
          expect(config[0]).toEqual(bsDynamicFormInputMaskType);
        }));

        it('provides DynamicFormInputMaskConverterService with empty converterMap', inject(
          [DynamicFormInputMaskConverterService],
          (service: DynamicFormInputMaskConverterService) => {
            expect(service).toBeDefined();
            expect(service.converterMap.size).toBe(0);
          },
        ));
      });
    });
  });

  describe('withBsDynamicFormInputMaskConverters', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      {
        name: 'provideDynamicForms',
        def: { providers: provideDynamicForms(bsDynamicFormLibrary, withBsDynamicFormInputMask(), withBsDynamicFormInputMaskConverters()) },
      },
    ];

    testModules.forEach(testModule => {
      describe(`using ${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
          expect(config.length).toBe(1);
          expect(config[0]).toEqual(bsDynamicFormInputMaskType);
        }));

        it('provides DynamicFormInputMaskConverterService with non-empty converterMap', inject(
          [DynamicFormInputMaskConverterService],
          (service: DynamicFormInputMaskConverterService) => {
            expect(service).toBeDefined();
            expect(service.converterMap.size).toBe(7);
          },
        ));
      });
    });
  });
});
