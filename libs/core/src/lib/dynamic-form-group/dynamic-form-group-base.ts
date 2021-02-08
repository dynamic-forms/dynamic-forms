import { FormGroup } from '@angular/forms';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export abstract class DynamicFormGroupBase<
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Template> = DynamicFormGroupDefinition<Template>,
  Group extends DynamicFormGroup<Template, Definition> = DynamicFormGroup<Template, Definition>
> extends DynamicFormFieldBase<FormGroup, Template, Definition, Group> {

  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get children(): DynamicFormElement[] { return this.field.children; }
  get headerActions(): DynamicFormAction[] { return this.field.headerActions; }
  get footerActions(): DynamicFormAction[] { return this.field.footerActions; }
}
