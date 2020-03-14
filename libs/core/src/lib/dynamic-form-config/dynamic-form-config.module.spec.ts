import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionType, DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementType, DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldType, DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperType, DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputType, DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormConfigModule } from './dynamic-form-config.module';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule
        ]
      });
    }));

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeDefined();
      })
    );
  });

  describe('withElement', () => {
    const libraryName = 'test';
    const type: DynamicFormElementType = { type: 'elementType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withElement(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ELEMENT_TYPES',
      inject([DYNAMIC_FORM_ELEMENT_TYPES], (types: DynamicFormElementTypes) => {
        expect(types.length).toBe(1);
        expect(types[0]).toEqual(type);
      })
    );
  });

  describe('withField', () => {
    const libraryName = 'test';
    const type: DynamicFormFieldType = { type: 'fieldType', factory: null, component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withField(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_FIELD_TYPES',
      inject([DYNAMIC_FORM_FIELD_TYPES], (types: DynamicFormFieldTypes) => {
        expect(types.length).toBe(1);
        expect(types[0]).toEqual(type);
      })
    );
  });

  describe('withAction', () => {
    const libraryName = 'test';
    const type: DynamicFormActionType = { type: 'actionType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withAction(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_ACTION_TYPES',
      inject([DYNAMIC_FORM_ACTION_TYPES], (types: DynamicFormActionTypes) => {
        expect(types.length).toBe(1);
        expect(types[0]).toEqual(type);
      })
    );
  });

  describe('withInput', () => {
    const libraryName = 'test';
    const type: DynamicFormInputType = { type: 'inputType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withInput(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_INPUT_TYPES',
      inject([DYNAMIC_FORM_INPUT_TYPES], (types: DynamicFormInputTypes) => {
        expect(types.length).toBe(1);
        expect(types[0]).toEqual(type);
      })
    );
  });

  describe('withFieldWrapper', () => {
    const libraryName = 'test';
    const type: DynamicFormFieldWrapperType = { type: 'fieldWrapperType', component: null, libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withFieldWrapper(type)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_FIELD_WRAPPER_TYPES',
      inject([DYNAMIC_FORM_FIELD_WRAPPER_TYPES], (types: DynamicFormFieldWrapperTypes) => {
        expect(types.length).toBe(1);
        expect(types[0]).toEqual(type);
      })
    );
  });
});
