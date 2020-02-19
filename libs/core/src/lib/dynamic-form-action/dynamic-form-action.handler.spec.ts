import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionHandler } from './dynamic-form-action.handler';

describe('DynamicFormActionHandler', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormActionHandler
      ]
    });
  }));

  it('executes validate of parent',
    inject([DynamicFormActionHandler], (handler: DynamicFormActionHandler) => {
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
    inject([DynamicFormActionHandler], (handler: DynamicFormActionHandler) => {
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
    inject([DynamicFormActionHandler], (handler: DynamicFormActionHandler) => {
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
