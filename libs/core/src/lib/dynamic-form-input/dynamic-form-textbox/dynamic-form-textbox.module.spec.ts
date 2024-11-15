import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormActionService } from '../../dynamic-form-action/dynamic-form-action.service';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormLibraryService } from '../../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../../dynamic-forms.module';
import { DynamicFormTextboxControl } from './dynamic-form-textbox';
import { dynamicFormTextboxToggleAsTextTypeHandler, withDynamicFormTextboxActionHandlers } from './dynamic-form-textbox.module';

describe('DynamicFormTextboxModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService(dynamicFormLibrary),
        },
        DynamicFormActionService,
        importDynamicFormsProviders(withDynamicFormTextboxActionHandlers()),
      ],
    });
  });

  it('provides DYNAMIC_FORM_ACTION_HANDLERS', inject([DynamicFormActionService], (service: DynamicFormActionService) => {
    const handlers = service.handlers;

    expect(handlers.length).toBe(1);
    expect(handlers[0]).toEqual(dynamicFormTextboxToggleAsTextTypeHandler);
    expect(handlers[0].func).toEqual(jasmine.any(Function));
    expect(handlers[0].libraryName).toEqual(dynamicFormLibrary.name);
  }));

  it('handler sets forced input type to text / undefined of control field with type textbox', inject(
    [DynamicFormActionService],
    (service: DynamicFormActionService) => {
      const handler = service.handlers.find(h => h.type === 'toggleTextboxAsTextType');
      const field = { input: {} } as DynamicFormTextboxControl;

      handler.func(field, null);

      expect(field.input.inputTypeForced).toBe('text');

      handler.func(field, null);

      expect(field.input.inputTypeForced).toBeUndefined();
    },
  ));
});
