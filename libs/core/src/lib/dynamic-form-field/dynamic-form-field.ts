import { DynamicFormFieldExpressions } from './../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormField<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>
> {

  protected _path: string;
  protected _template: Template;
  protected _expressions?: DynamicFormFieldExpressions;
  protected _control: Control;
  protected _model: any;

  constructor(readonly root: DynamicFormField, readonly parent: DynamicFormField, readonly definition: Definition) {
    this._template = definition.template || <Template>{};
    this._path = parent && parent.path ? `${parent.path}.${definition.key}` : definition.key || null;
  }

  get path() { return this._path; }
  get template() { return this._template; }
  get control() { return this._control; }
  get model() { return this._model; }

  get readonly() { return this.parent.readonly || this.template.readonly || false; }

  setFieldExpressions(expressions: DynamicFormFieldExpressions) {
    this._expressions = expressions || {};
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


