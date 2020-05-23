import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { DynamicFormModalElement } from './dynamic-form-modal-element';

export function dynamicFormModalElementFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormModalDefinition
): DynamicFormModalElement {
  const element = new DynamicFormModalElement(definition);
  element.initElements(builder.createFormElements(root, parent, element.definition.elements));
  element.initActions(builder.createFormActions(root, element, element.definition.actions));
  return element;
}
