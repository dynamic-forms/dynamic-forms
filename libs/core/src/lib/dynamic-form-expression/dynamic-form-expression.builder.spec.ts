import { inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionExpressionData } from '../dynamic-form-action/dynamic-form-action-expression-data';
import { DynamicFormActionExpressionFunc } from '../dynamic-form-action/dynamic-form-action-expression-func';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementExpressionData } from '../dynamic-form-element/dynamic-form-element-expression-data';
import { DynamicFormElementExpressionFunc } from '../dynamic-form-element/dynamic-form-element-expression-func';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';
import { DynamicFormFieldExpressionFunc } from '../dynamic-form-field/dynamic-form-field-expression-func';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression.builder';

describe('DynamicFormExpressionBuilder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormExpressionBuilder,
      ],
    });
  });

  it('returns element expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const element = { definition: {} } as DynamicFormField;
      const elementExpressions = service.createElementExpressions(element);

      expect(elementExpressions).toBeNull();
    }),
  );

  it('returns element expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const values = [];
      const expressionData = { root: null, parent: null, parentField: null, values } as DynamicFormElementExpressionData;
      const expressions = {
        disabled: 'data.values && data.values.length > 0',
      } as { [key: string]: string };
      const definition = { expressions } as DynamicFormElementDefinition;
      const element = { definition, expressionData } as DynamicFormElement;
      const elementExpressions = service.createElementExpressions(element);
      const elementExpression = elementExpressions['disabled'];

      expect(elementExpressions).toBeTruthy();
      expect(elementExpression).toBeTruthy();
      expect(elementExpression.element).toBe(element);
      expect(elementExpression.func).toEqual(jasmine.any(Function));
      expect(elementExpression.value).toBe(false);

      values.push('value');

      expect(elementExpression.value).toBe(true);
    }),
  );

  it('returns element expressions from function',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const values = [];
      const expressionData = { root: null, parent: null, parentField: null, values } as DynamicFormElementExpressionData;
      const expressions = {
        disabled: (data) => data.values && data.values.length > 0,
      } as { [key: string]: DynamicFormElementExpressionFunc };
      const definition = { expressions } as DynamicFormElementDefinition;
      const element = { definition, expressionData } as DynamicFormElement;
      const elementExpressions = service.createElementExpressions(element);
      const elementExpression = elementExpressions['disabled'];

      expect(elementExpressions).toBeTruthy();
      expect(elementExpression).toBeTruthy();
      expect(elementExpression.element).toBe(element);
      expect(elementExpression.func).toEqual(jasmine.any(Function));
      expect(elementExpression.value).toBe(false);

      values.push('value');

      expect(elementExpression.value).toBe(true);
    }),
  );

  it('returns field expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const field = { definition: {} } as DynamicFormField;
      const fieldExpressions = service.createFieldExpressions(field);

      expect(fieldExpressions).toBeNull();
    }),
  );

  it('returns field expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const model = { readonly: false, child: { readonly: false, child: {} } };
      const root = { model } as DynamicFormField;
      const parent = { model: model.child } as DynamicFormField;
      const expressionChangesSubject = new Subject();
      const expressionChanges = expressionChangesSubject.asObservable();
      const expressions = {
        readonly: 'data.root.model.readonly || data.parentField.model.readonly',
      } as { [key: string]: string };
      const expressionData = {
        root: { model: root.model },
        parent: {},
        parentField: { model: parent.model },
        model: model.child.child,

      } as DynamicFormFieldExpressionData;
      const definition = { expressions } as DynamicFormFieldDefinition;
      const field = { definition, expressionData, expressionChangesSubject, expressionChanges } as DynamicFormField;
      const fieldExpressions = service.createFieldExpressions(field);
      const fieldExpression = fieldExpressions['readonly'];

      expect(fieldExpressions).toBeTruthy();
      expect(fieldExpression).toBeTruthy();
      expect(fieldExpression.field).toBe(field);
      expect(fieldExpression.func).toEqual(jasmine.any(Function));
      expect(fieldExpression.value).toBe(false);

      model.readonly = true;

      expect(fieldExpression.value).toBe(true);
    }),
  );

  it('returns field expressions from function',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const model = { readonly: false, child: { readonly: false, child: {} } };
      const root = { model } as DynamicFormField;
      const parent = { model: model.child } as DynamicFormField;
      const func = (data: DynamicFormFieldExpressionData, _memo: DynamicFormExpressionMemoization) =>
        data.root.model.readonly || data.parentField.model.readonly;
      const expressionChangesSubject = new Subject();
      const expressionChanges = expressionChangesSubject.asObservable();
      const expressions = {
        readonly: func,
      } as { [key: string]: DynamicFormFieldExpressionFunc };
      const expressionData = {
        model: model.child.child,
        parent: {},
        parentField: { model: parent.model },
        root: { model: root.model },
      } as DynamicFormFieldExpressionData;
      const definition = { expressions } as DynamicFormFieldDefinition;
      const field = { definition, expressionData, expressionChangesSubject, expressionChanges } as DynamicFormField;
      const fieldExpressions = service.createFieldExpressions(field);
      const fieldExpression = fieldExpressions['readonly'];

      expect(fieldExpressions).toBeTruthy();
      expect(fieldExpression).toBeTruthy();
      expect(fieldExpression.field).toBe(field);
      expect(fieldExpression.func).toEqual(func);
      expect(fieldExpression.value).toBe(false);

      model.readonly = true;

      expect(fieldExpression.value).toBe(true);
    }),
  );

  it('returns action expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const action = { definition: {} } as DynamicFormAction;
      const actionExpressions = service.createActionExpressions(action);

      expect(actionExpressions).toBeNull();
    }),
  );

  it('returns action expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const root = { status: 'INVALID' };
      const parent = {};
      const parentField = { status: 'VALID' };
      const expressionData = { root, parent, parentField } as DynamicFormActionExpressionData;
      const expressions = {
        disabled: 'data.parentField.status === "VALID" && data.root.status === "VALID"',
      } as { [key: string]: string };
      const definition = { expressions } as DynamicFormActionDefinition;
      const action = { definition, expressionData } as DynamicFormAction;
      const actionExpressions = service.createActionExpressions(action);
      const actionExpression = actionExpressions['disabled'];

      expect(actionExpressions).toBeTruthy();
      expect(actionExpression).toBeTruthy();
      expect(actionExpression.action).toBe(action);
      expect(actionExpression.func).toEqual(jasmine.any(Function));
      expect(actionExpression.value).toBe(false);

      root.status = 'VALID';

      expect(actionExpression.value).toBe(true);
    }),
  );

  it('returns action expressions from function',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const root = { status: 'INVALID' };
      const parentField = { status: 'VALID' };
      const expressionData = { root, parentField } as DynamicFormActionExpressionData;
      const expressions = {
        disabled: (data) => data.parentField.status === 'VALID' && data.root.status === 'VALID',
      } as { [key: string]: DynamicFormActionExpressionFunc };
      const definition = { expressions } as DynamicFormActionDefinition;
      const action = { definition, expressionData } as DynamicFormAction;
      const actionExpressions = service.createActionExpressions(action);
      const actionExpression = actionExpressions['disabled'];

      expect(actionExpressions).toBeTruthy();
      expect(actionExpression).toBeTruthy();
      expect(actionExpression.action).toBe(action);
      expect(actionExpression.func).toEqual(jasmine.any(Function));
      expect(actionExpression.value).toBe(false);

      root.status = 'VALID';

      expect(actionExpression.value).toBe(true);
    }),
  );
});
