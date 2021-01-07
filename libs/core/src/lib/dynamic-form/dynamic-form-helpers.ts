export function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function mergeObject<T1, T2>(obj1: T1, obj2: T2): T2 {
  const keys = Object.keys(obj2);
  return keys.reduce((result, key) => {
    if (typeof obj2[key] === 'object') {
      result[key] = mergeObject(obj1[key] || {}, obj2[key]);
    } else {
      result[key] = obj2[key];
    }
    return result;
  }, { ...obj1 } as any as T2);
}

export function extendObject<T>(obj: T, paths: string[]): T {
  return paths.reduce((result, path) => {
    result[path] = result[path] || {};
    return result[path];
  }, obj) as T;
}
