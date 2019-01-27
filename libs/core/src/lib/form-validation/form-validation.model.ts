export interface FormValidationError {
  message?: string;
}

export interface FormValidationErrors {
  [key: string]: FormValidationError;
}

export interface FormValidation {
  [key: string ]: boolean;
}
