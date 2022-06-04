import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormField } from './dynamic-form-field';
import {
  dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler, dynamicFormFieldResetEmptyHandler,
  dynamicFormFieldValidateHandler, dynamicFormSubmitHandler, DynamicFormFieldModule,
} from './dynamic-form-field.module';

describe('DynamicFormFieldModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormFieldModule,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handlers = service.handlers;

      expect(handlers.length).toBe(8);
      expect(handlers[3]).toEqual(dynamicFormFieldResetHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[4]).toEqual(dynamicFormFieldResetEmptyHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5]).toEqual(dynamicFormFieldResetDefaultHandler);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[6]).toEqual(dynamicFormFieldValidateHandler);
      expect(handlers[6].func).toEqual(jasmine.any(Function));
      expect(handlers[6].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[7]).toEqual(dynamicFormSubmitHandler);
      expect(handlers[7].func).toEqual(jasmine.any(Function));
      expect(handlers[7].libraryName).toEqual(dynamicFormLibrary.name);
    }),
  );

  it('handler calls reset of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'reset');
      const field = { reset: () => {} } as DynamicFormField;

      spyOn(field, 'reset');

      handler.func(field, null);

      expect(field.reset).toHaveBeenCalled();
    }),
  );

  it('handler calls resetEmpty of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'resetEmpty');
      const field = { resetEmpty: () => {} } as DynamicFormField;

      spyOn(field, 'resetEmpty');

      handler.func(field, null);

      expect(field.resetEmpty).toHaveBeenCalled();
    }),
  );

  it('handler calls resetDefault of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'resetDefault');
      const field = { resetDefault: () => {} } as DynamicFormField;

      spyOn(field, 'resetDefault');

      handler.func(field, null);

      expect(field.resetDefault).toHaveBeenCalled();
    }),
  );

  it('handler calls validate of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'validate');
      const field = { validate: () => {} } as DynamicFormField;

      spyOn(field, 'validate');

      handler.func(field, null);

      expect(field.validate).toHaveBeenCalled();
    }),
  );

  it('handler returns root form',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const root = { submit: () => {} } as DynamicForm;
      const action = { root } as DynamicFormAction;

      const form = handler.elementFunc(action);

      expect(form).toBe(root);
    }),
  );

  it('handler calls submit of form',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const form = { submit: () => {} } as DynamicForm;
      const field = {} as DynamicFormField;
      const action = { root: form, parent: field as DynamicFormElement } as DynamicFormAction;

      spyOn(form, 'submit');

      handler.func(form, action);

      expect(form.submit).toHaveBeenCalled();
    }),
  );

  it('handler calls closeDialog of parent action and submit of form',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const form = { submit: () => {} } as DynamicForm;
      const dialog = {} as DynamicForm;
      const dialogAction = { dialog, dialogOpen: true, closeDialog: () => {} } as DynamicFormAction;
      const action = { root: form, parent: dialogAction as DynamicFormElement } as DynamicFormAction;

      spyOn(form, 'submit');
      spyOn(dialogAction, 'closeDialog');

      handler.func(form, action);

      expect(form.submit).toHaveBeenCalled();
      expect(dialogAction.closeDialog).toHaveBeenCalled();
    }),
  );
});
