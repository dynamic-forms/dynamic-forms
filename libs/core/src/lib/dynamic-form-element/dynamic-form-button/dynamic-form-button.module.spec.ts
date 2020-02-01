import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element-type';
import { dynamicFormButtonType, DynamicFormButtonModule } from './dynamic-form-button.module';

describe('DynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormButtonModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPES',
    inject([DYNAMIC_FORM_ELEMENT_TYPES], (types: DynamicFormElementTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormButtonType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
