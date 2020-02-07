import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export type DynamicFormFieldFactory<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Field extends DynamicFormField<Control, Template, Definition> = DynamicFormField<Control, Template, Definition>
> = DynamicFormClassFactory<Template, Definition, Field>;
