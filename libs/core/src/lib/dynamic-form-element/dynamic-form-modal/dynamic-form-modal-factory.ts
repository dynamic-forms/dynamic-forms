import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

export function dynamicFormModalFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormModalDefinition
): DynamicFormModal {
  const element = new DynamicFormModal(definition);
  element.initExpressions(builder.createElementExpressions(element));
  element.initTrigger(builder.createFormAction(root, element, element.definition.trigger));
  element.initElements(builder.createFormElements(root, parent, element.definition.elements));
  element.initActions(builder.createFormActions(root, element, element.definition.actions));
  return element;
}
