import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionService } from './dynamic-form-action.service';

describe('DynamicFormActionService', () => {
  let formBuilder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(async(() => {
    formBuilder = jasmine.createSpyObj<DynamicFormBuilder>('' , [ 'createFormArrayElement' ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: DynamicFormBuilder, useValue: formBuilder },
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

  it('executes pushArrayElement of parent',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      const root = <DynamicFormField>{ model: {} };
      const parent = new DynamicFormArray(root, root, <DynamicFormArrayDefinition>{ key: 'key' });
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'pushArrayElement' }, elements: [] };
      const action = new DynamicFormAction(root, parent, definition);
      const event = <Event>{ stopPropagation() {} };
      const element = <DynamicFormField>{};

      formBuilder.createFormArrayElement.and.returnValue(element);

      spyOn(parent, 'pushElement');
      spyOn(event, 'stopPropagation');

      handler.handle(action, event);

      expect(formBuilder.createFormArrayElement).toHaveBeenCalledWith(parent, 0);
      expect(parent.pushElement).toHaveBeenCalledWith(element);
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );

  it('executes popArrayElement of parent',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      const root = <DynamicFormField>{ model: {} };
      const parent = new DynamicFormArray(root, root, <DynamicFormArrayDefinition>{ key: 'key' });
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'popArrayElement' }, elements: [] };
      const action = new DynamicFormAction(root, parent, definition);
      const event = <Event>{ stopPropagation() {} };

      spyOn(parent, 'popElement');
      spyOn(event, 'stopPropagation');

      handler.handle(action, event);

      expect(parent.popElement).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );

  it('executes clearArrayElements of parent',
    inject([DynamicFormActionService], (handler: DynamicFormActionService) => {
      const root = <DynamicFormField>{ model: {} };
      const parent = new DynamicFormArray(root, root, <DynamicFormArrayDefinition>{ key: 'key' });
      const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: { action: 'clearArrayElements' }, elements: [] };
      const action = new DynamicFormAction(root, parent, definition);
      const event = <Event>{ stopPropagation() {} };

      spyOn(parent, 'clearElements');
      spyOn(event, 'stopPropagation');

      handler.handle(action, event);

      expect(parent.clearElements).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );
});
