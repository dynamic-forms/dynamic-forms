import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { MatDynamicFormActionModule, matDynamicFormActionTypes } from './dynamic-form-action.module';

describe('MatDynamicFormActionModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormActionModule,
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toBe(matDynamicFormActionTypes);
    }),
  );
});
