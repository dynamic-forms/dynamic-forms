import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputConfig, DYNAMIC_FORM_INPUT_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormSelectType, BsDynamicFormSelectModule } from './dynamic-form-select.module';

describe('BsDynamicFormSelectModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormSelectModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_CONFIG',
    inject([DYNAMIC_FORM_INPUT_CONFIG], (config: DynamicFormInputConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormSelectType);
    })
  );
});
