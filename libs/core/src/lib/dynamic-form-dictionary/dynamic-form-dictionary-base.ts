import { AbstractControl, FormRecord } from '@angular/forms';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

export abstract class DynamicFormDictionaryBase<
  TValue = any,
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Template> = DynamicFormDictionaryDefinition<Template>,
  Dictionary extends DynamicFormDictionary<TValue, Template, Definition> = DynamicFormDictionary<TValue, Template, Definition>
> extends DynamicFormFieldBase<TValue, FormRecord<AbstractControl<TValue>>, Template, Definition, Dictionary> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get children(): DynamicFormField[] { return this.field.children; }
  get headerActions(): DynamicFormAction[] { return this.field.headerActions; }
  get footerActions(): DynamicFormAction[] { return this.field.footerActions; }
}
