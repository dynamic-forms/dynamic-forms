import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export class DynamicFormAction<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormElement<DynamicFormActionTemplate, DynamicFormActionDefinition> {
  constructor(readonly field: Field, definition: DynamicFormActionDefinition) {
    super(definition);
  }
}
