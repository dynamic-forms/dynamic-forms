import { Component } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayBase } from './dynamic-form-array-base';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html',
})
export class DynamicFormArrayComponent<
  TValue = any, TModel extends TValue = TValue,
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>,
  Array extends DynamicFormArray<TValue, TModel, Template, Definition> = DynamicFormArray<TValue, TModel, Template, Definition>
> extends DynamicFormArrayBase<TValue, TModel, Template, Definition, Array> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
