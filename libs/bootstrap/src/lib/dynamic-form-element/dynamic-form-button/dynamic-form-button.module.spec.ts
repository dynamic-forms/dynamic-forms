import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { bsDynamicFormButtonType, BsDynamicFormButtonModule } from './dynamic-form-button.module';

describe('BsDynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormButtonModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPES',
    inject([DYNAMIC_FORM_ELEMENT_TYPES], (types: DynamicFormElementTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(bsDynamicFormButtonType);
      expect(types[0].libraryName).toEqual(bsDynamicFormLibrary.name);
    })
  );
});
