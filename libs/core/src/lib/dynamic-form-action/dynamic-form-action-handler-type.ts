import { InjectionToken } from '@angular/core';
import { DynamicFormLibraryName } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionHandler } from './dynamic-form-action-handler';

export interface DynamicFormActionHandlerType<Field extends DynamicFormField = DynamicFormField> {
  type: string;
  handler: DynamicFormActionHandler<Field>;
  libraryName: DynamicFormLibraryName;
}

export type DynamicFormActionHandlerTypes = DynamicFormActionHandlerType[];

export const DYNAMIC_FORM_ACTION_HANDLER_TYPES = new InjectionToken<DynamicFormActionHandlerTypes>('DynamicFormActionHandlerTypes');
