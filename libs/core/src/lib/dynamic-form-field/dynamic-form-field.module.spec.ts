import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from '../dynamic-form-action/dynamic-form-action-handler';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler, dynamicFormFieldValidateHandler, DynamicFormFieldModule } from './dynamic-form-field.module';

describe('DynamicFormGroupModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormFieldModule
      ]
    });
  }));

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
