import { DynamicFormActionBase } from '../dynamic-form-action-base';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormButtonDefinition } from './dynamic-form-button-definition';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';

export abstract class DynamicFormButtonBase extends DynamicFormActionBase<DynamicFormButtonTemplate, DynamicFormButtonDefinition> {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }

  onClick($event: Event): void {
    this.actionService.handle(this.action, $event);
  }
}
