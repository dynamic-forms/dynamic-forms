import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionService } from '../../dynamic-form-action/dynamic-form-action.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormModal } from './dynamic-form-modal';
import { dynamicFormModalCloseHandler, dynamicFormModalOpenHandler, dynamicFormModalToggleHandler,
  DynamicFormModalModule } from './dynamic-form-modal.module';

describe('DynamicFormModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormModalModule
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

      expect(handlers.length).toBe(6);
      expect(handlers[3]).toEqual(dynamicFormModalOpenHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[4]).toEqual(dynamicFormModalCloseHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5]).toEqual(dynamicFormModalToggleHandler);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('handler calls open of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'openModal');
      const modal = <DynamicFormModal>{ open(): void {} };

      spyOn(modal, 'open');

      handler.func(modal, null);

      expect(modal.open).toHaveBeenCalled();
    })
  );

  it('handler calls close of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'closeModal');
      const modal = <DynamicFormModal>{ close(): void {} };

      spyOn(modal, 'close');

      handler.func(modal, null);

      expect(modal.close).toHaveBeenCalled();
    })
  );

  it('handler calls toggle of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'toggleModal');
      const modal = <DynamicFormModal>{ toggle(): void {} };

      spyOn(modal, 'toggle');

      handler.func(modal, null);

      expect(modal.toggle).toHaveBeenCalled();
    })
  );
});
