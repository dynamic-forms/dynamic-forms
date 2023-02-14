import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export type DynamicFormFieldFactory<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Value, Template> = DynamicFormFieldDefinition<Value, Template>,
  Field extends DynamicFormField<Value, Model, Control, Template, Definition> =
    DynamicFormField<Value, Model, Control, Template, Definition>,
  Type extends DynamicFormFieldType = DynamicFormFieldType
> = DynamicFormClassFactory<Template, Definition, Field, Type>;
