import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler-config';
import { DynamicFormActionService } from './dynamic-form-action.service';

@NgModule({
  providers: [
    DynamicFormActionService
  ]
})
export class DynamicFormActionModule {
  static withHandler<Element extends DynamicFormElement = DynamicFormElement>(
    handler: DynamicFormActionHandler<Element>
  ): ModuleWithProviders<DynamicFormActionModule> {
    return {
      ngModule: DynamicFormActionModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG,
          useValue: handler,
          multi: true
        }
      ]
    };
  }

  static withHandlers<Element extends DynamicFormElement = DynamicFormElement>(
    handlers: DynamicFormActionHandler<Element>[]
  ): ModuleWithProviders<DynamicFormActionModule> {
    return {
      ngModule: DynamicFormActionModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG,
          useValue: handlers,
          multi: true
        }
      ]
    };
  }

  static withHandlerFactory<Element extends DynamicFormElement = DynamicFormElement>(
    handlerFactory: (deps?: any) => DynamicFormActionHandler<Element>, deps?: any[]
  ): ModuleWithProviders<DynamicFormActionModule> {
    return {
      ngModule: DynamicFormActionModule,
      providers: [
        {
          provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG,
          useFactory: handlerFactory,
          deps: deps,
          multi: true
        }
      ]
    };
  }
}
