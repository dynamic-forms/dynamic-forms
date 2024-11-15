import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from '../dynamic-form-element/dynamic-form-element-type-config';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG, DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import {
  DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG,
  DynamicFormFieldWrapperTypeConfig,
} from '../dynamic-form-field/dynamic-form-field-wrapper-type-config';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import {
  withDynamicFormActions,
  withDynamicFormElements,
  withDynamicFormFieldWrappers,
  withDynamicFormFields,
  withDynamicFormInputs,
} from './dynamic-form-config.module';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [DynamicFormConfigService],
      });
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          DynamicFormConfigService,
        ],
      });
    });

    it('provides DynamicFormConfigService', inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('withElement', () => {
    const libraryName = 'test';
    const type: DynamicFormElementType = { type: 'elementType', component: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormElements(type)),
      });
    });

    it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(type);
    }));
  });

  describe('withElements', () => {
    const libraryName = 'test';
    const types: DynamicFormElementType[] = [
      { type: 'elementType1', component: null, libraryName },
      { type: 'elementType2', component: null, libraryName },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormElements(...types)),
      });
    });

    it('provides DYNAMIC_FORM_ELEMENT_TYPE_CONFIG', inject([DYNAMIC_FORM_ELEMENT_TYPE_CONFIG], (config: DynamicFormElementTypeConfig) => {
      expect(config.length).toBe(2);
      expect(config).toEqual(types);
    }));
  });

  describe('withField', () => {
    const libraryName = 'test';
    const type: DynamicFormFieldType = { type: 'fieldType', factory: null, component: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormFields(type)),
      });
    });

    it('provides DYNAMIC_FORM_FIELD_TYPE_CONFIG', inject([DYNAMIC_FORM_FIELD_TYPE_CONFIG], (config: DynamicFormFieldTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(type);
    }));
  });

  describe('withFields', () => {
    const libraryName = 'test';
    const types: DynamicFormFieldType[] = [
      { type: 'fieldType1', factory: null, component: null, libraryName },
      { type: 'fieldType2', factory: null, component: null, libraryName },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormFields(...types)),
      });
    });

    it('provides DYNAMIC_FORM_FIELD_TYPE_CONFIG', inject([DYNAMIC_FORM_FIELD_TYPE_CONFIG], (config: DynamicFormFieldTypeConfig) => {
      expect(config.length).toBe(2);
      expect(config).toEqual(types);
    }));
  });

  describe('withAction', () => {
    const libraryName = 'test';
    const type: DynamicFormActionType = { type: 'actionType', component: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormActions(type)),
      });
    });

    it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG', inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(type);
    }));
  });

  describe('withActions', () => {
    const libraryName = 'test';
    const types: DynamicFormActionType[] = [
      { type: 'actionType1', component: null, libraryName },
      { type: 'actionType2', component: null, libraryName },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormActions(...types)),
      });
    });

    it('provides DYNAMIC_FORM_ACTION_TYPE_CONFIG', inject([DYNAMIC_FORM_ACTION_TYPE_CONFIG], (config: DynamicFormActionTypeConfig) => {
      expect(config.length).toBe(2);
      expect(config).toEqual(types);
    }));
  });

  describe('withInput', () => {
    const libraryName = 'test';
    const type: DynamicFormInputType = { type: 'inputType', component: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormInputs(type)),
      });
    });

    it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toEqual(type);
    }));
  });

  describe('withInputs', () => {
    const libraryName = 'test';
    const types: DynamicFormInputType[] = [
      { type: 'inputType', component: null, libraryName },
      { type: 'inputType', component: null, libraryName },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormInputs(...types)),
      });
    });

    it('provides DYNAMIC_FORM_INPUT_TYPE_CONFIG', inject([DYNAMIC_FORM_INPUT_TYPE_CONFIG], (config: DynamicFormInputTypeConfig) => {
      expect(config.length).toBe(2);
      expect(config).toEqual(types);
    }));
  });

  describe('withFieldWrapper', () => {
    const libraryName = 'test';
    const type: DynamicFormFieldWrapperType = { type: 'fieldWrapperType', component: null, libraryName };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormFieldWrappers(type)),
      });
    });

    it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG],
      (config: DynamicFormFieldWrapperTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(type);
      },
    ));
  });

  describe('withFieldWrappers', () => {
    const libraryName = 'test';
    const types: DynamicFormFieldWrapperType[] = [
      { type: 'fieldWrapperType', component: null, libraryName },
      { type: 'fieldWrapperType', component: null, libraryName },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormFieldWrappers(...types)),
      });
    });

    it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_FIELD_WRAPPER_TYPE_CONFIG],
      (config: DynamicFormFieldWrapperTypeConfig) => {
        expect(config.length).toBe(2);
        expect(config).toEqual(types);
      },
    ));
  });
});
