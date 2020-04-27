import { DynamicFormActionBase } from '../dynamic-form-action-base';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormIconDefinition } from './dynamic-form-icon-definition';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';

export abstract class DynamicFormIconBase extends DynamicFormActionBase<DynamicFormIconTemplate, DynamicFormIconDefinition> {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }

  onClick($event: Event): void {
    this.actionService.handle(this.action, $event);
  }
}
