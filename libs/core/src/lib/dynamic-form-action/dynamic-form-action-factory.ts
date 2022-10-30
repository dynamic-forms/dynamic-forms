import { DynamicFormClassFactory } from '../dynamic-form-config/dynamic-form-class-factory';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';
import { DynamicFormActionType } from './dynamic-form-action-type';

export type DynamicFormActionFactory<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>,
  Action extends DynamicFormAction<Template, Definition> = DynamicFormAction<Template, Definition>,
  Type extends DynamicFormActionType = DynamicFormActionType
> = DynamicFormClassFactory<Template, Definition, Action, Type>;
