import { FormArray } from '@angular/forms';
import { DynamicFormFieldFactory } from '../dynamic-form-field/dynamic-form-field-factory';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export type DynamicFormArrayFactory<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>,
  Array extends DynamicFormArray<Template, Definition> = DynamicFormArray<Template, Definition>
> = DynamicFormFieldFactory<FormArray, Template, Definition, Array>;
