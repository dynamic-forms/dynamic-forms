import { TestBed, inject } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { dynamicFormDictionaryValidatorTypes } from './dynamic-form-dictionary-validator-type';
import {
  DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
  DynamicFormDictionaryValidatorTypeConfig,
} from './dynamic-form-dictionary-validator-type-config';
import { dynamicFormDictionaryType, withDynamicFormDictionaryDefaultFeatures } from './dynamic-form-dictionary.module';

describe('DynamicFormDictionaryModule', () => {
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
        importDynamicFormsProviders(...withDynamicFormDictionaryDefaultFeatures()),
      ],
    });
  });

  it('provides DYNAMIC_FORM_FIELD_TYPES', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
    const types = service.fieldTypes;

    expect(types.length).toBe(1);
    expect(types[0]).toEqual(dynamicFormDictionaryType);
    expect(types[0].factory).toEqual(jasmine.any(Function));
    expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG', inject(
    [DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG],
    (config: DynamicFormDictionaryValidatorTypeConfig) => {
      expect(config.length).toBe(3);
      expect(config).toEqual(dynamicFormDictionaryValidatorTypes);
    },
  ));

  it('handler calls registerField of dictionary field with generated key', inject(
    [DynamicFormActionService],
    (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'registerDictionaryField');
      const field = { registerField: (_elem: DynamicFormField) => {}, length: 0 } as DynamicFormDictionary;
      const action = { parent: {} } as DynamicFormAction;
      const elementKey = 'key';
      const element = {} as DynamicFormField;

      spyOn(formBuilder, 'createId').and.returnValue(elementKey);
      spyOn(formBuilder, 'createFormDictionaryField').and.returnValue(element);

      spyOn(field, 'registerField');

      handler.func(field, action);

      expect(formBuilder.createFormDictionaryField).toHaveBeenCalledWith(field, 'key');
      expect(field.registerField).toHaveBeenCalledWith(element);
    },
  ));

  it('handler calls registerField of dictionary field with key from dialog', inject(
    [DynamicFormActionService],
    (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'registerDictionaryField');
      const field = { registerField: (_elem: DynamicFormField) => {}, length: 0 } as DynamicFormDictionary;
      const dialog = { model: { key: 'key' } } as DynamicForm;
      const parent = { dialog, closeDialog: () => {} } as DynamicFormAction;
      const action = { parent: parent as DynamicFormElement } as DynamicFormAction;
      const element = {} as DynamicFormField;

      spyOn(formBuilder, 'createFormDictionaryField').and.returnValue(element);

      spyOn(field, 'registerField');
      spyOn(parent, 'closeDialog');

      handler.func(field, action);

      expect(formBuilder.createFormDictionaryField).toHaveBeenCalledWith(field, 'key');
      expect(field.registerField).toHaveBeenCalledWith(element);
      expect(parent.closeDialog).toHaveBeenCalled();
    },
  ));

  it('handler returns dictionary of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
    const field = { fieldClassType: 'dictionary' } as DynamicFormField;
    const action = { parent: field as DynamicFormElement } as DynamicFormAction;

    const result = handler.elementFunc(action);

    expect(result).toEqual(field);
  }));

  it('handler returns dictionary parent of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
    const field = { fieldClassType: 'dictionary' } as DynamicFormField;
    const parent = { parent: field as DynamicFormElement } as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    const result = handler.elementFunc(action);

    expect(result).toEqual(field);
  }));

  it('handler returns undefined as dictionary parent of action', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
    const field = { fieldClassType: 'group' } as DynamicFormField;
    const parent = { parent: field as DynamicFormElement } as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    const result = handler.elementFunc(action);

    expect(result).toBeUndefined();
  }));

  it('handler calls removeField of dictionary field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
    const field = { removeField: (_key: string) => {} } as DynamicFormDictionary;
    const parent = { key: 'key' } as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'removeField');

    handler.func(field, action);

    expect(field.removeField).toHaveBeenCalledWith('key');
  }));

  it('handler does not call removeField of dictionary field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
    const field = { removeField: (_key: string) => {} } as DynamicFormDictionary;
    const parent = {} as DynamicFormField;
    const action = { parent: parent as DynamicFormElement } as DynamicFormAction;

    spyOn(field, 'removeField');

    handler.func(field, action);

    expect(field.removeField).not.toHaveBeenCalled();
  }));

  it('handler calls clearFields of dictionary field', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handler = service.handlers.find(h => h.type === 'clearDictionaryFields');
    const field = { clearFields: () => {} } as DynamicFormDictionary;

    spyOn(field, 'clearFields');

    handler.func(field, null);

    expect(field.clearFields).toHaveBeenCalled();
  }));
});
