import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { MatDynamicFormElementModule, matDynamicFormElementTypes, withMatDynamicFormElementDefaultFeatures } from './dynamic-form-element.module';

describe('MatDynamicFormElementModule', () => {
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'MatDynamicFormElementModule', def: { imports: [MatDynamicFormElementModule] } },
    {
      name: 'withMatDynamicFormElementDefaultFeatures',
      def: { providers: importDynamicFormsProviders(...withMatDynamicFormElementDefaultFeatures()) },
    },
  ];

  testModules.forEach(testModule => {
    beforeEach(() => {
      TestBed.configureTestingModule(testModule.def);
    });

    it('provides  DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(6);
      expect(config[3]).toEqual(matDynamicFormElementTypes[0]);
      expect(config[4]).toEqual(matDynamicFormElementTypes[1]);
      expect(config[5]).toEqual(matDynamicFormElementTypes[2]);
    }));
  });
});
