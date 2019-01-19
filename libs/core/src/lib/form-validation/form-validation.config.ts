export interface FormValidationConfig {
  defaultMessage: string;
  messages: { [key: string]: string };
}

export const defaultFormValidationConfig: FormValidationConfig = {
  defaultMessage: 'The field is invalid.',
  messages: {
    required: 'The field is required.',
    email: 'The field is not an email.',
    pattern: 'The field does not fit the pattern.',
    min: 'The field does not fit the min value',
    max: 'The field does not fit the max value',
    minlength: 'The field does not fit the min length',
    maxlength: 'The field does not fit the max length'
  }
};
