import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { BsDynamicFormActionModule, bsDynamicFormActionTypes, withBsDynamicFormActionDefaultFeatures } from './dynamic-form-action.module';

describe('BsDynamicFormActionModule', () => {
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'BsDynamicFormActionModule', def: { imports: [BsDynamicFormActionModule] } },
    {
      name: 'withBsDynamicFormActionDefaultFeatures',
      def: { providers: importDynamicFormsProviders(...withBsDynamicFormActionDefaultFeatures()) },
    },
  ];

  testModules.forEach(testModule => {
    beforeEach(() => {
      TestBed.configureTestingModule(testModule.def);
    });

    it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG', inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(4);
      expect(config[2]).toEqual(bsDynamicFormActionTypes[0]);
      expect(config[3]).toEqual(bsDynamicFormActionTypes[1]);
    }));
  });
});
