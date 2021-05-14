import { Observable, Subject } from 'rxjs';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

export class DynamicForm extends DynamicFormGroup<DynamicFormTemplate, DynamicFormDefinition> {
  private _submit: Subject<boolean>;
  private _submit$: Observable<boolean>;

  constructor(builder: DynamicFormBuilder, definition: DynamicFormDefinition, model: any) {
    super(builder, null, null, definition, model);
    this._root = this;
    this._submit = new Subject();
    this._submit$ = this._submit.asObservable();
  }

  get hidden(): boolean { return this.template.hidden || false; }
  get readonly(): boolean { return this.template.readonly || false; }

  get submit$(): Observable<boolean> { return this._submit$; }

  submit(): void {
    this._submit.next(true);
  }
}
