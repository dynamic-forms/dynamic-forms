import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionService } from '../dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler,
  dynamicFormFieldValidateHandler } from '../dynamic-form-field/dynamic-form-field.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayValidatorTypes } from './dynamic-form-array-validator-type';
import { DynamicFormArrayValidatorTypeConfig, DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from './dynamic-form-array-validator-type-config';
import { dynamicFormArrayClearElementsHandler, dynamicFormArrayPopElementHandler, dynamicFormArrayRemoveElementHandler,
  dynamicFormArrayType, DynamicFormArrayModule} from './dynamic-form-array.module';

describe('DynamicFormArrayModule', () => {
  let formBuilder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(async(() => {
    formBuilder = jasmine.createSpyObj<DynamicFormBuilder>('' , [ 'createFormArrayElement' ]);

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

      expect(handlers.length).toBe(7);
      expect(handlers[0]).toEqual(dynamicFormFieldResetHandler);
      expect(handlers[0].func).toEqual(jasmine.any(Function));
      expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[1]).toEqual(dynamicFormFieldResetDefaultHandler);
      expect(handlers[1].func).toEqual(jasmine.any(Function));
      expect(handlers[1].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[2]).toEqual(dynamicFormFieldValidateHandler);
      expect(handlers[2].func).toEqual(jasmine.any(Function));
      expect(handlers[2].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[3]).toEqual(dynamicFormArrayPopElementHandler);
      expect(handlers[3].func).toEqual(jasmine.any(Function));
      expect(handlers[3].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[4]).toEqual(dynamicFormArrayRemoveElementHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5]).toEqual(dynamicFormArrayClearElementsHandler);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[6].func).toEqual(jasmine.any(Function));
      expect(handlers[6].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('handler calls popElement of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'popArrayElement');
      const field = <DynamicFormArray>{ popElement(): void {} };

      spyOn(field, 'popElement');

      handler.func(field, null);

      expect(field.popElement).toHaveBeenCalled();
    })
  );

  it('handler returns array parent of action',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayElement');
      const field = <DynamicFormField>{ fieldClassType: 'array' };
      const parent = <DynamicFormField>{ parent: field };
      const action = <DynamicFormAction>{ parent: parent };

      const result = handler.elementFunc(action);

      expect(result).toEqual(field);
    })
  );

  it('handler returns undefined as array parent of action',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayElement');
      const field = <DynamicFormField>{ fieldClassType: 'group' };
      const parent = <DynamicFormField>{ parent: field };
      const action = <DynamicFormAction>{ parent: parent };

      const result = handler.elementFunc(action);

      expect(result).toBeUndefined();
    })
  );

  it('handler calls removeElement of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayElement');
      const field = <DynamicFormArray>{ removeElement(_index: number): void {} };
      const parent = <DynamicFormField>{ index: 1 };
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'removeElement');

      handler.func(field, action);

      expect(field.removeElement).toHaveBeenCalledWith(1);
    })
  );

  it('handler does not call removeElement of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'removeArrayElement');
      const field = <DynamicFormArray>{ removeElement(_index: number): void {} };
      const parent = <DynamicFormField>{};
      const action = <DynamicFormAction>{ parent: parent };

      spyOn(field, 'removeElement');

      handler.func(field, action);

      expect(field.removeElement).not.toHaveBeenCalled();
    })
  );
  it('handler calls clearElements of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'clearArrayElements');
      const field = <DynamicFormArray>{ clearElements(): void {} };

      spyOn(field, 'clearElements');

      handler.func(field, null);

      expect(field.clearElements).toHaveBeenCalled();
    })
  );

  it('handler calls pushElement of array field',
    inject([DynamicFormActionService], (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'pushArrayElement');
      const field = <DynamicFormArray>{ pushElement(_elem: DynamicFormField): void {}, length: 0 };
      const element = <DynamicFormField>{};

      formBuilder.createFormArrayElement.and.returnValue(element);

      spyOn(field, 'pushElement');

      handler.func(field, null);

      expect(formBuilder.createFormArrayElement).toHaveBeenCalledWith(field, 0);
      expect(field.pushElement).toHaveBeenCalledWith(element);
    })
  );
});
