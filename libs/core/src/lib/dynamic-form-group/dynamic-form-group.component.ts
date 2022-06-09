import { Component } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupBase } from './dynamic-form-group-base';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
})
export class DynamicFormGroupComponent<
  TValue = any, TModel extends TValue = TValue,
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Template> = DynamicFormGroupDefinition<Template>,
  Group extends DynamicFormGroup<TValue, TModel, Template, Definition> = DynamicFormGroup<TValue, TModel, Template, Definition>
> extends DynamicFormGroupBase<TValue, TModel, Template, Definition, Group> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
