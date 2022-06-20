export interface DynamicFormInputOptionItem<Value extends string | number = string | number> {
  label: string;
  value?: Value;
  items?: DynamicFormInputOptionItem<Value>[];
  disabled?: boolean;
}

export interface DynamicFormInputOption<Value extends string | number = string | number> extends DynamicFormInputOptionItem<Value> {
  value: Value;
  items?: undefined;
}

export interface DynamicFormInputOptionGroup<Value extends string | number = string | number> extends DynamicFormInputOptionItem<Value> {
  value?: undefined;
  items: DynamicFormInputOption<Value>[];
}
