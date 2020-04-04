import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormField } from './dynamic-form-field';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler,
  dynamicFormFieldValidateHandler, DynamicFormFieldModule } from './dynamic-form-field.module';

describe('DynamicFormGroupModule', () => {
  beforeEach(async(() => {
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
  }));

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handlers = service.handlers;

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

  it('handler calls reset of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'reset');
      const field = <DynamicFormField>{ reset(): void {} };

      spyOn(field, 'reset');

      handler.func(field, null);

      expect(field.reset).toHaveBeenCalled();
    })
  );

  it('handler calls resetDefault of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'resetDefault');
      const field = <DynamicFormField>{ resetDefault(): void {} };

      spyOn(field, 'resetDefault');

      handler.func(field, null);

      expect(field.resetDefault).toHaveBeenCalled();
    })
  );

  it('handler calls validate of field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'validate');
      const field = <DynamicFormField>{ validate(): void {} };

      spyOn(field, 'validate');

      handler.func(field, null);

      expect(field.validate).toHaveBeenCalled();
    })
  );
});
