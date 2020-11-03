import { Observable } from 'rxjs';
import { DynamicFormElement } from '../../dynamic-form-element/dynamic-form-element';
import { DynamicFormAction } from '../dynamic-form-action';
import { DynamicFormActionBase } from '../dynamic-form-action-base';
import { DynamicFormActionService } from '../dynamic-form-action.service';
import { DynamicFormDialog } from './dynamic-form-dialog';
import { DynamicFormDialogDefinition } from './dynamic-form-dialog-definition';
import { DynamicFormDialogTemplate } from './dynamic-form-dialog-template';

export abstract class DynamicFormDialogBase<
  Template extends DynamicFormDialogTemplate = DynamicFormDialogTemplate,
  Definition extends DynamicFormDialogDefinition<Template> = DynamicFormDialogDefinition<Template>,
  Action extends DynamicFormDialog<Template, Definition> = DynamicFormDialog<Template, Definition>
> extends DynamicFormActionBase<Template, Definition, Action> {

  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }

  get isOpen(): boolean { return this.element.isOpen; }
  get isOpen$(): Observable<boolean> { return this.element.isOpenChange; }

  get dialogElements(): DynamicFormElement[] { return this.element.dialogElements; }
  get dialogActions(): DynamicFormAction[] { return this.element.dialogActions; }

  open(): void { this.element.open(); }
  close(): void { this.element.close(); }
  toggle(): void { this.element.toggle(); }
}
