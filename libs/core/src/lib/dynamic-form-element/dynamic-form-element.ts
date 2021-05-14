import { Observable, Subject } from 'rxjs';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { assignExpressions, assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormElementExpressions } from './dynamic-form-element-expressions';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Child extends DynamicFormElement<DynamicFormElementTemplate, DynamicFormElementDefinition, any> =
    DynamicFormElement<DynamicFormElementTemplate, DynamicFormElementDefinition, any>,
  ExpressionData extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Expressions extends DynamicFormElementExpressions<ExpressionData> = DynamicFormElementExpressions<ExpressionData>,
> {

  protected readonly _builder: DynamicFormBuilder;

  protected _root: DynamicForm;
  protected _parent: DynamicFormElement;
  protected _parentField: DynamicFormField;

  protected _definition: Definition;

  protected _expressionChangesSubject: Subject<DynamicFormExpressionChange>;
  protected _expressionChanges: Observable<DynamicFormExpressionChange>;
  protected _expressionData: ExpressionData;
  protected _expressions: Expressions;

  protected _children: Child[] = [];

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    this._builder = builder;
    this._root = root;
    this._parent = parent;
    this._parentField = this.getParentField(root, parent);
    this._definition = definition;
    this._definition.template = definition.template || {} as Template;
    this._expressionChangesSubject = new Subject();
    this._expressionChanges = this._expressionChangesSubject.asObservable();
    this._expressionData = this.createExpressionData();
    this._expressions = {} as Expressions;
  }

  get id(): string { return this.definition.id; }
  get classType(): DynamicFormClassType { return 'element'; }
  get componentType(): string { return this.definition.type; }

  get root(): DynamicForm { return this._root; }
  get parent(): DynamicFormElement { return this._parent; }
  get parentField(): DynamicFormField { return this._parentField; }

  get definition(): Definition { return this._definition; }
  get template(): Template { return this.definition.template; }

  get expressions(): Expressions { return this._expressions; }
  get expressionData(): ExpressionData { return this._expressionData; }
  get expressionChanges(): Observable<DynamicFormExpressionChange> { return this._expressionChanges; }
  get expressionChangesSubject(): Subject<DynamicFormExpressionChange> { return this._expressionChangesSubject; }

  get children(): Child[] { return this._children; }

  initId(id: string): void {
    this._definition.id = id;
  }

  initExpressions(expressions: Expressions): void {
    if (expressions) {
      this._expressions = expressions;
      assignExpressions(this.template, this._expressions);
    }
  }

  initChildren(children: Child[]): void {
    this._children = children || [];
  }

  protected get builder(): DynamicFormBuilder {
    return this._builder;
  }

  protected getParentField(root: DynamicForm, parent: DynamicFormElement): DynamicFormField {
    if (!parent) {
      return root;
    }
    switch (parent.classType) {
      case 'field':
        return parent as any as DynamicFormField;
      default:
        return this.getParentField(root, parent.parent);
    }
  }

  protected createExpressionData(): ExpressionData {
    const expressionData = {} as ExpressionData;
    assignExpressionData(expressionData, {
      root: () => this.root ? this.root.expressionData : undefined,
      parent: () => this.parent ? this.parent.expressionData : undefined,
      parentField: () => this.parentField ? this.parentField.expressionData : undefined,
    });
    return expressionData;
  }

  protected extendExpressionData(expressions: { [key: string]: () => any }): void {
    assignExpressionData(this._expressionData, expressions);
  }
}
