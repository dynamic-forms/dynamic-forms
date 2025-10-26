import { TestBed, inject } from '@angular/core/testing';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG, DynamicFormActionHandlerConfig } from './dynamic-form-action-handler-config';
import {
  dynamicFormDialogHandlers,
  withDynamicFormActionDefaultFeatures,
  withDynamicFormActionHandlerFactory,
  withDynamicFormActionHandlers,
} from './dynamic-form-action.module';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('does not provide DynamicFormActionService', () => {
      expect(() => TestBed.inject(DynamicFormActionService)).toThrowError();
    });

    it('does not provide DYNAMIC_FORM_ACTION_HANDLER_CONFIG', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_ACTION_HANDLER_CONFIG)).toThrowError();
    });
  });

  describe('with default features provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(...withDynamicFormActionDefaultFeatures()),
      });
    });

    it('does not provide DynamicFormActionService', () => {
      expect(() => TestBed.inject(DynamicFormActionService)).toThrowError();
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(3);
        expect(config).toEqual(dynamicFormDialogHandlers);
      },
    ));
  });

  describe('with default features and DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(dynamicFormLibrary),
          },
          DynamicFormActionService,
          ...importDynamicFormsProviders(...withDynamicFormActionDefaultFeatures()),
        ],
      });
    });

    it('provides DynamicFormActionService', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      expect(service).toBeTruthy();
    }));

    it('handler calls openDialog of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'openDialog');
      const action = { openDialog: () => {} } as DynamicFormAction;

      const openDialogSpy = spyOn(action, 'openDialog');

      handler.func(action, null);

      expect(openDialogSpy).toHaveBeenCalled();
    }));

    it('handler calls closeDialog of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'closeDialog');
      const action = { closeDialog: () => {} } as DynamicFormAction;

      const closeDialogSpy = spyOn(action, 'closeDialog');

      handler.func(action, null);

      expect(closeDialogSpy).toHaveBeenCalled();
    }));

    it('handler calls toggleDialog of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'toggleDialog');
      const action = { toggleDialog: () => {} } as DynamicFormAction;

      const toggleDialogSpy = spyOn(action, 'toggleDialog');

      handler.func(action, null);

      expect(toggleDialogSpy).toHaveBeenCalled();
    }));
  });

  describe('withHandler', () => {
    const libraryName = 'test';
    const handler: DynamicFormActionHandler = { type: 'handlerType', func: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormActionHandlers(handler)),
      });
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(handler);
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
        providers: importDynamicFormsProviders(withDynamicFormActionHandlers(...handlers)),
      });
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(2);
        expect(config[0]).toEqual(handlers[0]);
        expect(config[1]).toEqual(handlers[1]);
      },
    ));
  });

  describe('withHandlerFactory', () => {
    const libraryName = 'test';
    const handler: DynamicFormActionHandler = { type: 'handlerType', func: null, libraryName };
    const handlerFactory = () => handler;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormActionHandlerFactory(handlerFactory, [])),
      });
    });

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG', inject(
      [DYNAMIC_FORM_ACTION_HANDLER_CONFIG],
      (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(handler);
      },
    ));
  });
});
