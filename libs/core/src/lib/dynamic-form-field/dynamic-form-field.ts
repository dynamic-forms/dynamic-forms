import { DynamicFormFieldExpressions } from './../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormField<
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Control extends DynamicFormFieldControl = DynamicFormFieldControl
> {

  protected _path: string;
  protected _expressions?: DynamicFormFieldExpressions;
  protected _control: Control;
  protected _model: any;

  constructor(
    public readonly root: DynamicFormField,
    public readonly parent: DynamicFormField,
    public readonly template: Template
  ) {
    this._path = parent && parent.path ? `${parent.path}.${template.key}` : template.key || null;
  }

  get path() { return this._path; }
  get control() { return this._control; }
  get model() { return this._model; }

  setFieldExpressions(expressions: DynamicFormFieldExpressions) {
    this._expressions = expressions;
    if (expressions) {
      Object.keys(expressions).forEach(path => {
        const paths = path.split('.');
        if (paths.length > 1) {
          const key = paths.splice(paths.length - 1, 1)[0];
          const obj = this.createObject(this.template, paths);
          Object.defineProperty(obj, key, { get: () => expressions[path].value });
        } else {
          Object.defineProperty(this.template, path, { get: () => expressions[path].value });
        }
      });
    }
  }

  abstract check(): void;
  abstract destroy(): void;

  protected createObject(obj: any, paths: string[]) {
    return paths.reduce((result, path) => {
      result[path] = result[path] || {};
      return result[path];
    }, obj);
  }
}


