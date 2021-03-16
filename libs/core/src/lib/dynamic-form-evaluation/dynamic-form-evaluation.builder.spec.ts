import { inject, TestBed } from '@angular/core/testing';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { dynamicFormControlEvaluatorTypes } from '../dynamic-form-control/dynamic-form-control-evaluator-type';
import { DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-evaluator-type-config';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';

describe('DynamicFormEvaluationBuilder', () => {
  describe('with DynamicFormLibraryService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService(dynamicFormLibrary)
          },
          {
            provide: DYNAMIC_FORM_CONTROL_EVALUATOR_TYPE_CONFIG,
            useValue: dynamicFormControlEvaluatorTypes
          },
          DynamicFormEvaluationBuilder
        ]
      });
    });

    it('returns control validators being empty',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const definition = {} as DynamicFormControlDefinition;
        const control = { definition } as DynamicFormControl;
        const controlEvaluators = service.createControlEvaluators(control);

        expect(controlEvaluators).toEqual([]);
      })
    );

    it('returns control validators being empty if evaluator type not found',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const definition = { evaluators: { options: { type: 'select' } } } as DynamicFormControlDefinition;
        const control = { definition, inputType: 'select' } as DynamicFormControl;
        const controlEvaluators = service.createControlEvaluators(control);

        expect(controlEvaluators).toEqual([]);
      })
    );

    it('returns control validators not being enabled',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const definition = { evaluators: { options: { type: 'selectOptions' } } } as DynamicFormControlDefinition;
        const control = { definition, inputType: 'textbox' } as DynamicFormControl;
        const controlEvaluators = service.createControlEvaluators(control);

        expect(controlEvaluators.length).toBe(1);
        expect(controlEvaluators[0].enabled).toBeFalsy();
      })
    );

    it('returns control validators being enabled',
      inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
        const definition = { evaluators: { options: { type: 'selectOptions' } } } as DynamicFormControlDefinition;
        const control = { definition, inputType: 'select' } as DynamicFormControl;
        const controlEvaluators = service.createControlEvaluators(control);

        expect(controlEvaluators.length).toBe(1);
        expect(controlEvaluators[0].enabled).toBeTruthy();
      })
    );
  });
});
