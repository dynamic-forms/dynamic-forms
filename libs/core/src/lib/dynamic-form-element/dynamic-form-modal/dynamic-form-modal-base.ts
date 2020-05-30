import { Observable } from 'rxjs';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { DynamicFormModalTemplate } from './dynamic-form-modal-template';

export abstract class DynamicFormModalBase<
  Template extends DynamicFormModalTemplate = DynamicFormModalTemplate,
  Definition extends DynamicFormModalDefinition<Template> = DynamicFormModalDefinition<Template>,
  Modal extends DynamicFormModal<Template, Definition> = DynamicFormModal<Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Modal> {

  constructor() {
    super();
  }

  get elements(): DynamicFormElement[] { return this.element.elements; }
  get actions(): DynamicFormAction[] { return this.element.actions; }
  get trigger(): DynamicFormAction { return this.element.trigger; }

  get isOpen(): boolean { return this.element.isOpen; }
  get isOpen$(): Observable<boolean> { return this.element.isOpenChange; }

  open(): void { this.element.open(); }
  close(): void { this.element.close(); }
  toggle(): void { this.element.toggle(); }
}
