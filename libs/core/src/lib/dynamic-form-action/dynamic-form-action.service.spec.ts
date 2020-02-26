import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionService', () => {
  let configService: jasmine.SpyObj<DynamicFormConfigService>;

  beforeEach(async(() => {
    configService = jasmine.createSpyObj<DynamicFormConfigService>('' , [ 'getActionHandler' ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: { name: 'test' } },
        { provide: DynamicFormConfigService, useValue: configService  },
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

      configService.getActionHandler.and.returnValue(handler);

      spyOn(event, 'stopPropagation');
      spyOn(handler, 'func');

      service.handle(action, event);

      expect(configService.getActionHandler).toHaveBeenCalledWith('reset', 'fieldClassType');
      expect(handler.func).toHaveBeenCalledWith(field, action);
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );

  it('does not call func of handler and stop event propagation',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const field = <DynamicFormField>{ fieldClassType: 'fieldClassType' };
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'reset' }, elements: [] };
      const action = new DynamicFormAction(null, field, definition);
      const event = <Event>{ stopPropagation() {} };

      configService.getActionHandler.and.returnValue(undefined);

      spyOn(event, 'stopPropagation');

      service.handle(action, event);

      expect(configService.getActionHandler).toHaveBeenCalledWith('reset', 'fieldClassType');
      expect(event.stopPropagation).not.toHaveBeenCalled();
    })
  );
});
