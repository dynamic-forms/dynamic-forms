import { Observable, Subject } from 'rxjs';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { extractFiles } from '../dynamic-form-input/dynamic-form-file/dynamic-form-file-helpers';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

export class DynamicForm<
  Value extends { [key: string]: any } = any, Model extends Value = Value,
> extends DynamicFormGroup<Value, Model, DynamicFormTemplate, DynamicFormDefinition> {

  private readonly _submit = new Subject<boolean>();
  private readonly _submit$ = this._submit.asObservable();

  constructor(builder: DynamicFormBuilder, definition: DynamicFormDefinition, model: Model) {
    super(builder, definition, model);
  }

  override get hidden(): boolean { return this.template.hidden || false; }
  override get readonly(): boolean { return this.template.readonly || false; }

  get submit$(): Observable<boolean> { return this._submit$; }

  submit(): void {
    this._submit.next(true);
  }

  getFiles(): FormData {
    const files = extractFiles(this.value);
    if (!files.length) {
      return undefined;
    }
    const formData = new FormData();
    files.forEach(({ key, file }) => formData.append(key, file));
    return formData;
  }

  protected override initId(): void {}
}
