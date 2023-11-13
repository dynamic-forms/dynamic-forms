import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig } from '@dynamic-forms/core';
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
