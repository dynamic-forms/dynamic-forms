import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIGS } from '@dynamic-forms/core';
import { bsDynamicFormRadioConfig, BsDynamicFormRadioModule } from './dynamic-form-radio.module';

describe('BsDynamicFormRadioModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormRadioModule
      ]
    });
  }));

  it('provides DynamicFormConfig',
    inject([DYNAMIC_FORM_CONFIGS], (configs: DynamicFormConfig[]) => {
      expect(configs.length).toBe(1);
      expect(configs[0]).toEqual(bsDynamicFormRadioConfig);
    })
  );
});
