import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormActionHandler, DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from './dynamic-form-action-handler';
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

    it('provides DYNAMIC_FORM_ACTION_HANDLERS',
      inject([DYNAMIC_FORM_ACTION_HANDLERS], (config: DynamicFormActionHandlers) => {
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

    it('provides DYNAMIC_FORM_ACTION_HANDLERS',
      inject([DYNAMIC_FORM_ACTION_HANDLERS], (config: DynamicFormActionHandlers) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(handlers);
      })
    );
  });
});
