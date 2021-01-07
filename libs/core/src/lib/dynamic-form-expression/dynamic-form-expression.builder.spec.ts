import { inject, waitForAsync, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormActionExpressionFunc } from './dynamic-form-action-expression';
import { DynamicFormElementExpressionFunc } from './dynamic-form-element-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression.builder';
import { DynamicFormFieldExpressionFunc } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';

describe('DynamicFormExpressionBuilder', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormExpressionBuilder
      ]
    });
  }));

  it('returns element expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const element = <DynamicFormField>{ definition: {} };
      const elementExpressions = service.createElementExpressions(element);

      expect(elementExpressions).toBeNull();
    })
  );

  it('returns element expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const values = [];
      const expressionData = <DynamicFormElementExpressionData>{ values };
      const expressions = <{ [key: string]: string }> {
        'disabled': 'data.values && data.values.length > 0'
      };
      const definition = <DynamicFormElementDefinition>{ expressions };
      const element = <DynamicFormElement>{ definition, expressionData };
      const elementExpressions = service.createElementExpressions(element);
      const elementExpression = elementExpressions['disabled'];

      expect(elementExpressions).toBeDefined();
      expect(elementExpression).toBeDefined();
      expect(elementExpression.element).toBe(element);
      expect(elementExpression.func).toEqual(jasmine.any(Function));
      expect(elementExpression.value).toBe(false);

      values.push('value');

      expect(elementExpression.value).toBe(true);
    })
  );

  it('returns element expressions from function',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const values = [];
      const expressionData = <DynamicFormElementExpressionData>{ values };
      const expressions = <{ [key: string]: DynamicFormElementExpressionFunc  }> {
        'disabled': (data) => {
          return data.values && data.values.length > 0;
        }
      };
      const definition = <DynamicFormElementDefinition>{ expressions };
      const element = <DynamicFormElement>{ definition, expressionData };
      const elementExpressions = service.createElementExpressions(element);
      const elementExpression = elementExpressions['disabled'];

      expect(elementExpressions).toBeDefined();
      expect(elementExpression).toBeDefined();
      expect(elementExpression.element).toBe(element);
      expect(elementExpression.func).toEqual(jasmine.any(Function));
      expect(elementExpression.value).toBe(false);

      values.push('value');

      expect(elementExpression.value).toBe(true);
    })
  );

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
      const expressions = <{ [key: string]: DynamicFormFieldExpressionFunc }> {
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
