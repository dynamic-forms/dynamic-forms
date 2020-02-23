import { Injectable } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from './dynamic-form-action';

@Injectable()
export class DynamicFormActionService {
  constructor(
    private configService: DynamicFormConfigService,
    private formBuilder: DynamicFormBuilder
  ) {}

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
      default:
        this.handleForField(action, $event);
        break;
    }
  }

  private handleForField(action: DynamicFormAction, $event: Event) {
    const field = action.parent;
    if (field instanceof DynamicFormArray) {
      switch (action.template.action) {
        case 'pushArrayElement':
          $event.stopPropagation();
          const element = this.formBuilder.createFormArrayElement(field, field.length);
          field.pushElement(element);
          break;
        case 'popArrayElement':
          $event.stopPropagation();
          field.popElement();
          break;
        case 'clearArrayElements':
          $event.stopPropagation();
          field.clearElements();
          break;
      }
    }
  }
}
