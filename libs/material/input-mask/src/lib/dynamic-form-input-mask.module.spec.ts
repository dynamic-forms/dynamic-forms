import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig, provideDynamicForms } from '@dynamic-forms/core';
import { DynamicFormInputMaskConverterService } from '@dynamic-forms/core/input-mask';
import { matDynamicFormLibrary } from '@dynamic-forms/material';
import { withMatDynamicFormInputMaskConverters } from './dynamic-form-input-mask-converter';
import { MatDynamicFormInputMaskModule, matDynamicFormInputMaskType, withMatDynamicFormInputMask } from './dynamic-form-input-mask.module';

describe('MatDynamicFormInputMaskModule', () => {
  describe('withMatDynamicFormInputMask', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      {
        name: 'MatDynamicFormInputMaskModule',
        def: {
          imports: [MatDynamicFormInputMaskModule],
          providers: provideDynamicForms(matDynamicFormLibrary),
        },
      },
      {
        name: 'provideDynamicForms',
        def: { providers: provideDynamicForms(matDynamicFormLibrary, withMatDynamicFormInputMask()) },
      },
    ];

    testModules.forEach(testModule => {
      describe(`${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
          expect(config.length).toBe(1);
          expect(config[0]).toEqual(matDynamicFormInputMaskType);
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

  describe('withMatDynamicFormInputMaskConverters', () => {
    const testModules: { name: string; def: TestModuleMetadata }[] = [
      {
        name: 'MatDynamicFormInputMaskModule',
        def: {
          imports: [MatDynamicFormInputMaskModule],
          providers: provideDynamicForms(matDynamicFormLibrary, withMatDynamicFormInputMaskConverters()),
        },
      },
      {
        name: 'provideDynamicForms',
        def: {
          providers: provideDynamicForms(matDynamicFormLibrary, withMatDynamicFormInputMask(), withMatDynamicFormInputMaskConverters()),
        },
      },
    ];

    testModules.forEach(testModule => {
      describe(`using ${testModule.name}`, () => {
        beforeEach(() => {
          TestBed.configureTestingModule(testModule.def);
        });

        it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
          expect(config.length).toBe(1);
          expect(config[0]).toEqual(matDynamicFormInputMaskType);
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
