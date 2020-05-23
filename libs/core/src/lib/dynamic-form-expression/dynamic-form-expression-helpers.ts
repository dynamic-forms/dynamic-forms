import { extendObject } from '../dynamic-form/dynamic-form-helpers';
import { DynamicFormExpressionData } from './dynamic-form-expression-data';
import { DynamicFormExpressions } from './dynamic-form-expressions';

export function assignExpressions<Data extends DynamicFormExpressionData = DynamicFormExpressionData>(
  template: any, expressions: DynamicFormExpressions<Data>
): void {
  Object.keys(expressions).forEach(path => {
    const paths = path.split('.');
    if (paths.length > 1) {
      const key = paths.splice(paths.length - 1, 1)[0];
      const obj = extendObject(template, paths);
      Object.defineProperty(obj, key, { get: () => expressions[path].value });
    } else {
      Object.defineProperty(template, path, { get: () => expressions[path].value });
    }
  });
}

export function assignExpressionData(data: any, expressions: { [key: string]: () => any }): void {
  return Object.keys(expressions).forEach(key => {
    Object.defineProperty(data, key, { get: expressions[key] });
  });
}
