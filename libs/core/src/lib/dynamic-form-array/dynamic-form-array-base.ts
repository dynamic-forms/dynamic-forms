import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { FormArrayBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export abstract class DynamicFormArrayBase<
  TValue = any, TModel extends TValue = TValue,
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>,
  Array extends DynamicFormArray<TValue, TModel, Template, Definition> = DynamicFormArray<TValue, TModel, Template, Definition>
> extends DynamicFormFieldBase<TValue[], TModel[], FormArrayBase<TValue>, Template, Definition, Array> {

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get children(): DynamicFormField[] { return this.field.children; }
  get headerActions(): DynamicFormAction[] { return this.field.headerActions; }
  get footerActions(): DynamicFormAction[] { return this.field.footerActions; }
}
