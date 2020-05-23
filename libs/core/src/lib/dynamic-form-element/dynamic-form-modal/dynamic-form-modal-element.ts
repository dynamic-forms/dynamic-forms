import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { DynamicFormModalTemplate } from './dynamic-form-modal-template';

export class DynamicFormModalElement extends DynamicFormElement<DynamicFormModalTemplate, DynamicFormModalDefinition> {
  private _isOpenSubject: BehaviorSubject<boolean>;
  private _isOpenChange: Observable<boolean>;

  protected _trigger: DynamicFormAction;
  protected _actions: DynamicFormAction[] = [];

  constructor(definition: DynamicFormModalDefinition) {
    super(definition);
    this._isOpenSubject = new BehaviorSubject(false);
    this._isOpenChange = this._isOpenSubject.asObservable();
    this.extendExpressionData({
      isOpen: () => this.isOpen
    });
  }

  get isOpen(): boolean { return this._isOpenSubject.value; }
  get isOpenChange(): Observable<boolean> { return this._isOpenChange; }

  get trigger(): DynamicFormAction { return this._trigger; }
  get actions(): DynamicFormAction[] { return this._actions; }

  initTrigger(trigger: DynamicFormAction): void {
    this._trigger = trigger;
  }

  initActions(actions: DynamicFormAction[]): void {
    this._actions = actions || [];
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
