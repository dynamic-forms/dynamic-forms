import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export type DynamicFormFieldFactory<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Field extends DynamicFormField<Value, Model, Control, Template, Definition> =
    DynamicFormField<Value, Model, Control, Template, Definition>
> = DynamicFormClassFactory<Template, Definition, Field>;
