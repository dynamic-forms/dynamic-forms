import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputConfig, DYNAMIC_FORM_INPUT_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormComboboxType, BsDynamicFormComboboxModule } from './dynamic-form-combobox.module';

describe('BsDynamicFormComboboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormComboboxModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_CONFIG',
    inject([DYNAMIC_FORM_INPUT_CONFIG], (config: DynamicFormInputConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormComboboxType);
    })
  );
});
