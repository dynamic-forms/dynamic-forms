import { Injectable } from '@angular/core';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormAction } from './dynamic-form-action';

@Injectable()
export class DynamicFormActionService {
  constructor(private configService: DynamicFormConfigService) {}

  handle(action: DynamicFormAction, $event: Event) {
    const actionType = action.template.action;
    switch (actionType) {
      case 'validate':
        $event.stopPropagation();
        action.parent.validate();
        break;
      case 'reset':
        $event.stopPropagation();
        action.parent.reset();
        break;
      case 'resetDefault':
        $event.stopPropagation();
        action.parent.resetDefault();
        break;
    }
  }
}
