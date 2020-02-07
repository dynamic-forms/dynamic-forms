import { FormGroup } from '@angular/forms';
import { DynamicFormFieldFactory } from '../dynamic-form-field/dynamic-form-field-factory';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export type DynamicFormGroupFactory<
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Template> = DynamicFormGroupDefinition<Template>,
  Group extends DynamicFormGroup<Template, Definition> = DynamicFormGroup<Template, Definition>
> = DynamicFormFieldFactory<FormGroup, Template, Definition, Group>;
