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
    super.init();
    this.initTrigger();
    this.initHeaderActions();
    this.initFooterActions();
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

  protected getChildren(): DynamicFormElement[] {
    return this._builder.createFormElements(this.root, this.parent, this.definition.children);
  }

  protected initTrigger(): void {
    this._trigger = this._builder.createFormAction(this.root, this, this.definition.trigger);
  }

  protected initHeaderActions(): void {
    this._headerActions = this._builder.createFormActions(this.root, this, this.definition.headerActions) || [];
  }

  protected initFooterActions(): void {
    this._footerActions = this._builder.createFormActions(this.root, this, this.definition.footerActions) || [];
  }
}
