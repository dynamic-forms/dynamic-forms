import { extendObject } from '../dynamic-form/dynamic-form-helpers';
import { DynamicFormFormExpressions } from './dynamic-form-expressions';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';

export function assignExpressions<Func = Function>(template: any, expressions: DynamicFormFormExpressions<Func>) {
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

export function assignExpressionData(data: DynamicFormFieldExpressionData, expressions: { [key: string]: () => any }) {
  return Object.keys(expressions).forEach(key => {
    Object.defineProperty(data, key, { get: expressions[key] });
  });
}
