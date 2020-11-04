import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormElement } from '../../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../../dynamic-form/dynamic-form-definition';
import { DynamicFormTemplate } from '../../dynamic-form/dynamic-form-template';
import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormDialogDefinition } from './dynamic-form-dialog-definition';
import { DynamicFormDialogTemplate } from './dynamic-form-dialog-template';

export class DynamicFormDialog<
  Template extends DynamicFormDialogTemplate = DynamicFormDialogTemplate,
  Definition extends DynamicFormDialogDefinition<Template> = DynamicFormDialogDefinition<Template>
> extends DynamicFormAction<Template, Definition> {

  private _isOpenSubject: BehaviorSubject<boolean>;
  private _isOpenChange: Observable<boolean>;

  protected _form: DynamicForm;

  constructor(readonly root: DynamicForm, readonly parent: DynamicFormField, definition: Definition) {
    super(root, parent, definition);
    this._isOpenSubject = new BehaviorSubject(false);
    this._isOpenChange = this._isOpenSubject.asObservable();
    this.extendExpressionData({
      isOpen: () => this.isOpen,
      dialog: () => this.dialog ? this.dialog.expressionData : undefined
    });
  }

  get isOpen(): boolean { return this._isOpenSubject.value; }
  get isOpenChange(): Observable<boolean> { return this._isOpenChange; }

  get dialogDefinition(): DynamicFormDefinition { return this.definition.dialogDefinition; }
  get dialogTemplate(): DynamicFormTemplate { return this.dialogDefinition.template; }

  get dialog(): DynamicForm { return this._form; }
  get dialogElements(): DynamicFormElement[] { return this._form.elements; }
  get dialogActions(): DynamicFormAction[] { return this._form.actions; }

  initForm(form: DynamicForm): void {
    this._form = form;
  }

  open(): void {
    return !this.isOpen && this._isOpenSubject.next(true);
  }

  close(): void {
    return this.isOpen && this._isOpenSubject.next(false);
  }

  toggle(): void {
    this._isOpenSubject.next(!this.isOpen);
  }
}
