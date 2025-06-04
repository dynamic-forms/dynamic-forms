import { TestBed, inject } from '@angular/core/testing';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormField } from './dynamic-form-field';
import {
  dynamicFormFieldClearHandler,
  dynamicFormFieldResetDefaultHandler,
  dynamicFormFieldResetEmptyHandler,
  dynamicFormFieldResetHandler,
  dynamicFormFieldValidateHandler,
  dynamicFormSubmitHandler,
  withDynamicFormFieldDefaultFeatures,
} from './dynamic-form-field.module';

describe('DynamicFormFieldModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
        DynamicFormActionService,
        importDynamicFormsProviders(...withDynamicFormFieldDefaultFeatures()),
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_HANDLERS', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handlers = service.handlers;

    expect(handlers.length).toBe(6);
    expect(handlers[0]).toEqual(dynamicFormFieldClearHandler);
    expect(handlers[0].func).toEqual(jasmine.any(Function));
    expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[1]).toEqual(dynamicFormFieldResetHandler);
    expect(handlers[1].func).toEqual(jasmine.any(Function));
    expect(handlers[1].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[2]).toEqual(dynamicFormFieldResetEmptyHandler);
    expect(handlers[2].func).toEqual(jasmine.any(Function));
    expect(handlers[2].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[3]).toEqual(dynamicFormFieldResetDefaultHandler);
    expect(handlers[3].func).toEqual(jasmine.any(Function));
    expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[4]).toEqual(dynamicFormFieldValidateHandler);
    expect(handlers[4].func).toEqual(jasmine.any(Function));
    expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[5]).toEqual(dynamicFormSubmitHandler);
    expect(handlers[5].func).toEqual(jasmine.any(Function));
    expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('handler calls reset of field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'reset');
    const field = { reset: () => {} } as DynamicFormField;

    const resetSpy = spyOn(field, 'reset');

    handler.func(field, null);

    expect(resetSpy).toHaveBeenCalled();
  }));

  it('handler calls clear of field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'clear');
    const field = { clear: () => {} } as DynamicFormField;

    const clearSpy = spyOn(field, 'clear');

    handler.func(field, null);

    expect(clearSpy).toHaveBeenCalled();
  }));

  it('handler calls resetEmpty of field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'resetEmpty');
    const field = { resetEmpty: () => {} } as DynamicFormField;

    const resetEmptySpy = spyOn(field, 'resetEmpty');

    handler.func(field, null);

    expect(resetEmptySpy).toHaveBeenCalled();
  }));

  it('handler calls resetDefault of field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'resetDefault');
    const field = { resetDefault: () => {} } as DynamicFormField;

    const resetDefaultSpy = spyOn(field, 'resetDefault');

    handler.func(field, null);

    expect(resetDefaultSpy).toHaveBeenCalled();
  }));

  it('handler calls validate of field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'validate');
    const field = { validate: () => {} } as DynamicFormField;

    const validateSpy = spyOn(field, 'validate');

    handler.func(field, null);

    expect(validateSpy).toHaveBeenCalled();
  }));

  it('handler returns root form', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'submit');
    const root = { submit: () => {} } as DynamicForm;
    const action = { root } as DynamicFormAction;

    const form = handler.elementFunc(action);

    expect(form).toBe(root);
  }));

  it('handler calls submit of form', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'submit');
    const form = { submit: () => {} } as DynamicForm;
    const field = {} as DynamicFormField;
    const action = { root: form, parent: field as DynamicFormElement } as DynamicFormAction;

    const submitSpy = spyOn(form, 'submit');

    handler.func(form, action);

    expect(submitSpy).toHaveBeenCalled();
  }));

  it('handler calls closeDialog of parent action and submit of form', inject(
    [DynamicFormActionService],
    (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const form = { submit: () => {} } as DynamicForm;
      const dialog = {} as DynamicForm;
      const dialogAction = { dialog, dialogOpen: true, closeDialog: () => {} } as DynamicFormAction;
      const action = { root: form, parent: dialogAction as DynamicFormElement } as DynamicFormAction;

      const submitSpy = spyOn(form, 'submit');
      const closeDialogSpy = spyOn(dialogAction, 'closeDialog');

      handler.func(form, action);

      expect(submitSpy).toHaveBeenCalled();
      expect(closeDialogSpy).toHaveBeenCalled();
    },
  ));
});
