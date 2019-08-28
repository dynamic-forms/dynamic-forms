import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormEvaluationBuilder } from './dynamic-form-evaluation.builder';

describe('DynamicFormEvaluationBuilder', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormEvaluationBuilder
      ]
    });
  }));

  it('has control evaluations', () => {
    const controlEvaluations = DynamicFormEvaluationBuilder.controlEvaluations;

    expect(controlEvaluations).toBeTruthy();
  });

  it('returns control validators being empty',
    inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
      const definition = <DynamicFormControlDefinition>{};
      const evaluators = service.createControlEvaluators(definition);

      expect(evaluators).toEqual([]);
    })
  );

  it('returns control validators being empty if input type does not fit evaluator type',
    inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
      const template = { input: { type: 'textbox' } };
      const evaluations = [ { key: 'select' }];
      const definition = <DynamicFormControlDefinition>{ template, evaluations };
      const evaluators = service.createControlEvaluators(definition);

      expect(evaluators).toEqual([]);
    })
  );

  it('returns control validators being predefined',
    inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
      const template = { input: { type: 'select' } };
      const evaluations = [ { key: 'select' }];
      const definition = <DynamicFormControlDefinition>{ template, evaluations };
      const evaluators = service.createControlEvaluators(definition);

      expect(evaluators.length).toBe(1);
      expect(evaluators[0]).toBeTruthy();
    })
  );

  it('returns control validators from definition',
    inject([DynamicFormEvaluationBuilder], (service: DynamicFormEvaluationBuilder) => {
      const template = { input: { type: 'select' } };
      const evaluations = [ { func: _field => {} }];
      const definition = <DynamicFormControlDefinition>{ template, evaluations };
      const evaluators = service.createControlEvaluators(definition);

      expect(evaluators.length).toBe(1);
      expect(evaluators[0]).toBeTruthy();
    })
  );
});
