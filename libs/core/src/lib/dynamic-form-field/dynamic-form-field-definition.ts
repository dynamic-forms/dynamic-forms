import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export interface DynamicFormFieldDefinition<FieldTemplate extends DynamicFormFieldTemplate = DynamicFormFieldTemplate> {
  key: string;
  type: DynamicFormFieldType;
  wrappers?: DynamicFormWrapperType[];
  template: FieldTemplate;
  expressions?: { [key: string]: string };
}
