import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: { name: 'test' } },
        DynamicFormConfigService,
        { provide: DynamicFormBuilder, useValue: {} },
        DynamicFormActionService
      ]
    });
  }));

  it('executes validate of parent',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      const parent = <DynamicFormField>{ validate() {} };
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'validate' }, elements: [] };
      const action = new DynamicFormAction(null, parent, definition);
      const event = <Event>{ stopPropagation() {} };

      spyOn(parent, 'validate');
      spyOn(event, 'stopPropagation');

      handler.handle(action, event);

      expect(parent.validate).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );

  it('executes reset of parent',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      const parent = <DynamicFormField>{ reset() {} };
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'reset' }, elements: [] };
      const action = new DynamicFormAction(null, parent, definition);
      const event = <Event>{ stopPropagation() {} };

      spyOn(parent, 'reset');
      spyOn(event, 'stopPropagation');

      handler.handle(action, event);

      expect(parent.reset).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );

  it('executes resetDefault of parent',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      const parent = <DynamicFormField>{ resetDefault() {} };
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'resetDefault' }, elements: [] };
      const action = new DynamicFormAction(null, parent, definition);
      const event = <Event>{ stopPropagation() {} };

      spyOn(parent, 'resetDefault');
      spyOn(event, 'stopPropagation');

      handler.handle(action, event);

      expect(parent.resetDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );
});
