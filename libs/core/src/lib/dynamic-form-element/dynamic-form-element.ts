import { Subject } from 'rxjs';
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
import { DynamicFormElementType } from './dynamic-form-element-type';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Child extends DynamicFormElement<DynamicFormElementTemplate, DynamicFormElementDefinition, any> =
    DynamicFormElement<DynamicFormElementTemplate, DynamicFormElementDefinition, any>,
  ExpressionData extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Expressions extends DynamicFormElementExpressions<ExpressionData> = DynamicFormElementExpressions<ExpressionData>,
  Type extends DynamicFormElementType = DynamicFormElementType
> {

  protected readonly _builder: DynamicFormBuilder;
  protected _expressions: Expressions;
  protected _children: Child[] = [];

  readonly root: DynamicForm;
  readonly parent: DynamicFormElement;
  readonly parentField: DynamicFormField;

  readonly definition: Definition;
  readonly template: Template;
  readonly type: Type;

  readonly expressionChangesSubject = new Subject<DynamicFormExpressionChange>();
  readonly expressionChanges = this.expressionChangesSubject.asObservable();
  readonly expressionData: ExpressionData;

  constructor(
    builder: DynamicFormBuilder,
    root: DynamicForm,
    parent: DynamicFormElement,
    definition: Definition,
    type: Type,
  ) {
    this._builder = builder;
    this.root = root || (this as unknown as DynamicForm);
    this.parent = parent;
    this.parentField = DynamicFormElement.getParentField(root, parent);
    this.definition = definition;
    this.definition.template = definition.template || {} as Template;
    this.template = definition.template as Template;
    this.type = type;
    this.expressionData = this.createExpressionData();
    this._expressions = {} as Expressions;
  }

  get classType(): DynamicFormClassType { return 'element'; }

  get id(): string { return this.definition.id; }
  get hidden(): boolean { return this.template.hidden || this.parentField.hidden || false; }

  get expressions(): Expressions { return this._expressions; }
  get children(): Child[] { return this._children; }

  init(): void {
    this.initId();
    this.initExpressions();
    this.initChildren();
  }

  protected initId(): void {}

  protected getExpressions(): Expressions {
    return this._builder.createElementExpressions(this) as Expressions;
  }

  protected initExpressions(): void {
    this._expressions = this.getExpressions() || {} as Expressions;
    assignExpressions(this.template, this._expressions);
  }

  protected getChildren(): Child[] {
    return this._builder.createFormElements(this.root, this, this.definition.children) as Child[];
  }

  protected initChildren(): void {
    this._children = this.getChildren() || [];
  }

  protected createExpressionData(): ExpressionData {
    const expressionData = {} as ExpressionData;
    assignExpressionData(expressionData, {
      root: () => this.root.expressionData,
      parent: () => this.parent ? this.parent.expressionData : undefined,
      parentField: () => this.parentField.expressionData,
      id: () => this.id,
      hidden: () => this.hidden,
    });
    return expressionData;
  }

  protected extendExpressionData(expressions: { [key: string]: () => any }): void {
    assignExpressionData(this.expressionData, expressions);
  }

  private static getParentField(root: DynamicForm, parent: DynamicFormElement): DynamicFormField {
    if (!parent) {
      return root;
    }
    switch (parent.classType) {
      case 'field':
        return parent as DynamicFormField;
      default:
        return DynamicFormElement.getParentField(root, parent.parent);
    }
  }
}
