import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler-config';
import { DynamicFormActionService } from './dynamic-form-action.service';

export function dynamicFormDialogOpen(action: DynamicFormAction): void {
  action.openDialog();
}

export const dynamicFormDialogOpenHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'openDialog',
  func: dynamicFormDialogOpen,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDialogClose(action: DynamicFormAction): void {
  action.closeDialog();
}

export const dynamicFormDialogCloseHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'closeDialog',
  func: dynamicFormDialogClose,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDialogToggle(action: DynamicFormAction): void {
  action.toggleDialog();
}

export const dynamicFormDialogToggleHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'toggleDialog',
  func: dynamicFormDialogToggle,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormDialogHandlers: DynamicFormActionHandler<DynamicFormAction>[] = [
  dynamicFormDialogOpenHandler,
  dynamicFormDialogCloseHandler,
  dynamicFormDialogToggleHandler
];

@NgModule({
  providers: [
    {
      provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG,
      useValue: dynamicFormDialogHandlers,
      multi: true
    },
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
    handlerFactory: (...deps: any[]) => DynamicFormActionHandler<Element>, deps?: any[]
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
