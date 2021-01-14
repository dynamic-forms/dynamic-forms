import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormIconType, MatDynamicFormIconModule } from './dynamic-form-icon.module';

describe('MatDynamicFormIconModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormIconModule
      ]
    });
  });

  it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (types: DynamicFormActionTypeConfig) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormIconType);
    })
  );
});
