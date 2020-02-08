import { async, inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormActionExpressionFunction } from './dynamic-form-action-expression';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression.builder';
import { DynamicFormFieldExpressionFunction } from './dynamic-form-field-expression';

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
        'readonly': 'rootModel.readonly || parentModel.readonly'
      };
      const definition = <DynamicFormFieldDefinition>{ expressions };
      const field = <DynamicFormField>{
        root, parent, definition, model: model.child.child,
        expressionChangesSubject, expressionChanges
      };
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
      const func = (_model: any, parentModel: any, rootModel: any, _memo: DynamicFormExpressionMemoization) =>
        rootModel.readonly || parentModel.readonly;
      const expressionChangesSubject = new Subject();
      const expressionChanges = expressionChangesSubject.asObservable();
      const expressions = <{ [key: string]: DynamicFormFieldExpressionFunction }> {
        'readonly': func
      };
      const definition = <DynamicFormFieldDefinition>{ expressions };
      const field = <DynamicFormField>{
        root, parent, definition, model: model.child.child,
        expressionChangesSubject, expressionChanges
      };
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
      const expressions = <{ [key: string]: string }> {
        'disabled': 'parentStatus === "VALID" && rootStatus === "VALID"'
      };
      const definition = <DynamicFormActionDefinition>{ expressions };
      const action = <DynamicFormAction>{ root, parent, definition };
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
      const expressions = <{ [key: string]: DynamicFormActionExpressionFunction }> {
        'disabled': (parentStatus, rootStatus) => {
          return parentStatus === 'VALID' && rootStatus === 'VALID';
        }
      };
      const definition = <DynamicFormActionDefinition>{ expressions };
      const action = <DynamicFormAction>{ root, parent, definition };
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
