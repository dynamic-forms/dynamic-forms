import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler,
  dynamicFormFieldValidateHandler, dynamicFormSubmitHandler } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayValidatorTypes } from './dynamic-form-array-validator-type';
import { DynamicFormArrayValidatorTypeConfig, DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from './dynamic-form-array-validator-type-config';
import { dynamicFormArrayClearFieldsHandler, dynamicFormArrayPopFieldHandler,
  dynamicFormArrayRemoveFieldHandler, dynamicFormArrayType, DynamicFormArrayModule } from './dynamic-form-array.module';

describe('DynamicFormArrayModule', () => {
  let formBuilder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(async(() => {
    formBuilder = jasmine.createSpyObj<DynamicFormBuilder>('DynamicFormBuilder', [ 'createFormArrayField' ]);

    TestBed.configureTestingModule({
      imports: [
        DynamicFormArrayModule
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
      expect(types[0]).toEqual(dynamicFormArrayType);
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG',
    inject([DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG], (config: DynamicFormArrayValidatorTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(dynamicFormArrayValidatorTypes);
    })
  );

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handlers = service.handlers;

      expect(handlers.length).toBe(13);
      expect(handlers[3]).toEqual(dynamicFormFieldResetHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[4]).toEqual(dynamicFormFieldResetDefaultHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5]).toEqual(dynamicFormFieldValidateHandler);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[6]).toEqual(dynamicFormSubmitHandler);
      expect(handlers[6].func).toEqual(jasmine.any(Function));
      expect(handlers[6].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[7].func).toEqual(jasmine.any(Function));
      expect(handlers[7].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[8]).toEqual(dynamicFormArrayPopFieldHandler);
      expect(handlers[8].func).toEqual(jasmine.any(Function));
      expect(handlers[8].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[9]).toEqual(dynamicFormArrayRemoveFieldHandler);
      expect(handlers[9].func).toEqual(jasmine.any(Function));
      expect(handlers[9].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[10]).toEqual(dynamicFormArrayClearFieldsHandler);
      expect(handlers[10].func).toEqual(jasmine.any(Function));
      expect(handlers[10].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('handler calls pushField of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'pushArrayField');
      const field = <DynamicFormArray>{ pushField(_elem: DynamicFormField): void {}, length: 0 };
      const element = <DynamicFormField>{};

      formBuilder.createFormArrayField.and.returnValue(element);

      spyOn(field, 'pushField');

      handler.func(field, null);

      expect(formBuilder.createFormArrayField).toHaveBeenCalledWith(field, 0);
      expect(field.pushField).toHaveBeenCalledWith(element);
    })
  );

  it('handler calls popField of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'popArrayField');
      const field = <DynamicFormArray>{ popField(): void {} };

      spyOn(field, 'popField');

      handler.func(field, null);

      expect(field.popField).toHaveBeenCalled();
    })
  );

  it('handler returns array parent of action',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayField');
      const field = <DynamicFormField>{ fieldClassType: 'array' };
      const parent = <DynamicFormField>{ parent: field };
      const action = <DynamicFormAction>{ parent: parent };

      const result = handler.elementFunc(action);

      expect(result).toEqual(field);
    })
  );

  it('handler returns undefined as array parent of action',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayField');
      const field = <DynamicFormField>{ fieldClassType: 'group' };
      const parent = <DynamicFormField>{ parent: field };
      const action = <DynamicFormAction>{ parent: parent };

      const result = handler.elementFunc(action);

      expect(result).toBeUndefined();
    })
  );

  it('handler calls removeField of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayField');
      const field = <DynamicFormArray>{ removeField(_index: number): void {} };
      const parent = <DynamicFormField>{ index: 1 };
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'removeField');

      handler.func(field, action);

      expect(field.removeField).toHaveBeenCalledWith(1);
    })
  );

  it('handler does not call removeField of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayField');
      const field = <DynamicFormArray>{ removeField(_index: number): void {} };
      const parent = <DynamicFormField>{};
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'removeField');

      handler.func(field, action);

      expect(field.removeField).not.toHaveBeenCalled();
    })
  );

  it('handler calls clearFields of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'clearArrayFields');
      const field = <DynamicFormArray>{ clearFields(): void {} };

      spyOn(field, 'clearFields');

      handler.func(field, null);

      expect(field.clearFields).toHaveBeenCalled();
    })
  );

  it('handler calls moveFieldDown of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'moveArrayFieldDown');
      const field = <DynamicFormArray>{ moveFieldDown(_index: number): void {} };
      const parent = <DynamicFormField>{ index: 1 };
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'moveFieldDown');

      handler.func(field, action);

      expect(field.moveFieldDown).toHaveBeenCalledWith(1);
    })
  );

  it('handler does not call moveFieldDown of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'moveArrayFieldDown');
      const field = <DynamicFormArray>{ moveFieldDown(_index: number): void {} };
      const parent = <DynamicFormField>{};
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'moveFieldDown');

      handler.func(field, action);

      expect(field.moveFieldDown).not.toHaveBeenCalled();
    })
  );

  it('handler calls moveFieldUp of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'moveArrayFieldUp');
      const field = <DynamicFormArray>{ moveFieldUp(_index: number): void {} };
      const parent = <DynamicFormField>{ index: 1 };
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'moveFieldUp');

      handler.func(field, action);

      expect(field.moveFieldUp).toHaveBeenCalledWith(1);
    })
  );

  it('handler does not call moveFieldDown of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'moveArrayFieldUp');
      const field = <DynamicFormArray>{ moveFieldUp(_index: number): void {} };
      const parent = <DynamicFormField>{};
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'moveFieldUp');

      handler.func(field, action);

      expect(field.moveFieldUp).not.toHaveBeenCalled();
    })
  );
});
