import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionService } from '../../dynamic-form-action/dynamic-form-action.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormModal } from './dynamic-form-modal';
import { dynamicFormModalCloseHandler, dynamicFormModalMaximizeHandler, dynamicFormModalMinimizeHandler,
  dynamicFormModalOpenHandler,
  dynamicFormModalToggleHandler,
  dynamicFormModalToggleSizeHandler,
  DynamicFormModalModule} from './dynamic-form-modal.module';

describe('DynamicFormModalModule', () => {
  beforeEach(() => {
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
  });

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handlers = service.handlers;

      expect(handlers.length).toBe(9);
      expect(handlers[3]).toEqual(dynamicFormModalOpenHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[4]).toEqual(dynamicFormModalCloseHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5]).toEqual(dynamicFormModalToggleHandler);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[6]).toEqual(dynamicFormModalMaximizeHandler);
      expect(handlers[6].func).toEqual(jasmine.any(Function));
      expect(handlers[6].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[7]).toEqual(dynamicFormModalMinimizeHandler);
      expect(handlers[7].func).toEqual(jasmine.any(Function));
      expect(handlers[7].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[8]).toEqual(dynamicFormModalToggleSizeHandler);
      expect(handlers[8].func).toEqual(jasmine.any(Function));
      expect(handlers[8].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('handler calls open of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'openModal');
      const modal = { open(): void {} } as DynamicFormModal;

      spyOn(modal, 'open');

      handler.func(modal, null);

      expect(modal.open).toHaveBeenCalled();
    })
  );

  it('handler calls close of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'closeModal');
      const modal = { close(): void {} } as DynamicFormModal;

      spyOn(modal, 'close');

      handler.func(modal, null);

      expect(modal.close).toHaveBeenCalled();
    })
  );

  it('handler calls toggle of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'toggleModal');
      const modal = { toggle(): void {} } as DynamicFormModal;

      spyOn(modal, 'toggle');

      handler.func(modal, null);

      expect(modal.toggle).toHaveBeenCalled();
    })
  );

  it('handler calls maximize of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'maximizeModal');
      const modal = { maximize(): void {} } as DynamicFormModal;

      spyOn(modal, 'maximize');

      handler.func(modal, null);

      expect(modal.maximize).toHaveBeenCalled();
    })
  );

  it('handler calls minimize of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'minimizeModal');
      const modal = { minimize(): void {} } as DynamicFormModal;

      spyOn(modal, 'minimize');

      handler.func(modal, null);

      expect(modal.minimize).toHaveBeenCalled();
    })
  );

  it('handler calls toggleSize of modal',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'toggleSizeModal');
      const modal = { toggleSize(): void {} } as DynamicFormModal;

      spyOn(modal, 'toggleSize');

      handler.func(modal, null);

      expect(modal.toggleSize).toHaveBeenCalled();
    })
  );
});
