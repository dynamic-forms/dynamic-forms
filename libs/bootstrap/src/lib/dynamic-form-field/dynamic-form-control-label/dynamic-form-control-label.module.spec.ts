import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperTypeConfig, DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormControlLabelType, BsDynamicFormControlLabelModule } from './dynamic-form-control-label.module';

describe('BsDynamicFormControlLabelModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelModule
      ]
    });
  });

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG], (config: DynamicFormFieldWrapperTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlLabelType);
    })
  );
});
