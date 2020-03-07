export interface DynamicFormFieldExpressionData {
  readonly id: string;
  readonly key: string;
  readonly index: number;
  readonly model: any;
  readonly status: string;
  readonly [key: string]: any;
  readonly parent: DynamicFormFieldExpressionData;
  readonly root: DynamicFormFieldExpressionData;
}
