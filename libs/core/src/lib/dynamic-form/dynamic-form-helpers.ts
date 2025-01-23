export const cloneObject = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;

export const mergeObject = <T1, T2>(obj1: T1, obj2: T2): T2 => {
  if (Array.isArray(obj2)) {
    return mergeArray(obj1 as any, obj2 as any) as T2;
  }
  const obj = obj1 ? { ...obj1 } : {};
  const keys = Object.keys(obj2);
  return keys.reduce(
    (result, key) => {
      const value = typeof obj2[key] === 'object' ? mergeObject(result[key], obj2[key]) : obj2[key];
      result[key] = value;
      return result;
    },
    obj as Record<string, any> as T2,
  );
};

export const mergeArray = <T1 extends [], T2 extends []>(array1: T1, array2: T2): T2 => {
  const array = array1 ? [...array1] : [];
  return array2.reduce(
    (result, item, index) => {
      const value = typeof item === 'object' ? mergeObject(result[index], item) : item;
      if (index < result.length) {
        result[index] = value;
      } else {
        result.push(value);
      }
      return result;
    },
    array as any as T2,
  );
};

export const extendObject = <T>(obj: T, paths: string[]): T =>
  paths.reduce((result, path) => {
    result[path] = result[path] || {};
    return result[path];
  }, obj) as T;
