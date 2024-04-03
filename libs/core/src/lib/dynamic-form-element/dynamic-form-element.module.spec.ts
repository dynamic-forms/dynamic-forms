import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from './dynamic-form-element-type-config';
import { DynamicFormElementModule, dynamicFormElementTypes, withDynamicFormElementDefaultFeatures } from './dynamic-form-element.module';

describe('DynamicFormElementModule', () => {
  const testModules: { name: string; def: TestModuleMetadata }[] = [
    { name: 'DynamicFormElementModule', def: { imports: [DynamicFormElementModule] } },
    {
      name: 'withDynamicFormElementDefaultFeatures',
      def: { providers: importDynamicFormsProviders(...withDynamicFormElementDefaultFeatures()) },
    },
  ];

  testModules.forEach(testModule => {
    describe(`using ${testModule.name}`, () => {
      beforeEach(() => {
        TestBed.configureTestingModule(testModule.def);
      });

      it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
        expect(config.length).toBe(3);
        expect(config).toEqual(dynamicFormElementTypes);
      }));
    });
  });
});
