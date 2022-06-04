import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { bsDynamicFormIconType, BsDynamicFormIconModule } from './dynamic-form-icon.module';

describe('BsDynamicFormIconModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormIconModule,
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(bsDynamicFormIconType);
    }),
  );
});
