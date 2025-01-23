import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { FormRecordBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

export abstract class DynamicFormDictionaryBase<
  Value = any,
  Model extends Value = Value,
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Value, Template> = DynamicFormDictionaryDefinition<Value, Template>,
  Dictionary extends DynamicFormDictionary<Value, Model, Template, Definition> = DynamicFormDictionary<Value, Model, Template, Definition>,
> extends DynamicFormFieldBase<Record<string, Value>, Record<string, Model>, FormRecordBase<Value>, Template, Definition, Dictionary> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get children(): DynamicFormField[] {
    return this.field.children;
  }

  get headerActions(): DynamicFormAction[] {
    return this.field.headerActions;
  }

  get footerActions(): DynamicFormAction[] {
    return this.field.footerActions;
  }
}
