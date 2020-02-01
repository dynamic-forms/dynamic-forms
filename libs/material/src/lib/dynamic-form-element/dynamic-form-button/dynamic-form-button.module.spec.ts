import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { matDynamicFormButtonType, MatDynamicFormButtonModule } from './dynamic-form-button.module';

describe('MatDynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormButtonModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPES',
    inject([DYNAMIC_FORM_ELEMENT_TYPES], (types: DynamicFormElementTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormButtonType);
      expect(types[0].libraryName).toEqual(matDynamicFormLibrary.name);
    })
  );
});
