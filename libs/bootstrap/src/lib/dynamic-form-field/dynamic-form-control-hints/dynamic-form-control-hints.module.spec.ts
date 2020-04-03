import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperConfig, DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormControlHintsType, BsDynamicFormControlHintsModule } from './dynamic-form-control-hints.module';

describe('BsDynamicFormControlHintsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlHintsModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_CONFIG',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_CONFIG], (config: DynamicFormFieldWrapperConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlHintsType);
    })
  );
});
