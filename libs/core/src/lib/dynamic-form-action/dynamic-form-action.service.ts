import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../dynamic-form-config/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandlers, DYNAMIC_FORM_ACTION_HANDLERS } from './dynamic-form-action-handler';

@Injectable()
export class DynamicFormActionService {
  readonly actionHandlers: DynamicFormActionHandlers;

  constructor(
    private readonly libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_HANDLERS) private _actionHandlers: DynamicFormActionHandlers = null
  ) {
    this.actionHandlers = this._actionHandlers || [];
  }

  getActionHandler(type: string, fieldType: string) {
    const handler = this.actionHandlers.find(f => f.type === type && f.fieldType === fieldType);
    return handler || this.actionHandlers.find(f => f.type === type);
  }

  handle(action: DynamicFormAction, $event: Event) {
    const handler = this.getActionHandler(action.template.action, action.parent.fieldClassType);
    if (handler) {
      $event.stopPropagation();
      handler.func(action.parent, action);
    }
  }
}
