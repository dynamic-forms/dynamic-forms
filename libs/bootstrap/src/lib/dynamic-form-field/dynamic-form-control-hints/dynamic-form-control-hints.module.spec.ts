import { TestBed, inject } from '@angular/core/testing';
import {
  DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG,
  DynamicFormFieldWrapperTypeConfig,
  importDynamicFormsProviders,
} from '@dynamic-forms/core';
import { bsDynamicFormControlHintsType, withBsDynamicFormControlHints } from './dynamic-form-control-hints.module';

describe('BsDynamicFormControlHintsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(withBsDynamicFormControlHints()),
    });
  });

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG],
    (config: DynamicFormFieldWrapperTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlHintsType);
    },
  ));
});
