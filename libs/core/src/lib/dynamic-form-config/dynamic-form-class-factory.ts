import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormComponentType } from './dynamic-form-component-type';

export type DynamicFormClassFactory<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Element extends DynamicFormElement<Template, Definition> = DynamicFormElement<Template, Definition>,
  Type extends DynamicFormComponentType = DynamicFormComponentType
> = (builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition, type: Type) => Element;
