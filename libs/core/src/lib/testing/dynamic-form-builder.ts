import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';

export const createDynamicFormBuilderSpy = (): jasmine.SpyObj<DynamicFormBuilder> => jasmine.createSpyObj<DynamicFormBuilder>('builder', [
  'createElementExpressions',
  'createFieldExpressions',
  'createActionExpressions',
  'createFormElements',
  'createFormActions',
  'createFormAction',
  'createFormArrayElements',
  'createFormDictionaryElements',
  'createFormControlAddOn',
  'createControlEvaluators',
  'createControlValidators',
  'createGroupValidators',
  'createArrayValidators',
  'createDictionaryValidators',
  'getDefinition',
  'getFieldId',
  'getActionId',
]);
