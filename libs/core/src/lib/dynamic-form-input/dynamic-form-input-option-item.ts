export interface DynamicFormInputOptionItem<TValue extends string | number = string | number> {
  label: string;
  value?: TValue;
  items?: DynamicFormInputOptionItem<TValue>[];
  disabled?: boolean;
}

export interface DynamicFormInputOption<TValue extends string | number = string | number> extends DynamicFormInputOptionItem<TValue> {
  value: TValue;
  items?: undefined;
}

export interface DynamicFormInputOptionGroup<TValue extends string | number = string | number> extends DynamicFormInputOptionItem<TValue> {
  value?: undefined;
  items: DynamicFormInputOption<TValue>[];
}
