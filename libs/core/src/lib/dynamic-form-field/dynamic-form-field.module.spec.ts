import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormField } from './dynamic-form-field';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler,
  dynamicFormFieldValidateHandler, dynamicFormSubmitHandler,
  DynamicFormFieldModule } from './dynamic-form-field.module';

describe('DynamicFormFieldModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormFieldModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary)
        }
      ]
    });
  });

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handlers = service.handlers;

      expect(handlers.length).toBe(7);
      expect(handlers[3]).toEqual(dynamicFormFieldResetHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[4]).toEqual(dynamicFormFieldResetDefaultHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5]).toEqual(dynamicFormFieldValidateHandler);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[6]).toEqual(dynamicFormSubmitHandler);
      expect(handlers[6].func).toEqual(jasmine.any(Function));
      expect(handlers[6].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('handler calls reset of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'reset');
      const field = { reset(): void {} } as DynamicFormField;

      spyOn(field, 'reset');

      handler.func(field, null);

      expect(field.reset).toHaveBeenCalled();
    })
  );

  it('handler calls resetDefault of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'resetDefault');
      const field = { resetDefault(): void {} } as DynamicFormField;

      spyOn(field, 'resetDefault');

      handler.func(field, null);

      expect(field.resetDefault).toHaveBeenCalled();
    })
  );

  it('handler calls validate of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'validate');
      const field = { validate(): void {} } as DynamicFormField;

      spyOn(field, 'validate');

      handler.func(field, null);

      expect(field.validate).toHaveBeenCalled();
    })
  );

  it('handler returns root form',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const root = { submit(): void {} } as DynamicForm;
      const action = { root } as DynamicFormAction;

      const form = handler.elementFunc(action);

      expect(form).toBe(root);
    })
  );

  it('handler calls submit of form',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const form = { submit(): void {} } as DynamicForm;
      const field = {} as DynamicFormField;
      const action = { root: form, parent: field as DynamicFormElement } as DynamicFormAction;

      spyOn(form, 'submit');

      handler.func(form, action);

      expect(form.submit).toHaveBeenCalled();
    })
  );

  it('handler calls closeDialog of parent action and submit of form',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'submit');
      const form = { submit(): void {} } as DynamicForm;
      const dialog = {} as DynamicForm;
      const dialogAction = { dialog, dialogOpen: true, closeDialog(): void {} } as DynamicFormAction;
      const action = { root: form, parent: dialogAction as DynamicFormElement } as DynamicFormAction;

      spyOn(form, 'submit');
      spyOn(dialogAction, 'closeDialog');

      handler.func(form, action);

      expect(form.submit).toHaveBeenCalled();
      expect(dialogAction.closeDialog).toHaveBeenCalled();
    })
  );
});
