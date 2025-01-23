import { extendObject } from '../dynamic-form/dynamic-form-helpers';
import { DynamicFormExpression } from './dynamic-form-expression';
import { DynamicFormExpressions } from './dynamic-form-expressions';

export const assignExpressions = <Expression extends DynamicFormExpression = DynamicFormExpression>(
  template: any,
  expressions: DynamicFormExpressions<Expression>,
): void => {
  Object.keys(expressions).forEach(path => {
    const paths = path.split('.');
    if (paths.length > 1) {
      const key = paths.splice(paths.length - 1, 1)[0];
      const obj = extendObject(template, paths);
      Object.defineProperty(obj, key, { get: () => expressions[path].value, configurable: true });
    } else {
      Object.defineProperty(template, path, { get: () => expressions[path].value, configurable: true });
    }
  });
};

export const assignExpressionData = (data: any, expressions: Record<string, () => any>): void =>
  Object.keys(expressions).forEach(key => Object.defineProperty(data, key, { get: expressions[key], configurable: true }));
