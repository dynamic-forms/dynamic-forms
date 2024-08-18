export interface DynamicFormConverter<TValue = any, TOptions = any> {
  parse(value: any, options?: TOptions): TValue | null;
  format(value: any, options?: TOptions): string | null;
}
