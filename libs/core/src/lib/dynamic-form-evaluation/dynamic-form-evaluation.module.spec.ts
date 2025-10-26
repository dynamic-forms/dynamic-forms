import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormControlEvaluatorType } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import {
  DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
  DynamicFormControlEvaluatorTypeConfig,
} from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';
import { withDynamicFormControlEvaluators } from './dynamic-form-evaluation.module';

describe('DynamicFormEvaluationModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
    });

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormEvaluationBuilder)).toThrowError();
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
          DynamicFormEvaluationBuilder,
        ],
      });
    });

    it('provides DynamicFormEvaluationBuilder', inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('withControlEvaluator', () => {
    const controlEvaluatorType: DynamicFormControlEvaluatorType = {
      type: 'evaluator',
      func: null,
      libraryName: 'test',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormControlEvaluators(controlEvaluatorType)),
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG],
      (config: DynamicFormControlEvaluatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(controlEvaluatorType);
      },
    ));
  });

  describe('withControlEvaluators', () => {
    const controlEvaluatorTypes: DynamicFormControlEvaluatorType[] = [
      { type: 'evaluator1', func: null, libraryName: 'test' },
      { type: 'evaluator2', func: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormControlEvaluators(...controlEvaluatorTypes)),
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG', inject(
      [DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG],
      (config: DynamicFormControlEvaluatorTypeConfig) => {
        expect(config.length).toBe(2);
        expect(config).toEqual(controlEvaluatorTypes);
      },
    ));
  });
});
