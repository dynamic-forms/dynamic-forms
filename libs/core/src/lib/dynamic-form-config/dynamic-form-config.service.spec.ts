import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { dynamicFormLibrary, DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

describe('DynamicFormConfigService', () => {
  describe('with DYNAMIC_FORM_LIBRARY', () => {
    const library: DynamicFormLibrary = 'test';

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
        expect(service.elementTypes).toEqual([]);
        expect(service.fieldTypes).toEqual([]);
        expect(service.inputTypes).toEqual([]);
        expect(service.fieldWrapperTypes).toEqual([]);
        expect(service.validationConfig).toEqual({ defaultMessage: undefined, messages: {}, library });
      })
    );

    it('returns DynamicElementType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('element');

        expect(elementType).toBeUndefined();
      })
    );

    it('returns DynamicFieldType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('field');

        expect(fieldType).toBeUndefined();
      })
    );

    it('returns DynamicFormInputType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input');

        expect(inputType).toBeUndefined();
      })
    );

    it('returns DynamicFieldWrapperType being undefined',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldWrapperType = service.getFieldWrapperType('field-wrapper');

        expect(fieldWrapperType).toBeUndefined();
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY and configs for single library', () => {
    const library: DynamicFormLibrary = 'test';
    const elementTypes: DynamicFormElementTypes = [
      { type: 'element', component: null, library }
    ];
    const fieldTypes: DynamicFormFieldTypes = [
      { type: 'field', component: null, library }
    ];
    const inputTypes: DynamicFormInputTypes = [
      { type: 'input', component: null, library }
    ];
    const fieldWrapperTypes: DynamicFormFieldWrapperTypes = [
      { type: 'field-wrapper', component: null, library }
    ];
    const validationConfigs: DynamicFormValidationConfigs = [
      { defaultMessage: 'message', messages: {}, library }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
          { provide: DYNAMIC_FORM_ELEMENT_TYPES, useValue: elementTypes },
          { provide: DYNAMIC_FORM_FIELD_TYPES, useValue: fieldTypes },
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
        expect(service.elementTypes).toEqual(elementTypes);
        expect(service.fieldTypes).toEqual(fieldTypes);
        expect(service.inputTypes).toEqual(inputTypes);
        expect(service.fieldWrapperTypes).toEqual(fieldWrapperTypes);
        expect(service.validationConfig).toEqual(validationConfigs[0]);
      })
    );

    it('returns DynamicElementType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const elementType = service.getElementType('element');

        expect(elementType).toEqual(elementTypes[0]);
      })
    );

    it('returns DynamicFieldType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldType = service.getFieldType('field');

        expect(fieldType).toEqual(fieldTypes[0]);
      })
    );

    it('returns DynamicFormInputType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const inputType = service.getInputType('input');

        expect(inputType).toEqual(inputTypes[0]);
      })
    );

    it('returns DynamicFieldWrapperType',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        const fieldWrapperType = service.getFieldWrapperType('field-wrapper');

        expect(fieldWrapperType).toEqual(fieldWrapperTypes[0]);
      })
    );
  });

  describe('with DYNAMIC_FORM_LIBRARY and configs for multiple libraries', () => {
    const coreLibrary: DynamicFormLibrary = dynamicFormLibrary;
    const otherLibrary: DynamicFormLibrary = 'other';
    const library: DynamicFormLibrary = 'test';

    const elementTypes: DynamicFormElementTypes = [
      { type: 'element-1', component: null, library: coreLibrary },
      { type: 'element-2', component: null, library: coreLibrary },
      { type: 'element-1', component: null, library: otherLibrary },
      { type: 'element-2', component: null, library: otherLibrary },
      { type: 'element-3', component: null, library: otherLibrary },
      { type: 'element-1', component: null, library: library }
    ];
    const fieldTypes: DynamicFormFieldTypes = [
      { type: 'field-1', component: null, library: coreLibrary },
      { type: 'field-2', component: null, library: coreLibrary },
      { type: 'field-1', component: null, library: otherLibrary },
      { type: 'field-2', component: null, library: otherLibrary },
      { type: 'field-3', component: null, library: otherLibrary },
      { type: 'field-1', component: null, library: library },
    ];
    const inputTypes: DynamicFormInputTypes = [
      { type: 'input-1', component: null, library: coreLibrary },
      { type: 'input-2', component: null, library: coreLibrary },
      { type: 'input-1', component: null, library: otherLibrary },
      { type: 'input-2', component: null, library: otherLibrary },
      { type: 'input-3', component: null, library: otherLibrary },
      { type: 'input-1', component: null, library: library },
    ];
    const fieldWrapperTypes: DynamicFormFieldWrapperTypes = [
      { type: 'field-wrapper-1', component: null, library: coreLibrary },
      { type: 'field-wrapper-2', component: null, library: coreLibrary },
      { type: 'field-wrapper-1', component: null, library: otherLibrary },
      { type: 'field-wrapper-2', component: null, library: otherLibrary },
      { type: 'field-wrapper-3', component: null, library: otherLibrary },
      { type: 'field-wrapper-1', component: null, library: library },
    ];
    const validationConfigs: DynamicFormValidationConfigs = [
      { defaultMessage: 'message', messages: {}, library: library }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: DYNAMIC_FORM_LIBRARY, useValue: library },
          { provide: DYNAMIC_FORM_ELEMENT_TYPES, useValue: elementTypes },
          { provide: DYNAMIC_FORM_FIELD_TYPES, useValue: fieldTypes },
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
        expect(service.elementTypes).toEqual([
          { type: 'element-2', component: null, library: coreLibrary },
          { type: 'element-1', component: null, library: library }
        ]);
        expect(service.fieldTypes).toEqual([
          { type: 'field-2', component: null, library: coreLibrary },
          { type: 'field-1', component: null, library: library }
        ]);
        expect(service.inputTypes).toEqual([
          { type: 'input-2', component: null, library: coreLibrary },
          { type: 'input-1', component: null, library: library }
        ]);
        expect(service.fieldWrapperTypes).toEqual([
          { type: 'field-wrapper-2', component: null, library: coreLibrary },
          { type: 'field-wrapper-1', component: null, library: library }
        ]);
        expect(service.validationConfig).toEqual(validationConfigs[0]);
      })
    );
  });
});
