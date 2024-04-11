import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import {
  BsDynamicFormElementModule,
  bsDynamicFormElementTypes,
  withBsDynamicFormElementDefaultFeatures,
} from './dynamic-form-element.module';

describe('BsDynamicFormElementModule', () => {
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'BsDynamicFormElementModule', def: { imports: [BsDynamicFormElementModule] } },
    {
      name: 'withBsDynamicFormElementDefaultFeatures',
      def: { providers: importDynamicFormsProviders(...withBsDynamicFormElementDefaultFeatures()) },
    },
  ];

  testModules.forEach(testModule => {
    beforeEach(() => {
      TestBed.configureTestingModule(testModule.def);
    });

    it('provides  DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(6);
      expect(config[3]).toEqual(bsDynamicFormElementTypes[0]);
      expect(config[4]).toEqual(bsDynamicFormElementTypes[1]);
      expect(config[5]).toEqual(bsDynamicFormElementTypes[2]);
    }));
  });
});
