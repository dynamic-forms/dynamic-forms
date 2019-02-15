import { FormControlOptions } from './form-control-options';
import { FormControlType } from './form-control-type';

export interface FormControlInput {
  type: FormControlType;
  placeholder: string;
  options?: FormControlOptions;
  readonly?: boolean;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}
