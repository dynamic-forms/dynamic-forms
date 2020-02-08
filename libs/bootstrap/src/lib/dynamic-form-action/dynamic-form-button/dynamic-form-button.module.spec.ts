import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '@dynamic-forms/core';
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

  it('provides DYNAMIC_FORM_ACTION_TYPES',
    inject([DYNAMIC_FORM_ACTION_TYPES], (types: DynamicFormActionTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(bsDynamicFormButtonType);
      expect(types[0].libraryName).toEqual(bsDynamicFormLibrary.name);
    })
  );
});
