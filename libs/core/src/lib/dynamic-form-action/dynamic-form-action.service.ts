import { Injectable } from '@angular/core';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormAction } from './dynamic-form-action';

@Injectable()
export class DynamicFormActionService {
  constructor(private configService: DynamicFormConfigService) {}

  handle(action: DynamicFormAction, $event: Event) {
    const handler = this.configService.getActionHandler(action.template.action, action.parent.fieldClassType);
    if (handler) {
      $event.stopPropagation();
      handler.func(action.parent, action);
    }
  }
}
