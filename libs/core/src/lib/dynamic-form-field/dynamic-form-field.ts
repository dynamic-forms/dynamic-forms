import { Observable, Subject } from 'rxjs';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { DynamicFormFieldExpressions } from './../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormField<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>
> {

  private _template: Template;
  private _expressionChangesSubject: Subject<DynamicFormExpressionChange>;
  private _expressionChanges: Observable<DynamicFormExpressionChange>;
  private _expressions: DynamicFormFieldExpressions;

  protected _path: string;
  protected _control: Control;
  protected _model: any;

  constructor(readonly root: DynamicFormField, readonly parent: DynamicFormField, readonly definition: Definition) {
    this._path = parent && parent.path ? `${parent.path}.${definition.key}` : definition.key || null;
    this._template = definition.template || <Template>{};
    this._expressionChangesSubject = new Subject();
    this._expressionChanges = this._expressionChangesSubject.asObservable();
    this._expressions = {};
  }

  get path() { return this._path; }
  get template() { return this._template; }
  get control() { return this._control; }
  get model() { return this._model; }

  get hidden() { return this.parent.hidden || this.template.hidden || false; }
  get readonly() { return this.parent.readonly || this.template.readonly || false; }

  get expressionChangesSubject() { return this._expressionChangesSubject; }
  get expressionChanges() { return this._expressionChanges; }
  get expressions() { return this._expressions; }

  setFieldExpressions(expressions: DynamicFormFieldExpressions) {
    if (expressions) {
      this._expressions = expressions;
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
