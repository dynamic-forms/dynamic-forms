import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { bsDynamicFormModalType, withBsDynamicFormModal } from './dynamic-form-modal.module';

describe('withBsDynamicFormModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(withBsDynamicFormModal()),
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(bsDynamicFormModalType);
  }));
});
