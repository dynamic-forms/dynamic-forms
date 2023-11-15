import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG, DynamicFormFieldWrapperTypeConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlErrorsModule, bsDynamicFormControlErrorsType } from './dynamic-form-control-errors.module';

describe('BsDynamicFormControlErrorsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormControlErrorsModule],
    });
  });

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG],
    (config: DynamicFormFieldWrapperTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlErrorsType);
    },
  ));
});
