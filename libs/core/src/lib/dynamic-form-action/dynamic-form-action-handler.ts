import { InjectionToken } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormAction } from './dynamic-form-action';

export type DynamicFormActionFunc<Field extends DynamicFormField = DynamicFormField> =
  (field: Field, action?: DynamicFormAction) => void;

export interface DynamicFormActionHandler<Field extends DynamicFormField = DynamicFormField> {
  type: string;
  func: DynamicFormActionFunc<Field>;
  libraryName: DynamicFormLibraryName;
}

export type DynamicFormActionHandlers = DynamicFormActionHandler[];

export const DYNAMIC_FORM_ACTION_HANDLERS = new InjectionToken<DynamicFormActionHandlers>('DynamicFormActionHandlers');
