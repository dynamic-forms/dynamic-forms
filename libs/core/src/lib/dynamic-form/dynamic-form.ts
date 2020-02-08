import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormTemplate } from './dynamic-form-template';

export class DynamicForm extends DynamicFormGroup<DynamicFormTemplate, DynamicFormDefinition> {
  constructor(definition: DynamicFormDefinition, model: any) {
    super(null, null, definition, model);
    this._root = this;
  }

  get hidden() { return this.template.hidden || false; }
  get readonly() { return this.template.readonly || false; }
}
