import { DynamicFormErrorType } from './dynamic-form-error-type';

export type DynamicFormLogType<ErrorType extends DynamicFormErrorType = DynamicFormErrorType> = ErrorType | string;
