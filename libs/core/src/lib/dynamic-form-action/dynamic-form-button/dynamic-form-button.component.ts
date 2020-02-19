import { Component } from '@angular/core';
import { DynamicFormActionBase } from '../dynamic-form-action-base';
import { DynamicFormActionHandler } from '../dynamic-form-action.handler';
import { DynamicFormButtonDefinition } from './dynamic-form-button-definition';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';

@Component({
  selector: 'dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html'
})
export class DynamicFormButtonComponent extends DynamicFormActionBase<DynamicFormButtonTemplate, DynamicFormButtonDefinition> {
  constructor(protected actionHandler: DynamicFormActionHandler) {
    super(actionHandler);
  }

  onClick($event) {
    this.actionHandler.handle(this.action, $event);
  }
}
