import { Observable, Subject } from 'rxjs';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElementExpressionData } from '../dynamic-form-expression/dynamic-form-element-expression-data';
import { DynamicFormElementExpressions } from '../dynamic-form-expression/dynamic-form-element-expressions';
import { DynamicFormExpressionChange } from '../dynamic-form-expression/dynamic-form-expression-change';
import { assignExpressions, assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  ExpressionData extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Expressions extends DynamicFormElementExpressions = DynamicFormElementExpressions
> {

  protected _definition: Definition;
  protected _elements: DynamicFormElement[] = [];

  protected _expressionChangesSubject: Subject<DynamicFormExpressionChange>;
  protected _expressionChanges: Observable<DynamicFormExpressionChange>;
  protected _expressionData: ExpressionData;
  protected _expressions: Expressions;

  constructor(definition: Definition) {
    this._definition = definition;
    this._definition.template = definition.template || <Template>{};
    this._expressionChangesSubject = new Subject();
    this._expressionChanges = this._expressionChangesSubject.asObservable();
    this._expressionData = this.createExpressionData();
    this._expressions = <Expressions>{};
  }

  get id(): string { return this.definition.id; }
  get classType(): DynamicFormClassType { return 'element'; }
  get componentType(): string { return this.definition.type; }

  get definition(): Definition { return this._definition; }
  get template(): Template { return this.definition.template; }
  get elements(): DynamicFormElement[] { return this._elements; }

  get expressions(): Expressions { return this._expressions; }
  get expressionData(): ExpressionData { return this._expressionData; }
  get expressionChanges(): Observable<DynamicFormExpressionChange> { return this._expressionChanges; }
  get expressionChangesSubject(): Subject<DynamicFormExpressionChange> { return this._expressionChangesSubject; }

  initId(id: string): void {
    this._definition.id = id;
  }

  initElements(elements: DynamicFormElement[]): void {
    this._elements = elements || [];
  }

  initExpressions(expressions: Expressions): void {
    if (expressions) {
      this._expressions = expressions;
      assignExpressions(this.template, this._expressions);
    }
  }

  protected extendExpressionData(expressions: { [key: string]: () => any }): void {
    assignExpressionData(this._expressionData, expressions);
  }

  protected createExpressionData(): ExpressionData {
    const expressionData = {} as ExpressionData;
    assignExpressionData(expressionData, {});
    return expressionData;
  }
}
