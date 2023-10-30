import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG, DynamicFormFieldWrapperTypeConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsModule, bsDynamicFormControlHintsType } from './dynamic-form-control-hints.module';

describe('BsDynamicFormControlHintsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlHintsModule,
      ],
    });
  });

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG], (config: DynamicFormFieldWrapperTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlHintsType);
    }),
  );
});
