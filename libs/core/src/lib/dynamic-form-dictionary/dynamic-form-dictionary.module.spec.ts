import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { dynamicFormDictionaryValidatorTypes } from './dynamic-form-dictionary-validator-type';
import { DynamicFormDictionaryValidatorTypeConfig, DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from './dynamic-form-dictionary-validator-type-config';
import { dynamicFormDictionaryType, DynamicFormDictionaryModule } from './dynamic-form-dictionary.module';

describe('DynamicFormDictionaryModule', () => {
  let formBuilder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(async(() => {
    formBuilder = jasmine.createSpyObj<DynamicFormBuilder>('DynamicFormBuilder', [
      'createFormDictionaryField',
      'createId'
    ]);

    TestBed.configureTestingModule({
      imports: [
        DynamicFormDictionaryModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary)
        },
        {
          provide: DynamicFormBuilder,
          useValue: formBuilder
        }
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      const types = service.fieldTypes;

      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormDictionaryType);
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG',
    inject([DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormDictionaryValidatorTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(dynamicFormDictionaryValidatorTypes);
    })
  );

  it('handler calls registerField of dictionaryy field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'registerDictionaryField');
      const field = <DynamicFormDictionary>{ registerField(_elem: DynamicFormField): void {}, length: 0 };
      const elementKey = 'key';
      const element = <DynamicFormField>{};

      formBuilder.createId.and.returnValue(elementKey);
      formBuilder.createFormDictionaryField.and.returnValue(element);

      spyOn(field, 'registerField');

      handler.func(field, null);

      expect(formBuilder.createFormDictionaryField).toHaveBeenCalledWith(field, 'key');
      expect(field.registerField).toHaveBeenCalledWith(element);
    })
  );

  it('handler returns dictionary parent of action',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
      const field = <DynamicFormField>{ fieldClassType: 'dictionary' };
      const parent = <DynamicFormField>{ parent: field };
      const action = <DynamicFormAction>{ parent: parent };

      const result = handler.elementFunc(action);

      expect(result).toEqual(field);
    })
  );

  it('handler returns undefined as dictionary parent of action',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
      const field = <DynamicFormField>{ fieldClassType: 'group' };
      const parent = <DynamicFormField>{ parent: field };
      const action = <DynamicFormAction>{ parent: parent };

      const result = handler.elementFunc(action);

      expect(result).toBeUndefined();
    })
  );

  it('handler calls removeField of dictionary field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
      const field = <DynamicFormDictionary>{ removeField(_key: string): void {} };
      const parent = <DynamicFormField>{ key: 'key' };
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'removeField');

      handler.func(field, action);

      expect(field.removeField).toHaveBeenCalledWith('key');
    })
  );

  it('handler does not call removeField of dictionary field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeDictionaryField');
      const field = <DynamicFormDictionary>{ removeField(_key: string): void {} };
      const parent = <DynamicFormField>{};
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'removeField');

      handler.func(field, action);

      expect(field.removeField).not.toHaveBeenCalled();
    })
  );

  it('handler calls clearFields of dictionary field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'clearDictionaryFields');
      const field = <DynamicFormDictionary>{ clearFields(): void {} };

      spyOn(field, 'clearFields');

      handler.func(field, null);

      expect(field.clearFields).toHaveBeenCalled();
    })
  );
});
