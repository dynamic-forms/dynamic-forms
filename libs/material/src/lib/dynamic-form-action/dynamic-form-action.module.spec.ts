import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { matDynamicFormActionTypes, withMatDynamicFormActionDefaultFeatures } from './dynamic-form-action.module';

describe('MatDynamicFormActionModule', () => {
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    {
      name: 'withMatDynamicFormActions',
      def: { providers: importDynamicFormsProviders(...withMatDynamicFormActionDefaultFeatures()) },
    },
  ];

  testModules.forEach(testModule => {
    beforeEach(() => {
      TestBed.configureTestingModule(testModule.def);
    });

    it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG', inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(2);
      expect(config[0]).toEqual(matDynamicFormActionTypes[0]);
      expect(config[1]).toEqual(matDynamicFormActionTypes[1]);
    }));
  });
});
