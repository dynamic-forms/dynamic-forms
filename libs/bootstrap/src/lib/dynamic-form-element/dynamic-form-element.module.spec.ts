import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { bsDynamicFormElementTypes, withBsDynamicFormElementDefaultFeatures } from './dynamic-form-element.module';

describe('withBsDynamicFormElementDefaultFeatures', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(...withBsDynamicFormElementDefaultFeatures()),
    });
  });

  it('provides  DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(3);
    expect(config[0]).toEqual(bsDynamicFormElementTypes[0]);
    expect(config[1]).toEqual(bsDynamicFormElementTypes[1]);
    expect(config[2]).toEqual(bsDynamicFormElementTypes[2]);
  }));
});
