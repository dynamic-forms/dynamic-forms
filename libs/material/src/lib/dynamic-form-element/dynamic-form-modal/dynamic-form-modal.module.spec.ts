import { inject, waitForAsync, TestBed } from '@angular/core/testing';
import { DynamicFormElementTypeConfig, DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormModalType, MatDynamicFormModalModule } from './dynamic-form-modal.module';

describe('MatDynamicFormModalModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormModalModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormModalType);
    })
  );
});
