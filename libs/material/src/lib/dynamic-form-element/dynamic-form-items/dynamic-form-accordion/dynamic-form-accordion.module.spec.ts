import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from '@dynamic-forms/core';
import { MatDynamicFormAccordionModule, matDynamicFormAccordionType } from './dynamic-form-accordion.module';

describe('MatDynamicFormAccordionModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDynamicFormAccordionModule],
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
    expect(config.length).toBe(1);
    expect(config[0]).toEqual(matDynamicFormAccordionType);
  }));
});
