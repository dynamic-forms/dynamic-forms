import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';

export type DynamicFormClassFactory<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Element extends DynamicFormElement<Template, Definition> = DynamicFormElement<Template, Definition>
> = (builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: Definition) => Element;
