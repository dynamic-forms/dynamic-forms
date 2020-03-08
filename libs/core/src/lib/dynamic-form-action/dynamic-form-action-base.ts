import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';
import { DynamicFormActionService } from './dynamic-form-action.service';

export abstract class DynamicFormActionBase<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>,
  Action extends DynamicFormAction<Template, Definition> = DynamicFormAction<Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Action> {

  constructor(protected actionService: DynamicFormActionService) {
    super();
  }

  get action(): Action { return this.element; }
  set action(action: Action) { this.element = action; }
}
