import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from '@dynamic-forms/core';
import { BsDynamicFormTabsModule, bsDynamicFormTabsType } from './dynamic-form-tabs.module';

describe('BsDynamicFormTabsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormTabsModule],
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(bsDynamicFormTabsType);
  }));
});
