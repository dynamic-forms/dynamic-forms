import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypeConfig, DYNAMIC_FORM_INPUT_TYPE_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormInputTypes, MatDynamicFormInputModule } from './dynamic-form-input.module';

describe('MatDynamicFormInputModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MatDynamicFormInputModule] });
  });

  it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormInputTypes);
    }),
  );
});
