import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';

export function createDynamicFormBuilderSpy(): jasmine.SpyObj<DynamicFormBuilder> {
  return jasmine.createSpyObj<DynamicFormBuilder>('builder', [
    'createElementExpressions',
    'createFieldExpressions',
    'createActionExpressions',
    'createFormElements',
    'createFormActions',
    'createFormAction',
    'createFormArrayElements',
    'createFormDictionaryElements',
    'createControlEvaluators',
    'createControlValidators',
    'createGroupValidators',
    'createArrayValidators',
    'createDictionaryValidators',
    'getDefinition',
    'getFieldId',
    'getActionId'
  ]);
}
