import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG, DynamicFormFieldWrapperTypeConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlLabelModule, bsDynamicFormControlLabelType } from './dynamic-form-control-label.module';

describe('BsDynamicFormControlLabelModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlLabelModule,
      ],
    });
  });

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG], (config: DynamicFormFieldWrapperTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormControlLabelType);
    }),
  );
});
