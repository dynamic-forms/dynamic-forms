import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormElementTypeConfig, DYNAMIC_FORM_ELEMENT_TYPE_CONFIG } from '@dynamic-forms/core';
import { matDynamicFormAccordionType, MatDynamicFormAccordionModule } from './dynamic-form-accordion.module';

describe('MatDynamicFormAccordionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormAccordionModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(matDynamicFormAccordionType);
    })
  );
});
