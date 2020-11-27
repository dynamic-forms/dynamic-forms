import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionBase } from '../dynamic-form-action-base';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormIconDefinition } from './dynamic-form-icon-definition';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';

export abstract class DynamicFormIconBase<
  Template extends DynamicFormIconTemplate = DynamicFormIconTemplate,
  Definition extends DynamicFormIconDefinition<Template> = DynamicFormIconDefinition<Template>,
  Action extends DynamicFormAction<Template, Definition> = DynamicFormAction<Template, Definition>
> extends DynamicFormActionBase<Template, Definition, Action> {

  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }

  onClick($event: Event): void {
    this.handleEvent($event);
  }
}
