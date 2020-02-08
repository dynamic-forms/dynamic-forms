import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { dynamicFormLibrary, DynamicFormLibrary, DynamicFormLibraryName, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

describe('DynamicFormConfigService', () => {
  describe('with DYNAMIC_FORM_LIBRARY', () => {
    const libraryName: DynamicFormLibraryName = 'text';
    const library: DynamicFormLibrary = { name: libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: library
          },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns DynamicFormConfigService with configs being empty',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ libraryName ]);
        expect(service.elementTypes).toEqual([]);
        expect(service.actionTypes).toEqual([]);
        expect(service.fieldTypes).toEqual([]);
        expect(service.inputTypes).toEqual([]);
        expect(service.fieldWrapperTypes).toEqual([]);
        expect(service.validationConfig).toEqual({ defaultMessage: undefined, messages: {}, libraryName });
      })
    );

    it('returns DynamicFormClassType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const classType1 = service.getClassType('element');
        const classType2 = service.getClassType('field');
        const classType3 = service.getClassType('action');
        const classType4 = service.getClassType('input');
        const classType5 = service.getClassType('field-wrapper');

        expect(classType1).toBeUndefined();
        expect(classType2).toBeUndefined();
        expect(classType3).toBeUndefined();
        expect(classType4).toBeUndefined();
        expect(classType5).toBeUndefined();
      })
    );

    it('returns DynamicFormElementType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('element');

        expect(elementType).toBeUndefined();
      })
    );

    it('returns DynamicFormFieldType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('field');

        expect(fieldType).toBeUndefined();
      })
    );

    it('returns DynamicFormActionType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const actionType = service.getActionType('action');

        expect(actionType).toBeUndefined();
      })
    );

    it('returns DynamicFormInputType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input');

        expect(inputType).toBeUndefined();
      })
    );

    it('returns DynamicFormFieldWrapperType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldWrapperType = service.getFieldWrapperType('field-wrapper');

        expect(fieldWrapperType).toBeUndefined();
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY and configs for single library', () => {
    const libraryName: DynamicFormLibraryName = 'text';
    const library: DynamicFormLibrary = { name: libraryName };
    const elementTypes: DynamicFormElementTypes = [{ type: 'element', component: null, libraryName }];
    const fieldTypes: DynamicFormFieldTypes = [{ type: 'field', factory: null, component: null, libraryName }];
    const actionTypes: DynamicFormActionTypes = [{ type: 'action', component: null, libraryName }];
    const inputTypes: DynamicFormInputTypes = [{ type: 'input', component: null, libraryName }];
    const fieldWrapperTypes: DynamicFormFieldWrapperTypes = [{ type: 'field-wrapper', component: null, libraryName }];
    const validationConfigs: DynamicFormValidationConfigs = [{ defaultMessage: 'message', messages: {}, libraryName }];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
          { provide: DYNAMIC_FORM_ELEMENT_TYPES, useValue: elementTypes },
          { provide: DYNAMIC_FORM_FIELD_TYPES, useValue: fieldTypes },
          { provide: DYNAMIC_FORM_ACTION_TYPES, useValue: actionTypes },
          { provide: DYNAMIC_FORM_INPUT_TYPES, useValue: inputTypes },
          { provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPES, useValue: fieldWrapperTypes },
          { provide: DYNAMIC_FORM_VALIDATION_CONFIGS, useValue: validationConfigs },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ libraryName ]);
        expect(service.elementTypes).toEqual(elementTypes);
        expect(service.fieldTypes).toEqual(fieldTypes);
        expect(service.actionTypes).toEqual(actionTypes);
        expect(service.inputTypes).toEqual(inputTypes);
        expect(service.fieldWrapperTypes).toEqual(fieldWrapperTypes);
        expect(service.validationConfig).toEqual(validationConfigs[0]);
      })
    );

    it('returns DynamicFormClassType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const classType1 = service.getClassType('element');
        const classType2 = service.getClassType('field');
        const classType3 = service.getClassType('action');
        const classType4 = service.getClassType('input');
        const classType5 = service.getClassType('field-wrapper');

        expect(classType1).toBe('element');
        expect(classType2).toBe('field');
        expect(classType3).toBe('action');
        expect(classType4).toBeUndefined();
        expect(classType5).toBeUndefined();
      })
    );

    it('returns DynamicFormElementType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('element');

        expect(elementType).toEqual(elementTypes[0]);
      })
    );

    it('returns DynamicFormFieldType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('field');

        expect(fieldType).toEqual(fieldTypes[0]);
      })
    );

    it('returns DynamicFormActionType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const actionType = service.getActionType('action');

        expect(actionType).toEqual(actionTypes[0]);
      })
    );

    it('returns DynamicFormInputType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input');

        expect(inputType).toEqual(inputTypes[0]);
      })
    );

    it('returns DynamicFormFieldWrapperType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldWrapperType = service.getFieldWrapperType('field-wrapper');

        expect(fieldWrapperType).toEqual(fieldWrapperTypes[0]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY and configs for multiple libraries', () => {
    const coreLibraryName: DynamicFormLibraryName = dynamicFormLibrary.name;
    const otherLibraryName: DynamicFormLibraryName = 'other';
    const libraryName: DynamicFormLibraryName = 'test';
    const library: DynamicFormLibrary = { name: libraryName, references: [ coreLibraryName ] };

    const elementTypes: DynamicFormElementTypes = [
      { type: 'element-1', component: null, libraryName: coreLibraryName },
      { type: 'element-2', component: null, libraryName: coreLibraryName },
      { type: 'element-1', component: null, libraryName: otherLibraryName },
      { type: 'element-2', component: null, libraryName: otherLibraryName },
      { type: 'element-3', component: null, libraryName: otherLibraryName },
      { type: 'element-1', component: null, libraryName: libraryName }
    ];
    const fieldTypes: DynamicFormFieldTypes = [
      { type: 'field-1', factory: null, component: null, libraryName: coreLibraryName },
      { type: 'field-2', factory: null, component: null, libraryName: coreLibraryName },
      { type: 'field-1', factory: null, component: null, libraryName: otherLibraryName },
      { type: 'field-2', factory: null, component: null, libraryName: otherLibraryName },
      { type: 'field-3', factory: null, component: null, libraryName: otherLibraryName },
      { type: 'field-1', factory: null, component: null, libraryName: libraryName },
    ];
    const actionTypes: DynamicFormActionTypes = [
      { type: 'action-1', component: null, libraryName: coreLibraryName },
      { type: 'action-2', component: null, libraryName: coreLibraryName },
      { type: 'action-1', component: null, libraryName: otherLibraryName },
      { type: 'action-2', component: null, libraryName: otherLibraryName },
      { type: 'action-3', component: null, libraryName: otherLibraryName },
      { type: 'action-1', component: null, libraryName: libraryName },
    ];
    const inputTypes: DynamicFormInputTypes = [
      { type: 'input-1', component: null, libraryName: coreLibraryName },
      { type: 'input-2', component: null, libraryName: coreLibraryName },
      { type: 'input-1', component: null, libraryName: otherLibraryName },
      { type: 'input-2', component: null, libraryName: otherLibraryName },
      { type: 'input-3', component: null, libraryName: otherLibraryName },
      { type: 'input-1', component: null, libraryName: libraryName },
    ];
    const fieldWrapperTypes: DynamicFormFieldWrapperTypes = [
      { type: 'field-wrapper-1', component: null, libraryName: coreLibraryName },
      { type: 'field-wrapper-2', component: null, libraryName: coreLibraryName },
      { type: 'field-wrapper-1', component: null, libraryName: otherLibraryName },
      { type: 'field-wrapper-2', component: null, libraryName: otherLibraryName },
      { type: 'field-wrapper-3', component: null, libraryName: otherLibraryName },
      { type: 'field-wrapper-1', component: null, libraryName: libraryName },
    ];
    const validationConfigs: DynamicFormValidationConfigs = [
      { defaultMessage: 'message', messages: {}, libraryName: libraryName }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
          { provide: DYNAMIC_FORM_ELEMENT_TYPES, useValue: elementTypes },
          { provide: DYNAMIC_FORM_FIELD_TYPES, useValue: fieldTypes },
          { provide: DYNAMIC_FORM_ACTION_TYPES, useValue: actionTypes },
          { provide: DYNAMIC_FORM_INPUT_TYPES, useValue: inputTypes },
          { provide: DYNAMIC_FORM_FIELD_WRAPPER_TYPES, useValue: fieldWrapperTypes },
          { provide: DYNAMIC_FORM_VALIDATION_CONFIGS, useValue: validationConfigs },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns DynamicFormConfigService with configs being filtered and merged',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.library).toEqual(library);
        expect(service.libraryNames).toEqual([ libraryName, coreLibraryName ]);
        expect(service.elementTypes).toEqual([
          { type: 'element-1', component: null, libraryName: libraryName },
          { type: 'element-2', component: null, libraryName: coreLibraryName }
        ]);
        expect(service.fieldTypes).toEqual([
          { type: 'field-1', factory: null, component: null, libraryName: libraryName },
          { type: 'field-2', factory: null, component: null, libraryName: coreLibraryName }
        ]);
        expect(service.actionTypes).toEqual([
          { type: 'action-1', component: null, libraryName: libraryName },
          { type: 'action-2', component: null, libraryName: coreLibraryName }
        ]);
        expect(service.inputTypes).toEqual([
          { type: 'input-1', component: null, libraryName: libraryName },
          { type: 'input-2', component: null, libraryName: coreLibraryName }
        ]);
        expect(service.fieldWrapperTypes).toEqual([
          { type: 'field-wrapper-1', component: null, libraryName: libraryName },
          { type: 'field-wrapper-2', component: null, libraryName: coreLibraryName }
        ]);
        expect(service.validationConfig).toEqual(validationConfigs[0]);
      })
    );
  });
});
