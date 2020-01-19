import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element-type';
import { dynamicFormContainerType, DynamicFormContainerModule } from './dynamic-form-container.module';

describe('DynamicFormContainerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormContainerModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ELEMENT_TYPES',
    inject([DYNAMIC_FORM_ELEMENT_TYPES], (types: DynamicFormElementTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormContainerType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
