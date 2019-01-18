export interface FormControlOption {
  value: string | number;
  label: string;
}

export interface FormControlInput {
  type: string;
  placeholder: string;
  options?: FormControlOption[];
  disabled?: boolean;
  required?: boolean;
  email?: boolean;
  pattern?: string | RegExp;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}
