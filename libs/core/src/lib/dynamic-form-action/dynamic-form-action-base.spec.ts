import { MockService } from 'ng-mocks';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionBase } from './dynamic-form-action-base';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionType } from './dynamic-form-action-type';
import { DynamicFormActionService } from './dynamic-form-action.service';

class DynamicFormActionTestComponent extends DynamicFormActionBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}

describe('DynamicFormActionBase', () => {
  let builder: DynamicFormBuilder;
  let actionService: DynamicFormActionService;
  let component: DynamicFormActionTestComponent;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder, {
      getActionId: () => 'actionId',
    });

    const libraryService = new DynamicFormLibraryService({ name: 'test' });
    actionService = new DynamicFormActionService(libraryService, []);
    component = new DynamicFormActionTestComponent(actionService);
  });

  it('creates instance', () => {
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormActionDefinition;
    const type = {} as DynamicFormActionType;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, type);

    component.action = action;

    expect(component.id).toBe(action.id);
    expect(component.action).toBe(action);
    expect(component.element).toBe(action);
    expect(component.definition).toBe(action.definition);
    expect(component.template).toBe(action.template);

    expect(component.dialogOpen).toBeFalse();
    expect(component.dialogOpen$).toBeTruthy();

    expect(component.dialogDefinition).toBeUndefined();
    expect(() => component.dialogTemplate).toThrow();

    expect(component.dialog).toBeUndefined();
    expect(() => component.dialogChildren).toThrow();
    expect(() => component.dialogHeaderActions).toThrow();
    expect(() => component.dialogFooterActions).toThrow();
  });

  it('creates instance with dialog', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { id: 'id', type: 'element', template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);

    action.init();

    component.action = action;

    expect(component.id).toBe(action.id);
    expect(component.action).toBe(action);
    expect(component.element).toBe(action);
    expect(component.definition).toBe(action.definition);
    expect(component.template).toBe(action.template);

    expect(component.dialogOpen).toBeFalse();
    expect(component.dialogOpen$).toBeTruthy();

    expect(component.dialogDefinition).toBe(dialogDefinition);
    expect(component.dialogTemplate).toBe(dialogDefinition.template);

    expect(component.dialog).toBeTruthy();
    expect(component.dialogChildren).toBe(component.dialog.children);
    expect(component.dialogHeaderActions).toBe(component.dialog.headerActions);
    expect(component.dialogFooterActions).toBe(component.dialog.footerActions);
  });

  it('open, close, and toggle dialog throws if no dialog', () => {
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);

    component.action = action;

    expect(() => component.openDialog()).not.toThrow();
    expect(() => component.closeDialog()).not.toThrow();
    expect(() => component.toggleDialog()).not.toThrow();
  });

  it('opens, closes and toggles dialog', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition, {} as DynamicFormActionType);

    action.init();
    component.action = action;

    const openDialogSpy = spyOn(action, 'openDialog');
    const closeDialogSpy = spyOn(action, 'closeDialog');
    const toggleDialogSpy = spyOn(action, 'toggleDialog');

    component.openDialog();
    component.closeDialog();
    component.toggleDialog();

    expect(openDialogSpy).toHaveBeenCalled();
    expect(closeDialogSpy).toHaveBeenCalled();
    expect(toggleDialogSpy).toHaveBeenCalled();
  });

  it('checks dialog', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { id: 'id', type: 'element', template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);

    action.init();
    action.openDialog();

    const checkDialogSpy = spyOn(action.dialog, 'check');

    component.action = action;
    component.ngDoCheck();

    expect(checkDialogSpy).toHaveBeenCalled();
  });

  it('does not check dialog if not open', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { id: 'id', type: 'element', template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);

    action.init();

    const checkDialogSpy = spyOn(action.dialog, 'check');

    component.action = action;
    component.ngDoCheck();

    expect(checkDialogSpy).not.toHaveBeenCalled();
  });

  it('handles event by calling handle of action service', () => {
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);
    const event = {} as Event;

    const handleSpy = spyOn(actionService, 'handle');

    component.action = action;
    component.handleEvent(event);

    expect(handleSpy).toHaveBeenCalledWith(action, event);
  });

  it('handles event by calling handle of action service if dialog and dialog is open', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { id: 'id', type: 'element', template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);
    const event = {} as Event;

    action.init();
    component.action = action;
    component.openDialog();

    const openDialogSpy = spyOn(action, 'openDialog');
    const handleSpy = spyOn(actionService, 'handle');

    component.handleEvent(event);

    expect(openDialogSpy).not.toHaveBeenCalled();
    expect(handleSpy).toHaveBeenCalledWith(action, event);
  });

  it('handles event by calling openDialog of action if dialog but dialog not open', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { id: 'id', type: 'element', template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, {} as any, {} as any, definition, {} as DynamicFormActionType);
    const event = {} as Event;

    action.init();
    component.action = action;

    const openDialogSpy = spyOn(action, 'openDialog');
    const handleSpy = spyOn(actionService, 'handle');

    component.handleEvent(event);

    expect(openDialogSpy).toHaveBeenCalled();
    expect(handleSpy).not.toHaveBeenCalled();
  });
});
