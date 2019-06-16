import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormExpressionBuilder } from './dynamic-form-expression.builder';

describe('DynamicFormVExpressionBuilder', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormExpressionBuilder
      ]
    });
  }));

  it('returns field expressions being null',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const field = <DynamicFormField>{ template: {} };
      const fieldExpressions = service.createFieldExpressions(field);

      expect(fieldExpressions).toBeNull();
    })
  );

  it('returns field expressions',
    inject([DynamicFormExpressionBuilder], (service: DynamicFormExpressionBuilder) => {
      const model = { readonly: false, child: { readonly: true, child: {} } };
      const root = <DynamicFormField>{ model };
      const parent = <DynamicFormField>{ model: model.child };
      const expressions = <{ [key: string]: string }> {
        'readonly': 'rootModel.readonly || parentModel.readonly'
      };
      const template = <DynamicFormFieldTemplate>{ expressions };
      const field = <DynamicFormField>{ root, parent, template, model: model.child.child };
      const fieldExpressions = service.createFieldExpressions(field);
      const fieldExpression = fieldExpressions['readonly'];

      expect(fieldExpressions).toBeDefined();
      expect(fieldExpression).toBeDefined();
      expect(fieldExpression.field).toBe(field);
      expect(fieldExpression.deps).toEqual(['parentModel.readonly', 'rootModel.readonly']);
      expect(fieldExpression.func).toEqual(jasmine.any(Function));
      expect(fieldExpression.value).toBe(true);
    })
  );
});
