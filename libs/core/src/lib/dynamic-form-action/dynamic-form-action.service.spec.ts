import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler-config';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionService', () => {
  describe('without DYNAMIC_FORM_ACTIONS_HANDLER_CONFIG', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService( { name: 'test' })
          },
          DynamicFormActionService
        ]
      });
    });

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

  describe('with DYNAMIC_FORM_ACTION_HANDLER_CONFIG', () => {
    const handlers: DynamicFormActionHandler[] = [
      {
        type: 'type',
        func: () => {},
        libraryName: 'test1'
      },
      {
        type: 'type',
        func: () => {},
        libraryName: 'test'
      },
      {
        type: 'type-field-func',
        elementFunc: (action) => (<DynamicFormField>action.parent).parent,
        func: () => {},
        libraryName: 'test'
      }
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService( { name: 'test' })
          },
          {
            provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG,
            useValue: handlers
          },
          DynamicFormActionService
        ]
      });
    });

    it('returns handlers',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service.handlers).toEqual([ handlers[1], handlers[2] ]);
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

    it('calls elementFunc and func of handler and stops propagation of event',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        const parent = <DynamicFormField>{};
        const field = <DynamicFormField>{ parent: parent };
        const action = <DynamicFormAction>{ parent: field, template: { action: 'type-field-func' } };
        const event = <Event>{ stopPropagation(): void {} };

        spyOn(service, 'getHandler').and.callThrough();
        spyOn(service.handlers[1], 'elementFunc').and.callThrough();
        spyOn(service.handlers[1], 'func');
        spyOn(event, 'stopPropagation');

        service.handle(action, event);

        expect(service.getHandler).toHaveBeenCalledWith('type-field-func');
        expect(service.handlers[1].elementFunc).toHaveBeenCalledWith(action);
        expect(service.handlers[1].func).toHaveBeenCalledWith(parent, action);
        expect(event.stopPropagation).toHaveBeenCalled();
      })
    );
  });
});
