import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { bsDynamicFormControlHintsType, BsDynamicFormControlHintsModule } from './dynamic-form-control-hints.module';

describe('BsDynamicFormControlHintsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlHintsModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPES',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPES], (types: DynamicFormFieldWrapperTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(bsDynamicFormControlHintsType);
      expect(types[0].libraryName).toEqual(bsDynamicFormLibrary.name);
    })
  );
});
