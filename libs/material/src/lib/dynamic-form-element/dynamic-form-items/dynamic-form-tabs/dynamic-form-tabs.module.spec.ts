import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { matDynamicFormTabsType, withMatDynamicFormTabs } from './dynamic-form-tabs.module';

describe('withMatDynamicFormTabs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(withMatDynamicFormTabs()),
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(matDynamicFormTabsType);
  }));
});
