import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormActionService } from '../../dynamic-form-action/dynamic-form-action.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../../dynamic-forms.module';
import { DynamicFormModal } from './dynamic-form-modal';
import {
  dynamicFormModalCloseHandler,
  dynamicFormModalMaximizeHandler,
  dynamicFormModalMinimizeHandler,
  dynamicFormModalOpenHandler,
  dynamicFormModalToggleHandler,
  dynamicFormModalToggleSizeHandler,
  withDynamicFormModalActionHandlers,
} from './dynamic-form-modal.module';

describe('DynamicFormModalModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
        DynamicFormActionService,
        importDynamicFormsProviders(withDynamicFormModalActionHandlers()),
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_HANDLERS', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handlers = service.handlers;

    expect(handlers.length).toBe(6);
    expect(handlers[0]).toEqual(dynamicFormModalOpenHandler);
    expect(handlers[0].func).toEqual(jasmine.any(Function));
    expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[1]).toEqual(dynamicFormModalCloseHandler);
    expect(handlers[1].func).toEqual(jasmine.any(Function));
    expect(handlers[1].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[2]).toEqual(dynamicFormModalToggleHandler);
    expect(handlers[2].func).toEqual(jasmine.any(Function));
    expect(handlers[2].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[3]).toEqual(dynamicFormModalMaximizeHandler);
    expect(handlers[3].func).toEqual(jasmine.any(Function));
    expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[4]).toEqual(dynamicFormModalMinimizeHandler);
    expect(handlers[4].func).toEqual(jasmine.any(Function));
    expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[5]).toEqual(dynamicFormModalToggleSizeHandler);
    expect(handlers[5].func).toEqual(jasmine.any(Function));
    expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('handler calls open of modal', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'openModal');
    const modal = { open: () => {} } as DynamicFormModal;

    const openModalSpy = spyOn(modal, 'open');

    handler.func(modal, null);

    expect(openModalSpy).toHaveBeenCalled();
  }));

  it('handler calls close of modal', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'closeModal');
    const modal = { close: () => {} } as DynamicFormModal;

    const closeModalSpy = spyOn(modal, 'close');

    handler.func(modal, null);

    expect(closeModalSpy).toHaveBeenCalled();
  }));

  it('handler calls toggle of modal', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'toggleModal');
    const modal = { toggle: () => {} } as DynamicFormModal;

    const toggleModalSpy = spyOn(modal, 'toggle');

    handler.func(modal, null);

    expect(toggleModalSpy).toHaveBeenCalled();
  }));

  it('handler calls maximize of modal', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'maximizeModal');
    const modal = { maximize: () => {} } as DynamicFormModal;

    const maximizeModalSpy = spyOn(modal, 'maximize');

    handler.func(modal, null);

    expect(maximizeModalSpy).toHaveBeenCalled();
  }));

  it('handler calls minimize of modal', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'minimizeModal');
    const modal = { minimize: () => {} } as DynamicFormModal;

    const minimizeModalSpy = spyOn(modal, 'minimize');

    handler.func(modal, null);

    expect(minimizeModalSpy).toHaveBeenCalled();
  }));

  it('handler calls toggleSize of modal', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'toggleSizeModal');
    const modal = { toggleSize: () => {} } as DynamicFormModal;

    const toggleModalSizeSpy = spyOn(modal, 'toggleSize');

    handler.func(modal, null);

    expect(toggleModalSizeSpy).toHaveBeenCalled();
  }));
});
