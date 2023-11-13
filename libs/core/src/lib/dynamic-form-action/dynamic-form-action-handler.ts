import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormAction } from './dynamic-form-action';

export type DynamicFormActionFunc<Element extends DynamicFormElement = DynamicFormElement> = (
  element: Element,
  action?: DynamicFormAction,
) => void;

export interface DynamicFormActionHandler<Element extends DynamicFormElement = DynamicFormElement> {
  type: string;
  elementFunc?: (action: DynamicFormAction) => Element;
  func: DynamicFormActionFunc<Element>;
  libraryName: DynamicFormLibraryName;
}
