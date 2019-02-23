import { DynamicFormControlOptions } from './dynamic-form-control-options';
import { DynamicFormControlType } from './dynamic-form-control-type';

export interface DynamicFormControlInput {
  type: DynamicFormControlType;
  placeholder: string;
  inputType?: string;
  options?: DynamicFormControlOptions;
  readonly?: boolean;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}
