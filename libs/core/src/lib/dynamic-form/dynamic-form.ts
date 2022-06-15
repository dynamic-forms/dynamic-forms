import { Observable, Subject } from 'rxjs';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

export class DynamicForm<
  Value extends { [key: string]: any } = any, Model extends Value = Value,
> extends DynamicFormGroup<Value, Model, DynamicFormTemplate, DynamicFormDefinition> {

  private _submit: Subject<boolean>;
  private _submit$: Observable<boolean>;

  constructor(builder: DynamicFormBuilder, definition: DynamicFormDefinition, model: Model) {
    super(builder, definition, model);
    this._root = this;
    this._submit = new Subject();
    this._submit$ = this._submit.asObservable();
  }

  override get hidden(): boolean { return this.template.hidden || false; }
  override get readonly(): boolean { return this.template.readonly || false; }

  get submit$(): Observable<boolean> { return this._submit$; }

  submit(): void {
    this._submit.next(true);
  }

  protected override initId(): void {}
}
