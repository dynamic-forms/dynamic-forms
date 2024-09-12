import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { bsDynamicFormInputTypes, withBsDynamicFormInputDefaultFeatures } from './dynamic-form-input.module';

describe('BsDynamicFormInputModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: importDynamicFormsProviders(...withBsDynamicFormInputDefaultFeatures()) });
  });

  it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
    expect(config.length).toBe(11);
    expect(config).toEqual(bsDynamicFormInputTypes);
  }));
});
