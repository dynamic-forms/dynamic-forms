import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { assignExpressions } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export class DynamicFormAction<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  private _expressions: DynamicFormActionExpressions;

  constructor(readonly root: DynamicFormField, readonly parent: DynamicFormField, definition: Definition) {
    super(definition);
    this._expressions = {};
  }

  get classType(): DynamicFormClassType { return 'action'; }

  get expressions() { return this._expressions; }

  initExpressions(expressions: DynamicFormActionExpressions) {
    if (expressions) {
      this._expressions = expressions;
      assignExpressions(this.template, this._expressions);
    }
  }

  execute($event: Event) {
    const action = this.template && this.template.action;
    switch (action) {
      case 'validate':
        $event.stopPropagation();
        this.parent.validate();
        break;
      case 'reset':
        $event.stopPropagation();
        this.parent.reset();
        break;
      case 'resetDefault':
        $event.stopPropagation();
        this.parent.resetDefault();
        break;
    }
  }
}
