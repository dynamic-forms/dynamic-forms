import { async, inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormActionExpressionFunc } from './dynamic-form-action-expression';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression.builder';
import { DynamicFormFieldExpressionFunction } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';

describe('DynamicFormExpressionBuilder', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormExpressionBuilder
      ]
    });
  }));

  it('returns field expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const field = <DynamicFormField>{ definition: {} };
      const fieldExpressions = service.createFieldExpressions(field);

      expect(fieldExpressions).toBeNull();
    })
  );

  it('returns field expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const model = { readonly: false, child: { readonly: false, child: {} } };
      const root = <DynamicFormField>{ model };
      const parent = <DynamicFormField>{ model: model.child };
      const expressionChangesSubject = new Subject();
      const expressionChanges = expressionChangesSubject.asObservable();
      const expressions = <{ [key: string]: string }> {
        'readonly': 'data.root.model.readonly || data.parent.model.readonly'
      };
      const expressionData = <DynamicFormFieldExpressionData>{
        model: model.child.child,
        parent: { model: parent.model },
        root: { model: root.model }
      };
      const definition = <DynamicFormFieldDefinition>{ expressions };
      const field = <DynamicFormField>{ definition, expressionData, expressionChangesSubject, expressionChanges };
      const fieldExpressions = service.createFieldExpressions(field);
      const fieldExpression = fieldExpressions['readonly'];

      expect(fieldExpressions).toBeDefined();
      expect(fieldExpression).toBeDefined();
      expect(fieldExpression.field).toBe(field);
      expect(fieldExpression.func).toEqual(jasmine.any(Function));
      expect(fieldExpression.value).toBe(false);

      model.readonly = true;

      expect(fieldExpression.value).toBe(true);
    })
  );

  it('returns field expressions from function',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const model = { readonly: false, child: { readonly: false, child: {} } };
      const root = <DynamicFormField>{ model };
      const parent = <DynamicFormField>{ model: model.child };
      const func = (data: DynamicFormFieldExpressionData, _memo: DynamicFormExpressionMemoization) =>
        data.root.model.readonly || data.parent.model.readonly;
      const expressionChangesSubject = new Subject();
      const expressionChanges = expressionChangesSubject.asObservable();
      const expressions = <{ [key: string]: DynamicFormFieldExpressionFunction }> {
        'readonly': func
      };
      const expressionData = <DynamicFormFieldExpressionData>{
        model: model.child.child,
        parent: { model: parent.model },
        root: { model: root.model }
      };
      const definition = <DynamicFormFieldDefinition>{ expressions };
      const field = <DynamicFormField>{ definition, expressionData, expressionChangesSubject, expressionChanges };
      const fieldExpressions = service.createFieldExpressions(field);
      const fieldExpression = fieldExpressions['readonly'];

      expect(fieldExpressions).toBeDefined();
      expect(fieldExpression).toBeDefined();
      expect(fieldExpression.field).toBe(field);
      expect(fieldExpression.func).toEqual(func);
      expect(fieldExpression.value).toBe(false);

      model.readonly = true;

      expect(fieldExpression.value).toBe(true);
    })
  );

  it('returns action expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const action = <DynamicFormAction>{ definition: {} };
      const actionExpressions = service.createActionExpressions(action);

      expect(actionExpressions).toBeNull();
    })
  );

  it('returns action expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const root = { status: 'INVALID' };
      const parent = { status: 'VALID' };
      const expressionData = { root, parent };
      const expressions = <{ [key: string]: string }> {
        'disabled': 'data.parent.status === "VALID" && data.root.status === "VALID"'
      };
      const definition = <DynamicFormActionDefinition>{ expressions };
      const action = <DynamicFormAction>{ definition, expressionData };
      const actionExpressions = service.createActionExpressions(action);
      const actionExpression = actionExpressions['disabled'];

      expect(actionExpressions).toBeDefined();
      expect(actionExpression).toBeDefined();
      expect(actionExpression.action).toBe(action);
      expect(actionExpression.func).toEqual(jasmine.any(Function));
      expect(actionExpression.value).toBe(false);

      root.status = 'VALID';

      expect(actionExpression.value).toBe(true);
    })
  );

  it('returns action expressions from function',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const root = { status: 'INVALID' };
      const parent = { status: 'VALID' };
      const expressionData = { root, parent };
      const expressions = <{ [key: string]: DynamicFormActionExpressionFunc }> {
        'disabled': (data) => {
          return data.parent.status === 'VALID' && data.root.status === 'VALID';
        }
      };
      const definition = <DynamicFormActionDefinition>{ expressions };
      const action = <DynamicFormAction>{ definition, expressionData };
      const actionExpressions = service.createActionExpressions(action);
      const actionExpression = actionExpressions['disabled'];

      expect(actionExpressions).toBeDefined();
      expect(actionExpression).toBeDefined();
      expect(actionExpression.action).toBe(action);
      expect(actionExpression.func).toEqual(jasmine.any(Function));
      expect(actionExpression.value).toBe(false);

      root.status = 'VALID';

      expect(actionExpression.value).toBe(true);
    })
  );
});
