import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormControlEvaluatorType } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import { DynamicFormControlEvaluatorTypeConfig,
  DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';
import { DynamicFormEvaluationModule } from './dynamic-form-evaluation.module';

describe('DynamicFormEvaluationModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormEvaluationModule
        ]
      });
    });

    it('does not provide DynamicFormEvaluationBuilder', () => {
      expect(() => TestBed.inject(DynamicFormEvaluationBuilder)).toThrowError(/NullInjectorError/);
    });
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormEvaluationModule
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DynamicFormEvaluationBuilder',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        expect(service).toBeTruthy();
      })
    );
  });

  describe('withControlEvaluator', () => {
    const controlEvaluatorType: DynamicFormControlEvaluatorType = {
      type: 'evaluator',
      func: null,
      libraryName: 'test'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormEvaluationModule.withControlEvaluator(controlEvaluatorType)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG], (config: DynamicFormControlEvaluatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(controlEvaluatorType);
      })
    );
  });

  describe('withControlEvaluators', () => {
    const controlEvaluatorTypes: DynamicFormControlEvaluatorType[] = [
      { type: 'evaluator1', func: null, libraryName: 'test' },
      { type: 'evaluator2', func: null, libraryName: 'test' },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          DynamicFormEvaluationModule.withControlEvaluators(controlEvaluatorTypes)
        ],
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' })
          }
        ]
      });
    });

    it('provides DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG',
      inject([DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG], (config: DynamicFormControlEvaluatorTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toEqual(controlEvaluatorTypes);
      })
    );
  });
});
