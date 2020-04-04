import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler-config';
import { DynamicFormActionService } from './dynamic-form-action.service';

@NgModule({
  providers: [
    DynamicFormActionService
  ]
})
export class DynamicFormActionModule {
  static withHandler<Field extends DynamicFormField = DynamicFormField>(
    handler: DynamicFormActionHandler<Field>
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

  static withHandlers<Field extends DynamicFormField = DynamicFormField>(
    handlers: DynamicFormActionHandler<Field>[]
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

  static withHandlerFactory<Field extends DynamicFormField = DynamicFormField>(
    handlerFactory: (deps?: any) => DynamicFormActionHandler<Field>, deps?: any[]
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
