import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionType, DYNAMIC_FORM_ACTION_CONFIG } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementType, DYNAMIC_FORM_ELEMENT_CONFIG } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldType, DYNAMIC_FORM_FIELD_CONFIG } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperType, DYNAMIC_FORM_FIELD_WRAPPER_CONFIG } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputType, DYNAMIC_FORM_INPUT_CONFIG } from '../dynamic-form-input/dynamic-form-input-type';
import { dynamicFormLibrary, DynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormConfigService } from './dynamic-form-config.service';

describe('DynamicFormConfigService', () => {
  describe('with DynamicFormLibraryService', () => {
    const libraryName: DynamicFormLibraryName = 'text';
    const library: DynamicFormLibrary = { name: libraryName };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(library)
          },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns types being empty',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.elementTypes).toEqual([]);
        expect(service.actionTypes).toEqual([]);
        expect(service.fieldTypes).toEqual([]);
        expect(service.inputTypes).toEqual([]);
        expect(service.fieldWrapperTypes).toEqual([]);
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

  describe('with DynamicFormLibraryService and types for single library', () => {
    const libraryName: DynamicFormLibraryName = 'test';
    const library: DynamicFormLibrary = { name: libraryName };
    const elementTypes: DynamicFormElementType[] = [{ type: 'element', component: null, libraryName }];
    const fieldTypes: DynamicFormFieldType[] = [{ type: 'field', factory: null, component: null, libraryName }];
    const actionTypes: DynamicFormActionType[] = [{ type: 'action', component: null, libraryName }];
    const inputTypes: DynamicFormInputType[] = [{ type: 'input', component: null, libraryName }];
    const fieldWrapperTypes: DynamicFormFieldWrapperType[] = [{ type: 'field-wrapper', component: null, libraryName }];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(library)
          },
          { provide: DYNAMIC_FORM_ELEMENT_CONFIG, useValue: elementTypes },
          { provide: DYNAMIC_FORM_FIELD_CONFIG, useValue: fieldTypes },
          { provide: DYNAMIC_FORM_ACTION_CONFIG, useValue: actionTypes },
          { provide: DYNAMIC_FORM_INPUT_CONFIG, useValue: inputTypes },
          { provide: DYNAMIC_FORM_FIELD_WRAPPER_CONFIG, useValue: fieldWrapperTypes },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns provided types',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service.elementTypes).toEqual(elementTypes);
        expect(service.fieldTypes).toEqual(fieldTypes);
        expect(service.actionTypes).toEqual(actionTypes);
        expect(service.inputTypes).toEqual(inputTypes);
        expect(service.fieldWrapperTypes).toEqual(fieldWrapperTypes);
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

  describe('with DynamicFormLibraryService and types for multiple libraries', () => {
    const coreLibraryName: DynamicFormLibraryName = dynamicFormLibrary.name;
    const otherLibraryName: DynamicFormLibraryName = 'other';
    const libraryName: DynamicFormLibraryName = 'test';
    const library: DynamicFormLibrary = { name: libraryName, references: [ coreLibraryName ] };

    const elementTypes: DynamicFormElementType[] = [
      { type: 'element-1', component: null, libraryName: coreLibraryName },
      { type: 'element-2', component: null, libraryName: coreLibraryName },
      { type: 'element-1', component: null, libraryName: otherLibraryName },
      { type: 'element-2', component: null, libraryName: otherLibraryName },
      { type: 'element-3', component: null, libraryName: otherLibraryName },
      { type: 'element-1', component: null, libraryName: libraryName }
    ];
    const fieldTypes: DynamicFormFieldType[] = [
      { type: 'field-1', factory: null, component: null, libraryName: coreLibraryName },
      { type: 'field-2', factory: null, component: null, libraryName: coreLibraryName },
      { type: 'field-1', factory: null, component: null, libraryName: otherLibraryName },
      { type: 'field-2', factory: null, component: null, libraryName: otherLibraryName },
      { type: 'field-3', factory: null, component: null, libraryName: otherLibraryName },
      { type: 'field-1', factory: null, component: null, libraryName: libraryName },
    ];
    const actionTypes: DynamicFormActionType[] = [
      { type: 'action-1', component: null, libraryName: coreLibraryName },
      { type: 'action-2', component: null, libraryName: coreLibraryName },
      { type: 'action-1', component: null, libraryName: otherLibraryName },
      { type: 'action-2', component: null, libraryName: otherLibraryName },
      { type: 'action-3', component: null, libraryName: otherLibraryName },
      { type: 'action-1', component: null, libraryName: libraryName },
    ];
    const inputTypes: DynamicFormInputType[] = [
      { type: 'input-1', component: null, libraryName: coreLibraryName },
      { type: 'input-2', component: null, libraryName: coreLibraryName },
      { type: 'input-1', component: null, libraryName: otherLibraryName },
      { type: 'input-2', component: null, libraryName: otherLibraryName },
      { type: 'input-3', component: null, libraryName: otherLibraryName },
      { type: 'input-1', component: null, libraryName: libraryName },
    ];
    const fieldWrapperTypes: DynamicFormFieldWrapperType[] = [
      { type: 'field-wrapper-1', component: null, libraryName: coreLibraryName },
      { type: 'field-wrapper-2', component: null, libraryName: coreLibraryName },
      { type: 'field-wrapper-1', component: null, libraryName: otherLibraryName },
      { type: 'field-wrapper-2', component: null, libraryName: otherLibraryName },
      { type: 'field-wrapper-3', component: null, libraryName: otherLibraryName },
      { type: 'field-wrapper-1', component: null, libraryName: libraryName },
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(library)
          },
          { provide: DYNAMIC_FORM_ELEMENT_CONFIG, useValue: elementTypes },
          { provide: DYNAMIC_FORM_FIELD_CONFIG, useValue: fieldTypes },
          { provide: DYNAMIC_FORM_ACTION_CONFIG, useValue: actionTypes },
          { provide: DYNAMIC_FORM_INPUT_CONFIG, useValue: inputTypes },
          { provide: DYNAMIC_FORM_FIELD_WRAPPER_CONFIG, useValue: fieldWrapperTypes },
          DynamicFormConfigService
        ]
      });
    }));

    it('returns provided types being filtered and merged',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
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
      })
    );
  });
});
