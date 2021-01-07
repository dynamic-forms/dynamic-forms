import { inject, waitForAsync, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypeConfig, DYNAMIC_FORM_INPUT_TYPE_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormCheckboxType, BsDynamicFormCheckboxModule } from './dynamic-form-checkbox.module';

describe('BsDynamicFormCheckboxModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormCheckboxModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormCheckboxType);
    })
  );
});
