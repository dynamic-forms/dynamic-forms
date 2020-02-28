import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-config/dynamic-form-library.service';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { dynamicFormFieldResetDefaultHandler, dynamicFormFieldResetHandler, dynamicFormFieldValidateHandler } from '../dynamic-form-field/dynamic-form-field.module';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { dynamicFormArrayClearElementsHandler, dynamicFormArrayPopElementHandler, dynamicFormArrayType, DynamicFormArrayModule } from './dynamic-form-array.module';

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
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(new DynamicFormLibraryService({ name: 'test' }))
        },
        {
          provide: DynamicFormBuilder,
          useValue: formBuilder
        }
      ]
    });
  }));

  it('provides DYNAMIC_FORM_FIELD_TYPES',
    inject([DYNAMIC_FORM_FIELD_TYPES], (types: DynamicFormFieldTypes) => {
      expect(types.length).toBe(1);
      expect(types[0]).toEqual(dynamicFormArrayType);
      expect(types[0].factory).toEqual(jasmine.any(Function));
      expect(types[0].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('provides DYNAMIC_FORM_ACTION_HANDLERS',
    inject([DYNAMIC_FORM_ACTION_HANDLERS], (handlers: DynamicFormActionHandlers) => {
      expect(handlers.length).toBe(6);
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
      expect(handlers[4]).toEqual(dynamicFormArrayClearElementsHandler);
      expect(handlers[4].func).toEqual(jasmine.any(Function));
      expect(handlers[4].libraryName).toEqual(dynamicFormLibrary.name);
      expect(handlers[5].func).toEqual(jasmine.any(Function));
      expect(handlers[5].libraryName).toEqual(dynamicFormLibrary.name);
    })
  );

  it('handler calls popElement of field',
    inject([DYNAMIC_FORM_ACTION_HANDLERS], (handlers: DynamicFormActionHandlers) => {
      const handler = handlers.find(h => h.type === 'popElement');
      const field = <DynamicFormArray>{ popElement() {} };

      spyOn(field, 'popElement');

      handler.func(field, null);

      expect(field.popElement).toHaveBeenCalled();
    })
  );

  it('handler calls clearElements of field',
    inject([DYNAMIC_FORM_ACTION_HANDLERS], (handlers: DynamicFormActionHandlers) => {
      const handler = handlers.find(h => h.type === 'clearElements');
      const field = <DynamicFormArray>{ clearElements() {} };

      spyOn(field, 'clearElements');

      handler.func(field, null);

      expect(field.clearElements).toHaveBeenCalled();
    })
  );

  it('handler calls pushElement of field',
    inject([DYNAMIC_FORM_ACTION_HANDLERS], (handlers: DynamicFormActionHandlers) => {
      const handler = handlers.find(h => h.type === 'pushElement');
      const field = <DynamicFormArray>{ pushElement(_elem) {}, length: 0 };
      const element = <DynamicFormField>{};

      formBuilder.createFormArrayElement.and.returnValue(element);

      spyOn(field, 'pushElement');

      handler.func(field, null);

      expect(formBuilder.createFormArrayElement).toHaveBeenCalledWith(field, 0);
      expect(field.pushElement).toHaveBeenCalledWith(element);
    })
  );
});
