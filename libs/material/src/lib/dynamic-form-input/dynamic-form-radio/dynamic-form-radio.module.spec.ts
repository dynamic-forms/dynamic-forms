import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypeConfig, DYNAMIC_FORM_INPUT_TYPE_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormRadioType, MatDynamicFormRadioModule } from './dynamic-form-radio.module';

describe('MatDynamicFormRadioModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormRadioModule
      ]
    });
  });

  it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormRadioType);
    })
  );
});
