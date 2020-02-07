import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';

export type DynamicFormClassFactory<
  Definition extends DynamicFormElementDefinition = DynamicFormElementDefinition,
  Element extends DynamicFormElement = DynamicFormElement
> = (builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: Definition) => Element;
