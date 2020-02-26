import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
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
        { provide: DYNAMIC_FORM_LIBRARY, useValue: { name: 'test' } },
        DynamicFormConfigService,
        { provide: DynamicFormBuilder, useValue: formBuilder },
        DynamicFormActionService
      ]
    });
  }));

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
});
