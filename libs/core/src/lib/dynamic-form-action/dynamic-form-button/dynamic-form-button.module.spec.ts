import { async, inject, TestBed } from '@angular/core/testing';
import { dynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action-type';
import { dynamicFormButtonType, DynamicFormButtonModule } from './dynamic-form-button.module';

describe('DynamicFormButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormButtonModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_ACTION_TYPES',
    inject([DYNAMIC_FORM_ACTION_TYPES], (types: DynamicFormActionTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormButtonType);
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
