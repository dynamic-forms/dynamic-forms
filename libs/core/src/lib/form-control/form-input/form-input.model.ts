export interface FormControlOption {
  value: string | number;
  label: string;
}

export interface FormControlInput {
  type: string;
  placeholder: string;
  options?: FormControlOption[];
  readonly?: boolean;
  required?: boolean;
  email?: boolean;
  pattern?: string | RegExp;
  min?: number | Date;
  max?: number | Date;
  minLength?: number;
  maxLength?: number;
}
