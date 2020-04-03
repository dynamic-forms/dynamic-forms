import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionConfig, DYNAMIC_FORM_ACTION_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormButtonType, BsDynamicFormButtonModule } from './dynamic-form-button.module';

describe('BsDynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormButtonModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ACTION_CONFIG',
    inject([DYNAMIC_FORM_ACTION_CONFIG], (config: DynamicFormActionConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormButtonType);
    })
  );
});
