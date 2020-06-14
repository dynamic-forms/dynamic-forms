import { Component } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayBase } from './dynamic-form-array-base';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html'
})
export class DynamicFormArrayComponent<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>,
  Array extends DynamicFormArray<Template, Definition> = DynamicFormArray<Template, Definition>
> extends DynamicFormArrayBase<Template, Definition, Array> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get elements(): DynamicFormElement[] { return this.field.elements; }
  get actions(): DynamicFormAction[] { return this.field.actions; }
}
