import { Observable, Subject } from 'rxjs';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { assignExpressions } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { cloneObject } from '../dynamic-form/dynamic-form-helpers';
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

  protected _root: DynamicFormField;
  protected _parent: DynamicFormField;

  protected _path: string;
  protected _model: any;
  protected _options: DynamicFormFieldOptions;
  protected _control: Control;

  protected _actions: DynamicFormAction[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: Definition) {
    super(definition);
    this._root = root;
    this._parent = parent;
    this._path = this.createPath();
    this._options = this.createOptions();
    this._expressionChangesSubject = new Subject();
    this._expressionChanges = this._expressionChangesSubject.asObservable();
    this._expressions = {};
  }

  get root() { return this._root; }
  get parent() { return this._parent; }

  get key() { return this.definition.key; }
  get index() { return this.definition.index; }
  get path() { return this._path; }
  get classType(): DynamicFormClassType { return 'field'; }

  get model() { return this._model; }
  get options() { return this._options; }

  get control() { return this._control; }
  get status() { return this._control.status; }

  get hidden() { return this.parent.hidden || this.template.hidden || false; }
  get readonly() { return this.parent.readonly || this.template.readonly || false; }

  get actions() { return this._actions; }
  get wrappers() { return this.definition.wrappers; }

  get expressionChangesSubject() { return this._expressionChangesSubject; }
  get expressionChanges() { return this._expressionChanges; }
  get expressions() { return this._expressions; }

  initActions(actions: DynamicFormAction[]) {
    this._actions = actions;
  }

  initExpressions(expressions: DynamicFormFieldExpressions) {
    if (expressions) {
      this._expressions = expressions;
      assignExpressions(this.template, this._expressions);
    }
  }

  abstract check(): void;
  abstract destroy(): void;

  abstract reset(): void;
  abstract resetDefault(): void;
  abstract validate(): void;

  protected filterFields(elements: DynamicFormElement[]): DynamicFormField[] {
    return elements.reduce((result, element) => {
      if (element.classType === 'field') {
        return result.concat(element as DynamicFormField);
      }
      if (element.elements) {
        return result.concat(this.filterFields(element.elements));
      }
      return result;
    }, <DynamicFormField[]>[]);
  }

  protected cloneObject<T>(obj: T) {
    return cloneObject(obj);
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
