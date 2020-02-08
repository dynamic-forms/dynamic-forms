import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormArrayType, DynamicFormArrayModule } from './dynamic-form-array.module';

describe('DynamicFormArrayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormArrayModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DYNAMIC_FORM_FIELD_TYPES], (types: DynamicFormFieldTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormArrayType);
      expect(types[0].factory).toBeDefined();
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
