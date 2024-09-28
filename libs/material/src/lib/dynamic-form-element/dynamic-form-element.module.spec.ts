import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { matDynamicFormElementTypes, withMatDynamicFormElementDefaultFeatures } from './dynamic-form-element.module';

describe('withMatDynamicFormElementDefaultFeatures', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(...withMatDynamicFormElementDefaultFeatures()),
    });
  });

  it('provides  DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(3);
    expect(config[0]).toEqual(matDynamicFormElementTypes[0]);
    expect(config[1]).toEqual(matDynamicFormElementTypes[1]);
    expect(config[2]).toEqual(matDynamicFormElementTypes[2]);
  }));
});
