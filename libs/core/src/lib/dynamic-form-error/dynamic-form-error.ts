import { DynamicFormErrorType } from './dynamic-form-error-type';

export class DynamicFormError<ErrorType extends DynamicFormErrorType = DynamicFormErrorType> extends Error {
  override readonly stack?: string;

  constructor(
    readonly type: ErrorType,
    override readonly message: string,
    protected error?: Error,
  ) {
    super(message);
    this.stack = this.error?.stack;
  }
}
