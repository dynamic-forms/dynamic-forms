import { Inject, Injectable, Optional } from '@angular/core';
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
    private _handlers: DynamicFormActionHandlerConfig
  ) {
    this.handlers = this.libraryService.filterTypes(this._handlers);
  }

  getHandler(type: string): DynamicFormActionHandler {
    return this.handlers.find(f => f.type === type);
  }

  handle(action: DynamicFormAction, $event: Event): void {
    const handler = this.getHandler(action.template.action);
    if (handler) {
      handler.func(action.parent, action);
      $event.stopPropagation();
    }
  }
}
