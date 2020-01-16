import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormElementType, DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldType, DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapperType, DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-config';
import { DynamicFormInputType, DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationConfig, DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormConfigModule } from './dynamic-form-config.module';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

describe('DynamicFormConfigModule', () => {
  describe('without providers', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.get(DYNAMIC_FORM_LIBRARY)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.get(DynamicFormConfigService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormBuilder', () => {
      expect(() => TestBed.get(DynamicFormBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormExpressionBuilder', () => {
      expect(() => TestBed.get(DynamicFormExpressionBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.get(DynamicFormEvaluationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationBuilder', () => {
      expect(() => TestBed.get(DynamicFormValidationBuilder)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.get(DynamicFormValidationService)).toThrowError(/StaticInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.get(DynamicFormComponentFactory)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('forLibrary', () => {
    const lib = 'test';

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.forLibrary(lib)
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toBe(lib);
      })
    );
  });

  describe('withValidation', () => {
    const config: DynamicFormValidationConfig = { library: 'test',  defaultMessage: 'message', messages: {} };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withValidation(config)
        ]
      });
    }));

    it('provides DYNAMIC_FORM_VALIDATION_CONFIGS',
      inject([DYNAMIC_FORM_VALIDATION_CONFIGS], (configs: DynamicFormValidationConfigs) => {
        expect(configs.length).toBe(1);
        expect(configs[0]).toEqual(config);
      })
    );
  });

  describe('withElement', () => {
    const type: DynamicFormElementType = { library: 'test', type: 'elementType', component: null };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withElement(type)
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
    const type: DynamicFormFieldType = { library: 'test', type: 'fieldType', component: null };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withField(type)
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

  describe('withInput', () => {
    const type: DynamicFormInputType = { library: 'test', type: 'inputType', component: null };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withInput(type)
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
    const type: DynamicFormFieldWrapperType = { library: 'test', type: 'fieldWrapperType', component: null };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormConfigModule.withFieldWrapper(type)
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
