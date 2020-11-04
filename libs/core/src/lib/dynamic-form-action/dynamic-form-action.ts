import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormActionExpressionData } from '../dynamic-form-expression/dynamic-form-action-expression-data';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export class DynamicFormAction<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>
> extends DynamicFormElement<Template, Definition, DynamicFormActionExpressionData, DynamicFormActionExpressions> {

  private _dialogOpenSubject: BehaviorSubject<boolean>;
  private _dialogOpenChange: Observable<boolean>;

  protected _dialog: DynamicForm;

  constructor(readonly root: DynamicForm, readonly parent: DynamicFormElement | DynamicFormField, definition: Definition) {
    super(definition);
    this._dialogOpenSubject = new BehaviorSubject(false);
    this._dialogOpenChange = this._dialogOpenSubject.asObservable();
  }

  get classType(): DynamicFormClassType { return 'action'; }

  get dialogDefinition(): DynamicFormDefinition { return this.definition.dialogDefinition; }
  get dialogTemplate(): DynamicFormTemplate { return this.dialogDefinition.template; }

  get dialog(): DynamicForm { return this._dialog; }
  get dialogElements(): DynamicFormElement[] { return this._dialog ? this._dialog.elements : undefined; }
  get dialogActions(): DynamicFormAction[] { return this._dialog ? this._dialog.actions : undefined; }

  get dialogOpen(): boolean { return this._dialogOpenSubject.value; }
  get dialogOpenChange(): Observable<boolean> { return this._dialogOpenChange; }

  initDialog(dialog: DynamicForm): void {
    this._dialog = dialog;
  }

  openDialog(): void {
    return !this.dialogOpen && this._dialogOpenSubject.next(true);
  }

  closeDialog(): void {
    return this.dialogOpen && this._dialogOpenSubject.next(false);
  }

  toggleDialog(): void {
    this._dialogOpenSubject.next(!this.dialogOpen);
  }

  protected createExpressionData(): DynamicFormActionExpressionData {
    const expressionData = {} as DynamicFormActionExpressionData;
    assignExpressionData(expressionData, {
      root: () => this.root ? this.root.expressionData : undefined,
      parent: () => this.parent ? this.parent.expressionData : undefined,
      dialog: () => this.dialog ? this.dialog.expressionData : undefined
    });
    return expressionData;
  }
}
