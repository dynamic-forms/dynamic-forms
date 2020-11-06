import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionBase } from './dynamic-form-action-base';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionService } from './dynamic-form-action.service';

class DynamicFormActionBaseTest extends DynamicFormActionBase {
  constructor(protected actionService: DynamicFormActionService) {
    super(actionService);
  }
}

describe('DynamicFormActionBase', () => {
  let component: DynamicFormActionBaseTest;

  beforeEach(() => {
    const libraryService = new DynamicFormLibraryService({ name: 'test' });
    const actionService = new DynamicFormActionService(libraryService, []);

    component = new DynamicFormActionBaseTest(actionService);
  });

  it('creates instance', () => {
    const definition = <DynamicFormActionDefinition>{ id: 'id', type: 'element', template: {} };
    const action = new DynamicFormAction(<any>{}, <any>{}, definition);

    component.action = action;

    expect(component.id).toBe(action.id);
    expect(component.action).toBe(action);
    expect(component.element).toBe(action);
    expect(component.definition).toBe(action.definition);
    expect(component.template).toBe(action.template);

    expect(component.dialogOpen).toBeFalse();
    expect(component.dialogOpen$).toBeDefined();

    expect(component.dialogDefinition).toBeUndefined();
    expect(() => component.dialogTemplate).toThrow();

    expect(component.dialog).toBeUndefined();
    expect(() => component.dialogElements).toThrow();
    expect(() => component.dialogHeaderActions).toThrow();
    expect(() => component.dialogFooterActions).toThrow();
  });

  it('creates instance with dialog', () => {
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ id: 'id', type: 'element', template: {}, dialogDefinition };
    const action = new DynamicFormAction(<any>{}, <any>{}, definition);
    const dialog = new DynamicForm(dialogDefinition, {});

    action.initDialog(dialog);

    component.action = action;

    expect(component.id).toBe(action.id);
    expect(component.action).toBe(action);
    expect(component.element).toBe(action);
    expect(component.definition).toBe(action.definition);
    expect(component.template).toBe(action.template);

    expect(component.dialogOpen).toBeFalse();
    expect(component.dialogOpen$).toBeDefined();

    expect(component.dialogDefinition).toBe(dialogDefinition);
    expect(component.dialogTemplate).toBe(dialogDefinition.template);

    expect(component.dialog).toBe(dialog);
    expect(component.dialogElements).toBe(dialog.elements);
    expect(component.dialogHeaderActions).toBe(dialog.headerActions);
    expect(component.dialogFooterActions).toBe(dialog.footerActions);
  });
});
