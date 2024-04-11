import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig } from '@dynamic-forms/core';
import { BsDynamicFormInputModule, bsDynamicFormInputTypes } from './dynamic-form-input.module';

describe('BsDynamicFormInputModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BsDynamicFormInputModule] });
  });

  it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
    expect(config.length).toBe(11);
    expect(config).toEqual(bsDynamicFormInputTypes);
  }));
});
