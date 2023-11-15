import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';
import { DynamicFormElementType } from './dynamic-form-element-type';

export type DynamicFormElementFactory<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>,
  Element extends DynamicFormElement<Template, Definition> = DynamicFormElement<Template, Definition>,
  Type extends DynamicFormElementType = DynamicFormElementType,
> = DynamicFormClassFactory<Template, Definition, Element, Type>;
