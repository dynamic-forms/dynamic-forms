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
    const handler = this.configService.getActionHandler(action.template.action, action.parent.fieldClassType);
    if (handler) {
      $event.stopPropagation();
      handler.func(action.parent, action);
    } else {
      this.handleForField(action, $event);
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
      }
    }
  }
}
