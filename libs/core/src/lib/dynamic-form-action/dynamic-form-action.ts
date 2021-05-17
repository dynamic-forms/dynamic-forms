import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormActionExpressions } from './dynamic-form-action-expressions';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';
import { DynamicFormDialog } from './dynamic-form-dialog';

export class DynamicFormAction<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>
> extends DynamicFormElement<Template, Definition, undefined, DynamicFormActionExpressionData, DynamicFormActionExpressions> {

  private _dialogOpenSubject: BehaviorSubject<boolean>;
  private _dialogOpenChanges: Observable<boolean>;

  protected _dialog: DynamicFormDialog;

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(builder, root, parent, definition);
    this._dialogOpenSubject = new BehaviorSubject(false);
    this._dialogOpenChanges = this._dialogOpenSubject.asObservable();
  }

  get classType(): DynamicFormClassType { return 'action'; }

  get dialogOpen(): boolean { return this._dialogOpenSubject.value; }
  get dialogOpenChanges(): Observable<boolean> { return this._dialogOpenChanges; }

  get dialogDefinition(): DynamicFormDefinition { return this.definition.dialogDefinition; }
  get dialogTemplate(): DynamicFormTemplate { return this.dialogDefinition.template; }

  get dialog(): DynamicFormDialog { return this._dialog; }
  get dialogChildren(): DynamicFormElement[] { return this._dialog.children; }
  get dialogHeaderActions(): DynamicFormAction[] { return this._dialog.headerActions; }
  get dialogFooterActions(): DynamicFormAction[] { return this._dialog.footerActions; }

  init(): void {
    super.init();
    this.initDialog();
  }

  openDialog(): void {
    return this.dialog && !this.dialogOpen && this._dialogOpenSubject.next(true);
  }

  closeDialog(): void {
    return this.dialog && this.dialogOpen && this._dialogOpenSubject.next(false);
  }

  toggleDialog(): void {
    return this.dialog && this._dialogOpenSubject.next(!this.dialogOpen);
  }

  protected initId(): void {
    this.definition.id = this._builder.getActionId(this);
  }

  protected getExpressions(): DynamicFormActionExpressions {
    return this._builder.createActionExpressions(this);
  }

  protected getChildren(): any[] {
    return undefined;
  }

  protected initDialog(): void {
    if (this.dialogDefinition) {
      this._dialog = new DynamicFormDialog(this._builder, this, this.dialogDefinition, {});
      this._dialog.init();
    }
  }

  protected createExpressionData(): DynamicFormActionExpressionData {
    const expressionData = super.createExpressionData() as DynamicFormActionExpressionData;
    assignExpressionData(expressionData, {
      dialog: () => this.dialog ? this.dialog.expressionData : undefined
    });
    return expressionData;
  }
}
