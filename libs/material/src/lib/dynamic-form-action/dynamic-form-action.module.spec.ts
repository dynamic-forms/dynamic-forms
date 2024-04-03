import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { MatDynamicFormActionModule, matDynamicFormActionTypes, withMatDynamicFormActionDefaultFeatures } from './dynamic-form-action.module';

describe('MatDynamicFormActionModule', () => {
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'MatDynamicFormActionModule', def: { imports: [MatDynamicFormActionModule] } },
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
      expect(config.length).toBe(4);
      expect(config[2]).toEqual(matDynamicFormActionTypes[0]);
      expect(config[3]).toEqual(matDynamicFormActionTypes[1]);
    }));
  });
});
