import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormLibraryService, DynamicFormTextarea, DynamicFormValidationService} from '@dynamic-forms/core';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { BsDynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('BsDynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormTextareaComponent>;
  let component: BsDynamicFormTextareaComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormTextarea>;
  let formControl: DynamicFormControl<DynamicFormTextarea>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDynamicFormTextareaModule
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' })
        },
        DynamicFormConfigService,
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(BsDynamicFormTextareaComponent);
    component = fixture.componentInstance;

    form = new DynamicForm({} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition<DynamicFormTextarea>;
    formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBeUndefined();
    expect(component.path).toBe('key');
    expect(component.inputId).toBe('key');
  });

  it('renders component template', () => {
    const textareaDebugElement = fixture.debugElement.query(By.css('textarea.form-control'));
    const textareaElement = textareaDebugElement.nativeElement as HTMLTextAreaElement;

    expect(textareaElement).toBeTruthy();
    expect(textareaElement.id).toBe(component.inputId);
  });

  it('sets dynamic form control to readonly', () => {
    const textareaDebugElement = fixture.debugElement.query(By.css('textarea.form-control'));
    const textareaElement = textareaDebugElement.nativeElement as HTMLTextAreaElement;

    expect(textareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(textareaElement.readOnly).toBe(true);
  });
});
