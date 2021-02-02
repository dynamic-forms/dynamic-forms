import { Observable, Subject } from 'rxjs';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { assignExpressions, assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormElementExpressions } from './dynamic-form-element-expressions';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  ExpressionData extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Expressions extends DynamicFormElementExpressions = DynamicFormElementExpressions
> {

  protected _definition: Definition;
  protected _children: DynamicFormElement[] = [];

  protected _expressionChangesSubject: Subject<DynamicFormExpressionChange>;
  protected _expressionChanges: Observable<DynamicFormExpressionChange>;
  protected _expressionData: ExpressionData;
  protected _expressions: Expressions;

  constructor(definition: Definition) {
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

  get definition(): Definition { return this._definition; }
  get template(): Template { return this.definition.template; }

  get expressions(): Expressions { return this._expressions; }
  get expressionData(): ExpressionData { return this._expressionData; }
  get expressionChanges(): Observable<DynamicFormExpressionChange> { return this._expressionChanges; }
  get expressionChangesSubject(): Subject<DynamicFormExpressionChange> { return this._expressionChangesSubject; }

  get children(): DynamicFormElement[] { return this._children; }

  initId(id: string): void {
    this._definition.id = id;
  }

  initExpressions(expressions: Expressions): void {
    if (expressions) {
      this._expressions = expressions;
      assignExpressions(this.template, this._expressions);
    }
  }

  initChildren(children: DynamicFormElement[]): void {
    this._children = children || [];
  }

  protected createExpressionData(): ExpressionData {
    const expressionData = {} as ExpressionData;
    assignExpressionData(expressionData, {});
    return expressionData;
  }

  protected extendExpressionData(expressions: { [key: string]: () => any }): void {
    assignExpressionData(this._expressionData, expressions);
  }
}
