import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { BsDynamicFormActionModule, bsDynamicFormActionTypes } from './dynamic-form-action.module';

describe('BsDynamicFormActionModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormActionModule,
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toBe(bsDynamicFormActionTypes);
    }),
  );
});
