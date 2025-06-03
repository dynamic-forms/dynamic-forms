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
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayValidatorTypes } from './dynamic-form-array-validator-type';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG, DynamicFormArrayValidatorTypeConfig } from './dynamic-form-array-validator-type-config';
import {
  dynamicFormArrayClearFieldsHandler,
  dynamicFormArrayMoveFieldDownHandler,
  dynamicFormArrayMoveFieldUpHandler,
  dynamicFormArrayPopFieldHandler,
  dynamicFormArrayRemoveFieldHandler,
  dynamicFormArrayType,
  withDynamicFormArrayDefaultFeatures,
} from './dynamic-form-array.module';

describe('DynamicFormArrayModule', () => {
  let formBuilder: DynamicFormBuilder;

  beforeEach(() => {
    formBuilder = MockService(DynamicFormBuilder);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
        {
          provide: DynamicFormBuilder,
          useValue: formBuilder,
        },
        DynamicFormConfigService,
        DynamicFormActionService,
        importDynamicFormsProviders(...withDynamicFormArrayDefaultFeatures()),
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

    expect(handlers.length).toBe(6);
    expect(handlers[0]).toEqual(dynamicFormArrayPopFieldHandler);
    expect(handlers[0].func).toEqual(jasmine.any(Function));
    expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[1]).toEqual(dynamicFormArrayRemoveFieldHandler);
    expect(handlers[1].func).toEqual(jasmine.any(Function));
    expect(handlers[1].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[2]).toEqual(dynamicFormArrayClearFieldsHandler);
    expect(handlers[2].func).toEqual(jasmine.any(Function));
    expect(handlers[2].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[3]).toEqual(dynamicFormArrayMoveFieldDownHandler);
    expect(handlers[3].func).toEqual(jasmine.any(Function));
    expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
    expect(handlers[4]).toEqual(dynamicFormArrayMoveFieldUpHandler);
    expect(handlers[4].func).toEqual(jasmine.any(Function));
    expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('handler calls pushField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'pushArrayField');
    const field = { pushField: (_elem: DynamicFormField) => {}, length: 0 } as DynamicFormArray;
    const element = {} as DynamicFormField;

    const createFieldSpy = spyOn(formBuilder, 'createFormArrayField').and.returnValue(element);
    const pushFieldSpy = spyOn(field, 'pushField');

    handler.func(field, null);

    expect(createFieldSpy).toHaveBeenCalledWith(field, 0);
    expect(pushFieldSpy).toHaveBeenCalledWith(element);
  }));

  it('handler calls popField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'popArrayField');
    const field = { popField: () => {} } as DynamicFormArray;

    const popFieldSpy = spyOn(field, 'popField');

    handler.func(field, null);

    expect(popFieldSpy).toHaveBeenCalled();
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

    const removeFieldSpy = spyOn(field, 'removeField');

    handler.func(field, action);

    expect(removeFieldSpy).toHaveBeenCalledWith(1);
  }));

  it('handler does not call removeField of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeArrayField');
    const field = { removeField: (_index: number) => {} } as DynamicFormArray;
    const parent = {} as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    const removeFieldSpy = spyOn(field, 'removeField');

    handler.func(field, action);

    expect(removeFieldSpy).not.toHaveBeenCalled();
  }));

  it('handler calls clearFields of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'clearArrayFields');
    const field = { clearFields: () => {} } as DynamicFormArray;

    const clearFieldsSpy = spyOn(field, 'clearFields');

    handler.func(field, null);

    expect(clearFieldsSpy).toHaveBeenCalled();
  }));

  it('handler calls moveFieldDown of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldDown');
    const field = { moveFieldDown: (_index: number) => {} } as DynamicFormArray;
    const parent = { index: 1 } as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    const moveFieldDownSpy = spyOn(field, 'moveFieldDown');

    handler.func(field, action);

    expect(moveFieldDownSpy).toHaveBeenCalledWith(1);
  }));

  it('handler does not call moveFieldDown of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldDown');
    const field = { moveFieldDown: (_index: number) => {} } as DynamicFormArray;
    const parent = {} as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    const moveFieldDownSpy = spyOn(field, 'moveFieldDown');

    handler.func(field, action);

    expect(moveFieldDownSpy).not.toHaveBeenCalled();
  }));

  it('handler calls moveFieldUp of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldUp');
    const field = { moveFieldUp: (_index: number) => {} } as DynamicFormArray;
    const parent = { index: 1 } as DynamicFormField;
    const action = { parentField: parent as DynamicFormElement } as DynamicFormAction;

    const moveFieldUpSpy = spyOn(field, 'moveFieldUp');

    handler.func(field, action);

    expect(moveFieldUpSpy).toHaveBeenCalledWith(1);
  }));

  it('handler does not call moveFieldDown of array field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'moveArrayFieldUp');
    const field = { moveFieldUp: (_index: number) => {} } as DynamicFormArray;
    const parent = {} as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    const moveFieldUpSpy = spyOn(field, 'moveFieldUp');

    handler.func(field, action);

    expect(moveFieldUpSpy).not.toHaveBeenCalled();
  }));
});
