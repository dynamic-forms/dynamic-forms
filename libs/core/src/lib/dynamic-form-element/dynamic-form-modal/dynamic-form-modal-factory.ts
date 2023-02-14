import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

export const dynamicFormModalFactory = (
  builder: DynamicFormBuilder,
  root: DynamicForm,
  parent: DynamicFormElement,
  definition: DynamicFormModalDefinition,
  type: DynamicFormElementType,
): DynamicFormModal => {
  const modal = new DynamicFormModal(builder, root, parent, definition, type);
  modal.init();
  return modal;
};
