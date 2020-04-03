import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputConfig, DYNAMIC_FORM_INPUT_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormRadioType, MatDynamicFormRadioModule } from './dynamic-form-radio.module';

describe('MatDynamicFormRadioModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormRadioModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_CONFIG',
    inject([DYNAMIC_FORM_INPUT_CONFIG], (config: DynamicFormInputConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormRadioType);
    })
  );
});
