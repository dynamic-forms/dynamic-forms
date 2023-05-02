import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormBuilder, DynamicFormConfigService, DynamicFormDefinition,
  DynamicFormFieldType, DynamicFormLibraryService, DynamicFormTextareaControl, DynamicFormTextareaDefinition,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

describe('BsDynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<BsDynamicFormTextareaComponent>;
  let component: BsDynamicFormTextareaComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormTextareaDefinition;
  let formControl: DynamicFormTextareaControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDynamicFormTextareaComponent],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(BsDynamicFormTextareaComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { input: {} } } as DynamicFormTextareaDefinition;
    formControl = new DynamicFormTextareaControl(builder, form, form, definition, {} as DynamicFormFieldType);

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
