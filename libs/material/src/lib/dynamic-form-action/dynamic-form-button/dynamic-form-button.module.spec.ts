import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypeConfig, DYNAMIC_FORM_ACTION_TYPE_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormButtonType, MatDynamicFormButtonModule } from './dynamic-form-button.module';

describe('MatDynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormButtonModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (types: DynamicFormActionTypeConfig) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormButtonType);
    })
  );
});
