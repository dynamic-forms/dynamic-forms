import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperConfig, DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormControlErrorsType, BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors.module';

describe('BsDynamicFormControlErrorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlErrorsModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_CONFIG',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_CONFIG], (config: DynamicFormFieldWrapperConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlErrorsType);
    })
  );
});
