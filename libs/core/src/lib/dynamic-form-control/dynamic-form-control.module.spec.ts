import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from '../dynamic-form-action/dynamic-form-action-handler';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler, dynamicFormFieldValidateHandler } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormControlType, DynamicFormControlModule } from './dynamic-form-control.module';

describe('DynamicFormControlModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormControlModule
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DYNAMIC_FORM_FIELD_TYPES], (types: DynamicFormFieldTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormControlType);
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DYNAMIC_FORM_ACTION_HANDLERS], (handlers: DynamicFormActionHandlers) => {
      expect(handlers.length).toBe(3);
      expect(handlers[0]).toEqual(dynamicFormFieldResetHandler);
      expect(handlers[0].func).toEqual(jasmine.any(Function));
      expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[1]).toEqual(dynamicFormFieldResetDefaultHandler);
      expect(handlers[1].func).toEqual(jasmine.any(Function));
      expect(handlers[1].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[2]).toEqual(dynamicFormFieldValidateHandler);
      expect(handlers[2].func).toEqual(jasmine.any(Function));
      expect(handlers[2].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );
});
