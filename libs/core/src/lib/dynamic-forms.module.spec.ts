import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionService } from './dynamic-form-action/dynamic-form-action.service';
import { DynamicFormConfigService } from './dynamic-form-config/dynamic-form-config.service';
import { dynamicFormLibrary, DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-config/dynamic-form-library';
import { DYNAMIC_FORM_ELEMENT_TYPES } from './dynamic-form-element/dynamic-form-element-type';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression/dynamic-form-expression.builder';
import { DYNAMIC_FORM_FIELD_TYPES } from './dynamic-form-field/dynamic-form-field-type';
import { DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from './dynamic-form-field/dynamic-form-field-wrapper-type';
import { DYNAMIC_FORM_INPUT_TYPES } from './dynamic-form-input/dynamic-form-input-type';
import { DYNAMIC_FORM_VALIDATION_CONFIGS } from './dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormValidationBuilder } from './dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormValidationService } from './dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from './dynamic-form/dynamic-form-component.factory';
import { DynamicFormBuilder } from './dynamic-form/dynamic-form.builder';
import { DynamicFormsModule } from './dynamic-forms.module';

describe('DynamicFormsModule', () => {
  describe('without DYNAMIC_FORM_LIBRARY provided', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormsModule
        ]
      });
    }));

    it('does not provide DYNAMIC_FORM_LIBRARY', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_LIBRARY)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_ELEMENT_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_ELEMENT_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_INPUT_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_INPUT_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_WRAPPER_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_VALIDATION_CONFIGS', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_VALIDATION_CONFIGS)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormConfigService', () => {
      expect(() => TestBed.inject(DynamicFormConfigService)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormBuilder', () => {
      expect(() => TestBed.inject(DynamicFormBuilder)).toThrowError(/NullInjectorError/);
    });

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormEvaluationBuilder',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('does not provide DynamicFormValidationService', () => {
      expect(() => TestBed.inject(DynamicFormValidationService)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormComponentFactory', () => {
      expect(() => TestBed.inject(DynamicFormComponentFactory)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormActionService', () => {
      expect(() => TestBed.get(DynamicFormActionService)).toThrowError(/StaticInjectorError/);
    });
  });

  describe('with DYNAMIC_FORM_LIBRARY provided', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormsModule
        ],
        providers: [
          {
            provide: DYNAMIC_FORM_LIBRARY,
            useValue: dynamicFormLibrary
          }
        ]
      });
    }));

    it('provides DYNAMIC_FORM_LIBRARY',
      inject([DYNAMIC_FORM_LIBRARY], (library: DynamicFormLibrary) => {
        expect(library).toEqual(dynamicFormLibrary);
      })
    );

    it('does not provide DYNAMIC_FORM_ELEMENT_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_ELEMENT_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_INPUT_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_INPUT_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_FIELD_WRAPPER_TYPES', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DYNAMIC_FORM_VALIDATION_CONFIGS', () => {
      expect(() => TestBed.inject(DYNAMIC_FORM_VALIDATION_CONFIGS)).toThrowError(/NullInjectorError/);
    });

    it('provides DynamicFormConfigService',
      inject([DynamicFormConfigService], (service: DynamicFormConfigService) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormBuilder',
      inject([DynamicFormBuilder], (service: DynamicFormBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormExpressionBuilder',
      inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormEvaluationBuilder',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormValidationBuilder',
      inject([DynamicFormValidationBuilder], (service: DynamicFormValidationBuilder) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormValidationService',
      inject([DynamicFormValidationService], (service: DynamicFormValidationService) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormComponentFactory',
      inject([DynamicFormComponentFactory], (service: DynamicFormComponentFactory) => {
        expect(service).toBeDefined();
      })
    );

    it('provides DynamicFormActionService',
      inject([DynamicFormActionService], (service: DynamicFormActionService) => {
        expect(service).toBeDefined();
      })
    );
  });
});
