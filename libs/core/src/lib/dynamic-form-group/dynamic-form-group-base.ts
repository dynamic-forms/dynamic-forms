import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { FormGroupBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export abstract class DynamicFormGroupBase<
  Value extends Record<string, any> = any,
  Model extends Value = Value,
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Value, Template> = DynamicFormGroupDefinition<Value, Template>,
  Group extends DynamicFormGroup<Value, Model, Template, Definition> = DynamicFormGroup<Value, Model, Template, Definition>,
> extends DynamicFormFieldBase<Value, Model, FormGroupBase<Value>, Template, Definition, Group> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get children(): DynamicFormElement[] {
    return this.field.children;
  }

  get headerActions(): DynamicFormAction[] {
    return this.field.headerActions;
  }

  get footerActions(): DynamicFormAction[] {
    return this.field.footerActions;
  }
}
