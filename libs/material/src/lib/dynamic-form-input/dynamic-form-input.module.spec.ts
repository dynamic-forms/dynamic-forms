import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig } from '@dynamic-forms/core';
import { MatDynamicFormInputModule, matDynamicFormInputTypes } from './dynamic-form-input.module';

describe('MatDynamicFormInputModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MatDynamicFormInputModule] });
  });

  it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(matDynamicFormInputTypes);
  }));
});
