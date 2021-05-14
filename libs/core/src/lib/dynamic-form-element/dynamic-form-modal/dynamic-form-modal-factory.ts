import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

export function dynamicFormModalFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormModalDefinition
): DynamicFormModal {
  const modal = new DynamicFormModal(builder, root, parent, definition);
  modal.initExpressions(builder.createElementExpressions(modal));
  modal.initTrigger(builder.createFormAction(root, modal, modal.definition.trigger));
  modal.initChildren(builder.createFormElements(root, parent, modal.definition.children));
  modal.initHeaderActions(builder.createFormActions(root, modal, modal.definition.headerActions));
  modal.initFooterActions(builder.createFormActions(root, modal, modal.definition.footerActions));
  return modal;
}
