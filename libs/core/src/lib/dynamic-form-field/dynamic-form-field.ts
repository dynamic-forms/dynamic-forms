import { Observable, Subject } from 'rxjs';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { DynamicFormFieldExpressions } from './../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldOptions } from './dynamic-form-field-options';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export abstract class DynamicFormField<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  private _expressionChangesSubject: Subject<DynamicFormExpressionChange>;
  private _expressionChanges: Observable<DynamicFormExpressionChange>;
  private _expressions: DynamicFormFieldExpressions;

  protected _path: string;
  protected _model: any;
  protected _options: DynamicFormFieldOptions;
  protected _control: Control;

  constructor(readonly root: DynamicFormField, readonly parent: DynamicFormField, definition: Definition) {
    super(definition);
    this._path = this.createPath();
    this._options = this.createOptions();
    this._expressionChangesSubject = new Subject();
    this._expressionChanges = this._expressionChangesSubject.asObservable();
    this._expressions = {};
  }

  get isElement() { return false; }

  get wrappers() { return this.definition.wrappers; }

  get path() { return this._path; }
  get model() { return this._model; }
  get options() { return this._options; }

  get control() { return this._control; }

  get hidden() { return this.parent.hidden || this.template.hidden || false; }
  get readonly() { return this.parent.readonly || this.template.readonly || false; }

  get expressionChangesSubject() { return this._expressionChangesSubject; }
  get expressionChanges() { return this._expressionChanges; }
  get expressions() { return this._expressions; }

  setExpressions(expressions: DynamicFormFieldExpressions) {
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

  abstract reset(): void;
  abstract resetDefault(): void;
  abstract validate();

  protected createObject(obj: any, paths: string[]) {
    return paths.reduce((result, path) => {
      result[path] = result[path] || {};
      return result[path];
    }, obj);
  }

  private createPath() {
    return this.parent && this.parent.path ? `${this.parent.path}.${this.definition.key}` : this.definition.key || null;
  }

  private createOptions() {
    const defaultOptions = <DynamicFormFieldOptions>{ update: 'change' };
    const rootOptions = this.root && this.root.options || {};
    const parentOptions = this.parent && this.parent.options || {};
    const options = this.definition.options || {};
    return { ...defaultOptions, ...rootOptions, ...parentOptions, ...options };
  }
}
