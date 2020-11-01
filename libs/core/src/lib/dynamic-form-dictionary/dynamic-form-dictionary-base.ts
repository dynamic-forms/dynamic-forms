import { FormGroup } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

export abstract class DynamicFormDictionaryBase<
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Template> = DynamicFormDictionaryDefinition<Template>,
  Dictionary extends DynamicFormDictionary<Template, Definition> = DynamicFormDictionary<Template, Definition>
> extends DynamicFormFieldBase<FormGroup, Template, Definition, Dictionary> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
