import { Observable } from 'rxjs';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element-base';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { DynamicFormModalElement } from './dynamic-form-modal-element';
import { DynamicFormModalTemplate } from './dynamic-form-modal-template';

export abstract class DynamicFormModalBase extends DynamicFormElementBase<
  DynamicFormModalTemplate, DynamicFormModalDefinition, DynamicFormModalElement
> {
  constructor() {
    super();
  }

  get trigger(): DynamicFormAction { return this.element.trigger; }

  get elements(): DynamicFormElement[] { return this.element.elements; }
  get actions(): DynamicFormAction[] { return this.element.actions; }

  get isOpen(): boolean { return this.element.isOpen; }
  get isOpen$(): Observable<boolean> { return this.element.isOpenChange; }

  open(): void { this.element.open(); }
  close(): void { this.element.close(); }
  toggle(): void { this.element.toggle(); }
}
