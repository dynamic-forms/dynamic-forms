import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { bsDynamicFormTextareaType, BsDynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('BsDynamicFormTextareaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormTextareaModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_TYPES',
    inject([DYNAMIC_FORM_INPUT_TYPES], (types: DynamicFormInputTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(bsDynamicFormTextareaType);
      expect(types[0].libraryName).toEqual(bsDynamicFormLibrary.name);
    })
  );
});
