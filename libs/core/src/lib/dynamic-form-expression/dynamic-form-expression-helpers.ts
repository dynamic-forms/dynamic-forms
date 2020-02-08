import { DynamicFormFormExpressions } from './dynamic-form-expressions';

export function createObject(template: any, paths: string[]) {
  return paths.reduce((result, path) => {
    result[path] = result[path] || {};
    return result[path];
  }, template);
}

export function assignExpressions<Func = Function>(template: any, expressions: DynamicFormFormExpressions<Func>) {
  Object.keys(expressions).forEach(path => {
    const paths = path.split('.');
    if (paths.length > 1) {
      const key = paths.splice(paths.length - 1, 1)[0];
      const obj = createObject(template, paths);
      Object.defineProperty(obj, key, { get: () => expressions[path].value });
    } else {
      Object.defineProperty(template, path, { get: () => expressions[path].value });
    }
  });
}
