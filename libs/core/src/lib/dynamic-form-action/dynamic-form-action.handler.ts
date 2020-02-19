import { Injectable } from '@angular/core';
import { DynamicFormAction } from './dynamic-form-action';

@Injectable()
export class DynamicFormActionHandler {
  handle(action: DynamicFormAction, $event: Event) {
    switch (action.template.action) {
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
