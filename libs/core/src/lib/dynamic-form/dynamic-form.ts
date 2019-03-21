import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormTemplate } from './dynamic-form-template';

export class DynamicForm extends DynamicFormGroup {
  constructor(template: DynamicFormTemplate, model: any = null) {
    super(null, null, template, model);
  }
}
