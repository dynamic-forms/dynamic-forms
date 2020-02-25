import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionHandlerTypes, DYNAMIC_FORM_ACTION_HANDLER_TYPES } from '../dynamic-form-action/dynamic-form-action-handler-type';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormResetActionType, dynamicFormResetDefaultActionType, dynamicFormValidateActionType } from '../dynamic-form-field/dynamic-form-field.module';
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
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_ACTION_HANDLER_TYPES',
    inject([DYNAMIC_FORM_ACTION_HANDLER_TYPES], (types: DynamicFormActionHandlerTypes) => {
      expect(types.length).toBe(3);
      expect(types[0]).toEqual(dynamicFormResetActionType);
      expect(types[0].handler).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
      expect(types[1]).toEqual(dynamicFormResetDefaultActionType);
      expect(types[1].handler).toEqual(jasmine.any(Function));
      expect(types[1].libraryName).toEqual(dynamicFormLibrary.name);
      expect(types[2]).toEqual(dynamicFormValidateActionType);
      expect(types[2].handler).toEqual(jasmine.any(Function));
      expect(types[2].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
