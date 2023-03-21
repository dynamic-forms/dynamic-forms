import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export type DynamicFormControlAddOnDefinition = DynamicFormElementDefinition | DynamicFormActionDefinition;

export type DynamicFormControlAddOn = DynamicFormElement | DynamicFormAction;

export interface DynamicFormControlDefinition<
  Value = any,
  FormInput extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Template extends DynamicFormControlTemplate<Value, FormInput> = DynamicFormControlTemplate<Value, FormInput>
> extends DynamicFormFieldDefinition<Value, Template> {
  children?: undefined;
  headerActions?: undefined;
  footerActions?: undefined;
  prefixAddOn?: DynamicFormControlAddOnDefinition;
  suffixAddOn?: DynamicFormControlAddOnDefinition;
}
