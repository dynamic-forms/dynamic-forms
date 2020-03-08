import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from './dynamic-form-action-handler';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionService', () => {
  describe('without DYNAMIC_FORM_ACTIONS_HANDLERS', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService( { name: 'test' })
          },
          DynamicFormActionService
        ]
      });
    }));

    it('returns handlers being empty',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service.handlers).toEqual([]);
      })
    );

    it('returns handler being undefined',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        const handler = service.getHandler('type');

        expect(handler).toBeUndefined();
      })
    );

    it('does not call func of handler and stop event propagation',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        const field = <DynamicFormField>{};
        const action = <DynamicFormAction>{ parent: field, template: { action: 'type' } };
        const event = <Event>{ stopPropagation(): void {} };

        spyOn(service, 'getHandler').and.callThrough();
        spyOn(event, 'stopPropagation');

        service.handle(action, event);

        expect(service.getHandler).toHaveBeenCalledWith('type');
        expect(event.stopPropagation).not.toHaveBeenCalled();
      })
    );
  });

  describe('with DYNAMIC_FORM_ACTION_HANDLERS', () => {
    const handlers: DynamicFormActionHandlers = [
      {
        type: 'type',
        func: () => {},
        libraryName: 'test1'
      },
      {
        type: 'type',
        func: () => {},
        libraryName: 'test'
      }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService( { name: 'test' })
          },
          {
            provide: DYNAMIC_FORM_ACTION_HANDLERS,
            useValue: handlers
          },
          DynamicFormActionService
        ]
      });
    }));

    it('returns handlers',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service.handlers).toEqual([ handlers[1] ]);
      })
    );

    it('returns handler',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        const handler = service.getHandler('type');

        expect(handler).toEqual(service.handlers[0]);
      })
    );

    it('returns handler being undefined if not found',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        const handler = service.getHandler('type1');

        expect(handler).toBeUndefined();
      })
    );

    it('calls func of handler and stops propagation of event',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        const field = <DynamicFormField>{};
        const action = <DynamicFormAction>{ parent: field, template: { action: 'type' } };
        const event = <Event>{ stopPropagation(): void {} };

        spyOn(service, 'getHandler').and.callThrough();
        spyOn(service.handlers[0], 'func');
        spyOn(event, 'stopPropagation');

        service.handle(action, event);

        expect(service.getHandler).toHaveBeenCalledWith('type');
        expect(service.handlers[0].func).toHaveBeenCalledWith(field, action);
        expect(event.stopPropagation).toHaveBeenCalled();
      })
    );
  });
});
