import { TestBed, inject } from '@angular/core/testing';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from './dynamic-form-element-type-config';
import { DynamicFormElementModule, dynamicFormElementTypes } from './dynamic-form-element.module';

describe('DynamicFormElementModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormElementModule],
    });
  });

  it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toBe(dynamicFormElementTypes);
    }),
  );
});
