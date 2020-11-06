export interface DynamicFormInputOptionItem {
  label: string;
  value?: string | number;
  items?: DynamicFormInputOptionItem[];
  disabled?: boolean;
}

export interface DynamicFormInputOption extends DynamicFormInputOptionItem {
  value: string | number;
  items?: undefined;
}

export interface DynamicFormInputOptionGroup extends DynamicFormInputOptionItem {
  value?: undefined;
  items: DynamicFormInputOption[];
}
