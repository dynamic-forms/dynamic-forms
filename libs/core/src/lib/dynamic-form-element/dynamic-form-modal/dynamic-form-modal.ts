import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { DynamicFormModalTemplate } from './dynamic-form-modal-template';

export class DynamicFormModal<
  Template extends DynamicFormModalTemplate = DynamicFormModalTemplate,
  Definition extends DynamicFormModalDefinition<Template> = DynamicFormModalDefinition<Template>
> extends DynamicFormElement<Template, Definition> {
  private _isOpenSubject: BehaviorSubject<boolean>;
  private _isOpenChange: Observable<boolean>;

  protected _actions: DynamicFormAction[] = [];
  protected _trigger: DynamicFormAction;

  constructor(definition: Definition) {
    super(definition);
    this._isOpenSubject = new BehaviorSubject(false);
    this._isOpenChange = this._isOpenSubject.asObservable();
    this.extendExpressionData({
      isOpen: () => this.isOpen
    });
  }

  get isOpen(): boolean { return this._isOpenSubject.value; }
  get isOpenChange(): Observable<boolean> { return this._isOpenChange; }

  get actions(): DynamicFormAction[] { return this._actions; }
  get trigger(): DynamicFormAction { return this._trigger; }

  initActions(actions: DynamicFormAction[]): void {
    this._actions = actions || [];
  }

  initTrigger(trigger: DynamicFormAction): void {
    this._trigger = trigger;
  }

  open(): void {
    return !this.isOpen && this._isOpenSubject.next(true);
  }

  close(): void {
    return this.isOpen && this._isOpenSubject.next(false);
  }

  toggle(): void {
    this._isOpenSubject.next(!this.isOpen);
  }
}
