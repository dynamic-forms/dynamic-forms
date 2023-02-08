export enum DynamicFormErrorType {
  Unspecified = 'Unspecified',
  Definition = 'Definition',
  DefinitionReference = 'Definition reference',
  ClassType = 'Class type',
  ElementType = 'Element type',
  FieldType = 'Field type',
  ActionType = 'Action type',
  Expression = 'Expression',
  ExpressionCreation = 'Expression creation',
  ExpressionEvaluation = 'Expression evaluation'
}

export class DynamicFormError<ErrorType extends DynamicFormErrorType = DynamicFormErrorType> extends Error {
  override readonly stack?: string;

  constructor(readonly type: ErrorType, override readonly message: string, protected error?: Error) {
    super(message);
    this.stack = this.error?.stack;
  }
}
