import { Observable } from 'rxjs';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';
import { DynamicFormActionService } from './dynamic-form-action.service';

export abstract class DynamicFormActionBase<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>,
  Action extends DynamicFormAction<Template, Definition> = DynamicFormAction<Template, Definition>
> extends DynamicFormElementBase<Template, Definition, Action> {

  constructor(protected actionService: DynamicFormActionService) {
    super();
  }

  get action(): Action { return this.element; }
  set action(action: Action) { this.element = action; }

  get dialogOpen(): boolean { return this.action.dialogOpen; }
  get dialogOpen$(): Observable<boolean> { return this.action.dialogOpenChanges; }

  get dialogDefinition(): DynamicFormDefinition { return this.action.dialogDefinition; }
  get dialogTemplate(): DynamicFormTemplate { return this.action.dialogTemplate; }

  get dialog(): DynamicForm { return this.action.dialog; }
  get dialogElements(): DynamicFormElement[] { return this.action.dialogElements; }
  get dialogHeaderActions(): DynamicFormAction[] { return this.action.dialogHeaderActions; }
  get dialogFooterActions(): DynamicFormAction[] { return this.action.dialogFooterActions; }

  handleEvent($event: Event): void {
    if (this.dialog) {
      return this.dialogOpen
        ? this.actionService.handle(this.action, $event)
        : this.openDialog();
    }
    return this.actionService.handle(this.action, $event);
  }

  openDialog(): void { this.action.openDialog(); }
  closeDialog(): void { this.action.closeDialog(); }
  toggleDialog(): void { this.action.toggleDialog(); }
  checkDialog(): void { this.action.checkDialog(); }
}
