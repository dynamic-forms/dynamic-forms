import { Directive, OnInit, ViewChild } from '@angular/core';
import { mergeObject } from '../../dynamic-form/dynamic-form-helpers';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionTemplate } from '../../dynamic-form-action/dynamic-form-action-template';
import { DynamicFormIconDefinition } from '../../dynamic-form-action/dynamic-form-icon/dynamic-form-icon-definition';
import { DynamicFormValidationService } from '../../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormInputBase } from '../dynamic-form-input-base';
import { DynamicFormFile, DynamicFormFileDefinition, DynamicFormFileTemplate } from './dynamic-form-file';
import { DynamicFormFileDirective } from './dynamic-form-file.directive';

@Directive({})
export abstract class DynamicFormFileBase
  extends DynamicFormInputBase<DynamicFormFile, DynamicFormFileTemplate, DynamicFormFileDefinition>
  implements OnInit
{
  private _uploadAction: DynamicFormAction;

  @ViewChild(DynamicFormFileDirective)
  protected _fileInput: DynamicFormFileDirective;

  readonly defaultUploadActionDefinition: DynamicFormActionDefinition = {
    type: 'icon',
    template: {
      type: 'button',
      icon: 'attach_file',
      color: 'inputAction',
    },
  } as DynamicFormIconDefinition;

  readonly requiredUploadActionDefinition: Partial<DynamicFormActionDefinition> = {
    template: { action: () => this._fileInput.openFileExplorer() } as DynamicFormActionTemplate,
    expressions: { disabled: _ => this.field.control.disabled || this.field.readonly },
  };

  constructor(
    protected builder: DynamicFormBuilder,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(validationService);
  }

  get uploadAction(): DynamicFormAction {
    return this._uploadAction;
  }

  ngOnInit(): void {
    const definition = this.getDefinition();
    this._uploadAction = this.builder.createFormAction(this.field.root, this.field, definition);
  }

  private getDefinition(): DynamicFormActionDefinition {
    const definitionBase = this.definition.uploadActionDefinition
      ? mergeObject(this.defaultUploadActionDefinition, this.definition.uploadActionDefinition)
      : this.defaultUploadActionDefinition;
    const definition = this.builder.getDefinition(definitionBase, this.field.root);
    return mergeObject(definition, this.requiredUploadActionDefinition);
  }
}
