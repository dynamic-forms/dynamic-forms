import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { matDynamicFormModalType, withMatDynamicFormModal } from './dynamic-form-modal.module';

describe('withMatDynamicFormModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(withMatDynamicFormModal()),
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(matDynamicFormModalType);
  }));
});
