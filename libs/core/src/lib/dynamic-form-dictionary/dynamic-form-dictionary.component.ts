import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementsComponent } from '../dynamic-form-element/dynamic-form-elements.component';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryBase } from './dynamic-form-dictionary-base';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

@Component({
  selector: 'dynamic-form-dictionary',
  templateUrl: './dynamic-form-dictionary.component.html',
  imports: [NgClass, DynamicFormElementsComponent],
})
export class DynamicFormDictionaryComponent<
  Value = any,
  Model extends Value = Value,
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Value, Template> = DynamicFormDictionaryDefinition<Value, Template>,
  Dictionary extends DynamicFormDictionary<Value, Model, Template, Definition> = DynamicFormDictionary<Value, Model, Template, Definition>,
> extends DynamicFormDictionaryBase<Value, Model, Template, Definition, Dictionary> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
