import { DynamicFormComponentType } from '../dynamic-form-config/dynamic-form-component-type';
import { DynamicFormActionBase } from './dynamic-form-action-base';
import { DynamicFormActionFactory } from './dynamic-form-action-factory';

export interface DynamicFormActionType extends DynamicFormComponentType<DynamicFormActionBase> {
  factory?: DynamicFormActionFactory;
}
