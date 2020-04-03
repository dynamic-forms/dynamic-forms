import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormActionHandler, DynamicFormActionHandlerConfig,
  DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler';
import { DynamicFormActionModule } from './dynamic-form-action.module';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormActionModule
        ]
      });
    }));

    it('does not provide DynamicFormActionService', () => {
      expect(() => TestBed.get(DynamicFormActionService)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormActionModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DynamicFormActionService',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service).toBeDefined();
      })
    );
  });

  describe('withHandler', () => {
    const libraryName = 'test';
    const handler: DynamicFormActionHandler = { type: 'handlerType', func: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormActionModule.withHandler(handler)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG',
      inject([DYNAMIC_FORM_ACTION_HANDLER_CONFIG], (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(handler);
      })
    );
  });

  describe('withHandlers', () => {
    const libraryName = 'test';
    const handlers: DynamicFormActionHandler[] = [
      { type: 'handlerType1', func: null, libraryName },
      { type: 'handlerType2', func: null, libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormActionModule.withHandlers(handlers)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ACTION_HANDLER_CONFIG',
      inject([DYNAMIC_FORM_ACTION_HANDLER_CONFIG], (config: DynamicFormActionHandlerConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(handlers);
      })
    );
  });
});
