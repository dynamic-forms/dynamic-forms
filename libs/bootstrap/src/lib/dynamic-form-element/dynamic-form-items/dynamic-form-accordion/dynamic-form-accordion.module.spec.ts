import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig, importDynamicFormsProviders } from '@dynamic-forms/core';
import { bsDynamicFormAccordionType, withBsDynamicFormAccordion } from './dynamic-form-accordion.module';

describe('withBsDynamicFormAccordion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: importDynamicFormsProviders(withBsDynamicFormAccordion()),
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(bsDynamicFormAccordionType);
  }));
});
