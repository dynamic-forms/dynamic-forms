import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-config/dynamic-form-library.service';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionService', () => {
  const libraryName: DynamicFormLibraryName = 'text';
  const library: DynamicFormLibrary = { name: libraryName };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(library)
        },
        DynamicFormActionService
      ]
    });
  }));

  it('stops propagation of event and calls func of handler',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const field = <DynamicFormField>{ fieldClassType: 'fieldClassType' };
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'reset' }, elements: [] };
      const action = new DynamicFormAction(null, field, definition);
      const event = <Event>{ stopPropagation() {} };
      const handler = <DynamicFormActionHandler>{ func(_field, _action) {} };

      spyOn(event, 'stopPropagation');
      spyOn(service, 'getActionHandler').and.returnValue(handler);
      spyOn(handler, 'func');

      service.handle(action, event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(service.getActionHandler).toHaveBeenCalledWith('reset', 'fieldClassType');
      expect(handler.func).toHaveBeenCalledWith(field, action);
    })
  );

  it('does not call func of handler and stop event propagation',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const field = <DynamicFormField>{ fieldClassType: 'fieldClassType' };
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'reset' }, elements: [] };
      const action = new DynamicFormAction(null, field, definition);
      const event = <Event>{ stopPropagation() {} };

      spyOn(event, 'stopPropagation');
      spyOn(service, 'getActionHandler').and.returnValue(undefined);

      service.handle(action, event);

      expect(event.stopPropagation).not.toHaveBeenCalled();
      expect(service.getActionHandler).toHaveBeenCalledWith('reset', 'fieldClassType');
    })
  );
});
