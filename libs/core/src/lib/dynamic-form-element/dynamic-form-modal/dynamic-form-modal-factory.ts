import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

export function dynamicFormModalFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormModalDefinition
): DynamicFormModal {
  const modal = new DynamicFormModal(builder, root, parent, definition);
  modal.init();
  return modal;
}
