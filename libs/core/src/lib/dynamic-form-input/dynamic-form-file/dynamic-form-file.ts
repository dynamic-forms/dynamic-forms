import { DynamicFormActionDefinition } from '../../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormControlTemplate } from '../../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormInput, DynamicFormInputControl, DynamicFormInputDefinition } from '../dynamic-form-input';

export class DynamicFormFileUpload {
  constructor(readonly file: File) {}

  get name(): string { return this.file.name; }
  get type(): string { return this.file.type; }
  get size(): number { return this.file.size; }

  toJSON(): any { return { name: this.name, type: this.type, size: this.size }; }
}

export type DynamicFormFileValue = DynamicFormFileUpload | DynamicFormFileUpload[];

export interface DynamicFormFile extends DynamicFormInput<DynamicFormFileValue> {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
}

export type DynamicFormFileTemplate = DynamicFormControlTemplate<DynamicFormFileValue, DynamicFormFile>;

export interface DynamicFormFileDefinition extends DynamicFormInputDefinition<DynamicFormFile> {
  uploadActionDefinition?: DynamicFormActionDefinition;
}

export class DynamicFormFileControl extends DynamicFormInputControl<DynamicFormFile> {}
