import { Component } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryBase } from './dynamic-form-dictionary-base';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-dictionary.component.html'
})
export class DynamicFormDictionaryComponent<
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Template> = DynamicFormDictionaryDefinition<Template>,
  Dictionary extends DynamicFormDictionary<Template, Definition> = DynamicFormDictionary<Template, Definition>
> extends DynamicFormDictionaryBase<Template, Definition, Dictionary> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
