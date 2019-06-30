export interface DynamicFormInputOptionItem {
  label: string;
}

export interface DynamicFormInputOption extends DynamicFormInputOptionItem {
  value: string | number;
}

export interface DynamicFormInputOptionGroup extends DynamicFormInputOptionItem {
  items: DynamicFormInputOption[];
}
