
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormDialog } from './dynamic-form-dialog';
import { DynamicFormDialogDefinition } from './dynamic-form-dialog-definition';

export function dynamicFormDialogFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormField, definition: DynamicFormDialogDefinition
): DynamicFormDialog {

  const dialogAction = new DynamicFormDialog(root, parent, definition);
  dialogAction.initExpressions(builder.createActionExpressions(dialogAction));

  const dialogForm = builder.createForm(dialogAction.dialogDefinition, {});
  dialogForm.initExpressions(this.createFieldExpressions(dialogForm));
  dialogForm.initElements(this.createFormElements(dialogForm, dialogForm, dialogForm.definition.elements));
  dialogForm.initActions(this.createFormActions(dialogForm, dialogAction, dialogForm.definition.actions));

  dialogAction.initForm(dialogForm);

  return dialogAction;
}
