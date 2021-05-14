import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from './dynamic-form-action';

export class DynamicFormDialog extends DynamicForm {
  protected _action: DynamicFormAction;

  constructor(builder: DynamicFormBuilder, action: DynamicFormAction, definition: DynamicFormDefinition, model: any) {
    super(builder, definition, model);
    this._action = action;
  }

  get action(): DynamicFormAction { return this._action; }

  init(): void {
    this.initExpressions(this._builder.createFieldExpressions(this));
    this.initChildren(this._builder.createFormElements(this.root, this, this.definition.children));
    this.initValidators(this._builder.createGroupValidators(this));
    this.initHeaderActions(this._builder.createFormActions(this.root, this.action, this.definition.headerActions));
    this.initFooterActions(this._builder.createFormActions(this.root, this.action, this.definition.footerActions));
  }
}
