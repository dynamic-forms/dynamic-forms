import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionHandlerTypes, DYNAMIC_FORM_ACTION_HANDLER_TYPES } from '../dynamic-form-action/dynamic-form-action-handler-type';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { dynamicFormResetActionType, dynamicFormResetDefaultActionType, dynamicFormValidateActionType, DynamicFormFieldModule } from './dynamic-form-field.module';

describe('DynamicFormGroupModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormFieldModule
      ]
    });
  }));

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
