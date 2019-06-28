export interface DynamicFormInputOptionItem {
  label: string;
  value?: string | number;
  items?: DynamicFormInputOption[];
}

export interface DynamicFormInputOption extends DynamicFormInputOptionItem {
  value: string | number;
}

export interface DynamicFormInputOptionGroup extends DynamicFormInputOptionItem {
  items: DynamicFormInputOption[];
}
