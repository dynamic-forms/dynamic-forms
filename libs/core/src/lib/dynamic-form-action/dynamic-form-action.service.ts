import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DynamicFormActionHandlerConfig, DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler-config';

@Injectable()
export class DynamicFormActionService {
  readonly handlers: DynamicFormActionHandler[];

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_HANDLER_CONFIG)
    private handlerConfig: DynamicFormActionHandlerConfig,
  ) {
    this.handlers = this.libraryService.filterTypes(this.handlerConfig);
  }

  getHandler(type: string): DynamicFormActionHandler {
    return this.handlers.find(f => f.type === type);
  }

  handle(action: DynamicFormAction, $event: Event): void {
    if (typeof action.template.action === 'function') {
      action.template.action();
      $event.stopPropagation();
      return;
    }
    const handler = this.getHandler(action.template.action);
    if (handler) {
      const element = this.getElement(handler, action);
      handler.func(element, action);
      $event.stopPropagation();
    }
  }

  private getElement(handler: DynamicFormActionHandler, action: DynamicFormAction): DynamicFormElement | DynamicFormField {
    return handler.elementFunc
      ? handler.elementFunc(action)
      : action.parent;
  }
}
