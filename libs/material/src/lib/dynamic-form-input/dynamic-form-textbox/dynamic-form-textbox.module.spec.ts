import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { matDynamicFormTextboxType, MatDynamicFormTextboxModule } from './dynamic-form-textbox.module';

describe('MatDynamicFormTextboxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTextboxModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_TYPES',
    inject([DYNAMIC_FORM_INPUT_TYPES], (types: DynamicFormInputTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormTextboxType);
      expect(types[0].libraryName).toEqual(matDynamicFormLibrary.name);
    })
  );
});
