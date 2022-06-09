import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export type DynamicFormFieldFactory<
  TValue = any, TModel extends TValue = TValue,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Field extends DynamicFormField<TValue, TModel, Control, Template, Definition> =
    DynamicFormField<TValue, TModel, Control, Template, Definition>
> = DynamicFormClassFactory<Template, Definition, Field>;
