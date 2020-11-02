import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
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

  it('returns properties of action', () => {
    const definition = <DynamicFormActionDefinition>{ id: 'id', type: 'element', template: {} };
    const action = new DynamicFormAction(<any>{}, <any>{}, definition);

    component.action = action;

    expect(component.id).toBe(action.id);
    expect(component.action).toBe(action);
    expect(component.element).toBe(action);
    expect(component.definition).toBe(action.definition);
    expect(component.template).toBe(action.template);
  });
});
