import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionBase } from '../dynamic-form-action-base';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormButtonDefinition } from './dynamic-form-button-definition';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';

export abstract class DynamicFormButtonBase<
  Template extends DynamicFormButtonTemplate = DynamicFormButtonTemplate,
  Definition extends DynamicFormButtonDefinition<Template> = DynamicFormButtonDefinition<Template>,
  Action extends DynamicFormAction<Template, Definition> = DynamicFormAction<Template, Definition>
> extends DynamicFormActionBase<Template, Definition, Action> {

  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }

  onClick($event: Event): void {
    this.handleEvent($event);
  }
}
