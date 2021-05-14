import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { DynamicFormModalTemplate } from './dynamic-form-modal-template';

export class DynamicFormModal<
  Template extends DynamicFormModalTemplate = DynamicFormModalTemplate,
  Definition extends DynamicFormModalDefinition<Template> = DynamicFormModalDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  private readonly _isOpenSubject: BehaviorSubject<boolean>;
  private readonly _isOpenChanges: Observable<boolean>;

  protected _trigger: DynamicFormAction;

  protected _headerActions: DynamicFormAction[] = [];
  protected _footerActions: DynamicFormAction[] = [];

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(builder, root, parent, definition);
    this._isOpenSubject = new BehaviorSubject(false);
    this._isOpenChanges = this._isOpenSubject.asObservable();
    this.extendExpressionData({
      isOpen: () => this.isOpen,
      maximized: () => this.template.maximized
    });
  }

  get trigger(): DynamicFormAction { return this._trigger; }

  get headerActions(): DynamicFormAction[] { return this._headerActions; }
  get footerActions(): DynamicFormAction[] { return this._footerActions; }

  get isOpen(): boolean { return this._isOpenSubject.value; }
  get isOpenChanges(): Observable<boolean> { return this._isOpenChanges; }

  init(): void {
    this.initExpressions(this._builder.createElementExpressions(this));
    this.initTrigger(this._builder.createFormAction(this.root, this, this.definition.trigger));
    this.initChildren(this._builder.createFormElements(this.root, this.parent, this.definition.children));
    this.initHeaderActions(this._builder.createFormActions(this.root, this, this.definition.headerActions));
    this.initFooterActions(this._builder.createFormActions(this.root, this, this.definition.footerActions));
  }

  open(): void {
    return !this.isOpen && this.toggle();
  }

  close(): void {
    return this.isOpen && this.toggle();
  }

  toggle(): void {
    this._isOpenSubject.next(!this.isOpen);
  }

  maximize(): void {
    return !this.template.maximized && this.toggleSize();
  }

  minimize(): void {
    return this.template.maximized && this.toggleSize();
  }

  toggleSize(): void {
    const descriptor = Object.getOwnPropertyDescriptor(this.template, 'maximized');
    if (!descriptor || descriptor.writable) {
      this.template.maximized = !this.template.maximized;
    }
  }

  protected initTrigger(trigger: DynamicFormAction): void {
    this._trigger = trigger;
  }

  protected initHeaderActions(actions: DynamicFormAction[]): void {
    this._headerActions = actions || [];
  }

  protected initFooterActions(actions: DynamicFormAction[]): void {
    this._footerActions = actions || [];
  }
}
