import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { bsDynamicFormControlErrorsType, BsDynamicFormControlErrorsModule } from './dynamic-form-control-errors.module';

describe('BsDynamicFormControlErrorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormControlErrorsModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPES',
    inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPES], (types: DynamicFormFieldWrapperTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(bsDynamicFormControlErrorsType);
      expect(types[0].libraryName).toEqual(bsDynamicFormLibrary.name);
    })
  );
});
