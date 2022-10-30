import { Observable, Subject } from 'rxjs';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
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

  protected override initId(): void {}
}
