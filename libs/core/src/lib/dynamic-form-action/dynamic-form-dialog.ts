import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormAction } from './dynamic-form-action';

export class DynamicFormDialog extends DynamicForm {
  protected _action: DynamicFormAction;

  constructor(builder: DynamicFormBuilder, action: DynamicFormAction, definition: DynamicFormDefinition, model: any) {
    super(builder, definition, model);
    this._action = action;
  }

  get action(): DynamicFormAction {
    return this._action;
  }

  protected override getChildren(): DynamicFormElement[] {
    return this._builder.createFormElements(this, this, this.definition.children);
  }

  protected override getHeaderActions(): DynamicFormAction[] {
    return this._builder.createFormActions(this.action.root, this.action, this.definition.headerActions);
  }

  protected override getFooterActions(): DynamicFormAction[] {
    return this._builder.createFormActions(this.action.root, this.action, this.definition.footerActions);
  }
}
