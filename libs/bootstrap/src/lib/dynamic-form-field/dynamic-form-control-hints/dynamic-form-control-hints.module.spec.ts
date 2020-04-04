import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperTypeConfig, DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormControlHintsType, BsDynamicFormControlHintsModule } from './dynamic-form-control-hints.module';

describe('BsDynamicFormControlHintsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlHintsModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG], (config: DynamicFormFieldWrapperTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlHintsType);
    })
  );
});
