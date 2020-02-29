import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../dynamic-form-config/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from './dynamic-form-action-handler';

@Injectable()
export class DynamicFormActionService {
  readonly handlers: DynamicFormActionHandlers;

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_HANDLERS)
    private _handlers: DynamicFormActionHandlers
  ) {
    this.handlers = this.libraryService.filterTypes(this._handlers);
  }

  getHandler(type: string) {
    return this.handlers.find(f => f.type === type);
  }

  handle(action: DynamicFormAction, $event: Event) {
    const handler = this.getHandler(action.template.action);
    if (handler) {
      handler.func(action.parent, action);
      $event.stopPropagation();
    }
  }
}
