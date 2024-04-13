import { TestBed, inject } from '@angular/core/testing';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG, DynamicFormActionHandlerConfig } from './dynamic-form-action-handler-config';
import { DynamicFormActionModule, dynamicFormDialogHandlers } from './dynamic-form-action.module';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormActionModule],
      });
    });

    it('does not provide DynamicFormActionService', () => {
      expect(() => TestBed.inject(DynamicFormActionService)).toThrowError(/NullInjectorError/);
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(dynamicFormDialogHandlers);
      },
    ));
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormActionModule],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(dynamicFormLibrary),
          },
        ],
      });
    });

    it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      expect(service).toBeTruthy();
    }));

    it('handler calls openDialog of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'openDialog');
      const action = { openDialog: () => {} } as DynamicFormAction;

      spyOn(action, 'openDialog');

      handler.func(action, null);

      expect(action.openDialog).toHaveBeenCalled();
    }));

    it('handler calls closeDialog of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'closeDialog');
      const action = { closeDialog: () => {} } as DynamicFormAction;

      spyOn(action, 'closeDialog');

      handler.func(action, null);

      expect(action.closeDialog).toHaveBeenCalled();
    }));

    it('handler calls toggleDialog of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'toggleDialog');
      const action = { toggleDialog: () => {} } as DynamicFormAction;

      spyOn(action, 'toggleDialog');

      handler.func(action, null);

      expect(action.toggleDialog).toHaveBeenCalled();
    }));
  });

  describe('withHandler', () => {
    const libraryName = 'test';
    const handler: DynamicFormActionHandler = { type: 'handlerType', func: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormActionModule.withHandler(handler)],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
        ],
      });
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(2);
        expect(config[1]).toEqual(handler);
      },
    ));
  });

  describe('withHandlers', () => {
    const libraryName = 'test';
    const handlers: DynamicFormActionHandler[] = [
      { type: 'handlerType1', func: null, libraryName },
      { type: 'handlerType2', func: null, libraryName },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormActionModule.withHandlers(handlers)],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
        ],
      });
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(3);
        expect(config[1]).toEqual(handlers[0]);
        expect(config[2]).toEqual(handlers[1]);
      },
    ));
  });

  describe('withHandlerFactory', () => {
    const libraryName = 'test';
    const handler: DynamicFormActionHandler = { type: 'handlerType', func: null, libraryName };
    const handlerFactory = () => handler;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormActionModule.withHandlerFactory(handlerFactory, [])],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
        ],
      });
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(2);
        expect(config[1]).toEqual(handler);
      },
    ));
  });
});
