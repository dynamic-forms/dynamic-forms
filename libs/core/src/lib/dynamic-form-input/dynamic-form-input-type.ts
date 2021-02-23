import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormInputBase } from '../dynamic-form-input/dynamic-form-input-base';

export interface DynamicFormInputType extends DynamicFormComponentType<DynamicFormInputBase> {
  wrappers?: string[];
}
