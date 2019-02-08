import { FormControlOptions } from './form-control-options';

export interface FormControlInput {
  type: string;
  placeholder: string;
  options?: FormControlOptions;
  readonly?: boolean;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}
