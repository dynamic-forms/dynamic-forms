import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { matDynamicFormSelectType, MatDynamicFormSelectModule } from './dynamic-form-select.module';

describe('MatDynamicFormSelectModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormSelectModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_INPUT_TYPES',
    inject([DYNAMIC_FORM_INPUT_TYPES], (types: DynamicFormInputTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(matDynamicFormSelectType);
      expect(types[0].libraryName).toEqual(matDynamicFormLibrary.name);
    })
  );
});
