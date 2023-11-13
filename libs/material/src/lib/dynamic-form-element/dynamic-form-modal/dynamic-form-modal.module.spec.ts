import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from '@dynamic-forms/core';
import { MatDynamicFormModalModule, matDynamicFormModalType } from './dynamic-form-modal.module';

describe('MatDynamicFormModalModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormModalModule,
      ],
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormModalType);
    }),
  );
});
