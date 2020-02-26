import { InjectionToken } from '@angular/core';
import { DynamicFormLibraryName } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';

export type DynamicFormActionFunc<Field extends DynamicFormField = DynamicFormField> =
  (field: Field, action?: DynamicFormAction) => void;

export interface DynamicFormActionHandler<Field extends DynamicFormField = DynamicFormField> {
  type: string;
  fieldType?: string;
  func: DynamicFormActionFunc<Field>;
  libraryName: DynamicFormLibraryName;
}

export type DynamicFormActionHandlers = DynamicFormActionHandler[];

export const DYNAMIC_FORM_ACTION_HANDLERS = new InjectionToken<DynamicFormActionHandlers>('DynamicFormActionHandlers');
