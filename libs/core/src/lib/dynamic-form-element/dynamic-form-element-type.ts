import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementFactory } from './dynamic-form-element-factory';

export interface DynamicFormElementType extends DynamicFormComponentType<DynamicFormElementBase> {
  factory?: DynamicFormElementFactory;
}
