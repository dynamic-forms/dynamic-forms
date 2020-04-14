import { InjectionToken } from '@angular/core';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';

export type DynamicFormActionHandlerConfig = (DynamicFormActionHandler | DynamicFormActionHandler[])[];

export const DYNAMIC_FORM_ACTION_HANDLER_CONFIG = new InjectionToken<DynamicFormActionHandlerConfig>('DynamicFormActionHandlerConfig');
