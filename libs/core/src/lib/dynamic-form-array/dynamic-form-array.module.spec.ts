import { TestBed, inject } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayValidatorTypes } from './dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG, DynamicFormArrayValidatorTypeConfig } from './dynamic-form-array-validator-type-config';
import {
  DynamicFormArrayModule,
  dynamicFormArrayClearFieldsHandler,
  dynamicFormArrayMoveFieldDownHandler,
  dynamicFormArrayMoveFieldUpHandler,
  dynamicFormArrayPopFieldHandler,
  dynamicFormArrayRemoveFieldHandler,
  dynamicFormArrayType,
} from './dynamic-form-array.module';

describe('DynamicFormArrayModule', () => {
  let formBuilder: DynamicFormBuilder;

  beforeEach(() => {
    formBuilder = MockService(DynamicFormBuilder);

    TestBed.configureTestingModule({
      imports: [DynamicFormArrayModule],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
        {
          provide: DynamicFormBuilder,
          useValue: formBuilder,
        },
      ],
    });
  });

  it('provides DYNAMIC_FORM_FIELD_TYPES', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    const types = service.fieldTypes;

    expect(types.length).toBe(1);
    expect(types[0]).toEqual(dynamicFormArrayType);
    expect(types[0].factory).toEqual(jasmine.any(Function));
    expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG],
    (config: DynamicFormArrayValidatorTypeConfig) => {
      expect(config.length).toBe(3);
      expect(config).toEqual(dynamicFormArrayValidatorTypes);
    },
  ));

  it('provides DYNAMIC_FORM_ACTION_HANDLERS', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handlers = service.handlers;

    expect(handlers.length).toBe(12);
    expect(handlers[6]).toEqual(dynamicFormArrayPopFieldHandler);
    expect(handlers[6].func).toEqual(jasmine.any(Function));
    expect(handlers[6].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[7]).toEqual(dynamicFormArrayRemoveFieldHandler);
    expect(handlers[7].func).toEqual(jasmine.any(Function));
    expect(handlers[7].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[8]).toEqual(dynamicFormArrayClearFieldsHandler);
    expect(handlers[8].func).toEqual(jasmine.any(Function));
    expect(handlers[8].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[9]).toEqual(dynamicFormArrayMoveFieldDownHandler);
    expect(handlers[9].func).toEqual(jasmine.any(Function));
    expect(handlers[9].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[10]).toEqual(dynamicFormArrayMoveFieldUpHandler);
    expect(handlers[10].func).toEqual(jasmine.any(Function));
    expect(handlers[10].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('handler calls pushField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'pushArrayField');
    const field = { pushField: (_elem: DynamicFormField) => {}, length: 0 } as DynamicFormArray;
    const element = {} as DynamicFormField;

    spyOn(formBuilder, 'createFormArrayField').and.returnValue(element);

    spyOn(field, 'pushField');

    handler.func(field, null);

    expect(formBuilder.createFormArrayField).toHaveBeenCalledWith(field, 0);
    expect(field.pushField).toHaveBeenCalledWith(element);
  }));

  it('handler calls popField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'popArrayField');
    const field = { popField: () => {} } as DynamicFormArray;

    spyOn(field, 'popField');

    handler.func(field, null);

    expect(field.popField).toHaveBeenCalled();
  }));

  it('handler returns array parent of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeArrayField');
    const field = { fieldClassType: 'array' } as DynamicFormField;
    const parent = { parentField: field } as DynamicFormField;
    const action = { parentField: parent } as DynamicFormAction;

    const result = handler.elementFunc(action);

    expect(result).toEqual(field);
  }));

  it('handler returns undefined as array parent of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeArrayField');
    const field = { fieldClassType: 'group' } as DynamicFormField;
    const parent = { parent: field as DynamicFormElement } as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    const result = handler.elementFunc(action);

    expect(result).toBeUndefined();
  }));

  it('handler calls removeField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeArrayField');
    const field = { removeField: (_index: number) => {} } as DynamicFormArray;
    const parent = { index: 1 } as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'removeField');

    handler.func(field, action);

    expect(field.removeField).toHaveBeenCalledWith(1);
  }));

  it('handler does not call removeField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeArrayField');
    const field = { removeField: (_index: number) => {} } as DynamicFormArray;
    const parent = {} as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'removeField');

    handler.func(field, action);

    expect(field.removeField).not.toHaveBeenCalled();
  }));

  it('handler calls clearFields of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'clearArrayFields');
    const field = { clearFields: () => {} } as DynamicFormArray;

    spyOn(field, 'clearFields');

    handler.func(field, null);

    expect(field.clearFields).toHaveBeenCalled();
  }));

  it('handler calls moveFieldDown of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldDown');
    const field = { moveFieldDown: (_index: number) => {} } as DynamicFormArray;
    const parent = { index: 1 } as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'moveFieldDown');

    handler.func(field, action);

    expect(field.moveFieldDown).toHaveBeenCalledWith(1);
  }));

  it('handler does not call moveFieldDown of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldDown');
    const field = { moveFieldDown: (_index: number) => {} } as DynamicFormArray;
    const parent = {} as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'moveFieldDown');

    handler.func(field, action);

    expect(field.moveFieldDown).not.toHaveBeenCalled();
  }));

  it('handler calls moveFieldUp of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldUp');
    const field = { moveFieldUp: (_index: number) => {} } as DynamicFormArray;
    const parent = { index: 1 } as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'moveFieldUp');

    handler.func(field, action);

    expect(field.moveFieldUp).toHaveBeenCalledWith(1);
  }));

  it('handler does not call moveFieldDown of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldUp');
    const field = { moveFieldUp: (_index: number) => {} } as DynamicFormArray;
    const parent = {} as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'moveFieldUp');

    handler.func(field, action);

    expect(field.moveFieldUp).not.toHaveBeenCalled();
  }));
});
