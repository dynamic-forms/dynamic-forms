import { Provider } from '@angular/core';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';
import { DYNAMIC_FORM_ACTION_HANDLER_CONFIG } from './dynamic-form-action-handler-config';
import { DynamicFormActionService } from './dynamic-form-action.service';

export const dynamicFormDialogOpen = (action: DynamicFormAction) => action.openDialog();

export const dynamicFormDialogOpenHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'openDialog',
  func: dynamicFormDialogOpen,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormDialogClose = (action: DynamicFormAction) => action.closeDialog();

export const dynamicFormDialogCloseHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'closeDialog',
  func: dynamicFormDialogClose,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormDialogToggle = (action: DynamicFormAction) => {
  action.toggleDialog();
};

export const dynamicFormDialogToggleHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'toggleDialog',
  func: dynamicFormDialogToggle,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormDialogHandlers: DynamicFormActionHandler<DynamicFormAction>[] = [
  dynamicFormDialogOpenHandler,
  dynamicFormDialogCloseHandler,
  dynamicFormDialogToggleHandler,
];

export const dynamicFormActionProviders: Provider[] = [DynamicFormActionService];

export function withDynamicFormActionDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormActionHandlers(...dynamicFormDialogHandlers)];
}

export function withDynamicFormActionHandlers<Element extends DynamicFormElement = DynamicFormElement>(
  ...handlers: DynamicFormActionHandler<Element>[]
): DynamicFormsFeature {
  const providers = handlers.map(handler => {
    return {
      provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG,
      useValue: handler,
      multi: true,
    };
  });
  return { providers };
}

export function withDynamicFormActionHandlerFactory<Element extends DynamicFormElement = DynamicFormElement>(
  handlerFactory: (...depTypes: any[]) => DynamicFormActionHandler<Element>,
  deps?: any[],
): DynamicFormsFeature {
  const provider = { provide: DYNAMIC_FORM_ACTION_HANDLER_CONFIG, useFactory: handlerFactory, deps, multi: true };
  return { providers: [provider] };
}
