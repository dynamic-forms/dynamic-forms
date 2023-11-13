import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementsComponent } from '../dynamic-form-element/dynamic-form-elements.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayBase } from './dynamic-form-array-base';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

@Component({
  standalone: true,
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html',
  imports: [CommonModule, DynamicFormElementsComponent],
})
export class DynamicFormArrayComponent<
  Value = any, Model extends Value = Value,
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Value, Template> = DynamicFormArrayDefinition<Value, Template>,
  Array extends DynamicFormArray<Value, Model, Template, Definition> = DynamicFormArray<Value, Model, Template, Definition>
> extends DynamicFormArrayBase<Value, Model, Template, Definition, Array> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
