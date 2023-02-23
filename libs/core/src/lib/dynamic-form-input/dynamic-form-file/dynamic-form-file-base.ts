import { Directive, OnInit, ViewChild } from '@angular/core';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormIconDefinition } from '../../dynamic-form-action/dynamic-form-icon/dynamic-form-icon-definition';
import { DynamicFormValidationService } from '../../dynamic-form-validation/dynamic-form-validation.service';
import { mergeObject } from '../../dynamic-form/dynamic-form-helpers';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormInputBase } from '../dynamic-form-input-base';
import { DynamicFormFile, DynamicFormFileDefinition, DynamicFormFileTemplate } from './dynamic-form-file';
import { DynamicFormFileDirective } from './dynamic-form-file.directive';

@Directive()
export abstract class DynamicFormFileBase extends DynamicFormInputBase<DynamicFormFile, DynamicFormFileTemplate, DynamicFormFileDefinition>
  implements OnInit {

  private _uploadAction: DynamicFormAction;

  @ViewChild(DynamicFormFileDirective)
  private _fileInput: DynamicFormFileDirective;

  readonly defaultUploadActionDefinition: DynamicFormActionDefinition = {
    type: 'icon',
    template: {
      type: 'button',
      icon: 'attach_file',
    },
  } as DynamicFormIconDefinition;

  constructor(protected builder: DynamicFormBuilder, protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }

  get uploadAction(): DynamicFormAction {
    return this._uploadAction;
  }

  ngOnInit(): void {
    const root = this.field.root;
    const parent = this.field;
    const definitionBase = !!this.definition.uploadAction
      ? mergeObject(this.defaultUploadActionDefinition, this.definition.uploadAction)
      : this.defaultUploadActionDefinition;
    const definition = this.builder.getDefinition(definitionBase, root);
    definition.template.action = () => this._fileInput.openFileExplorer();
    this._uploadAction = this.builder.createFormAction(root, parent, definition);
  }
}
