import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormBuilder, DynamicFormConfigService, DynamicFormDefinition,
  DynamicFormFieldType, DynamicFormLibraryService, DynamicFormTextareaControl, DynamicFormTextareaDefinition,
  DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { MatDynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('MatDynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormTextareaComponent>;
  let component: MatDynamicFormTextareaComponent;
  let builder: DynamicFormBuilder;
  let form: DynamicForm;
  let definition: DynamicFormTextareaDefinition;
  let formControl: DynamicFormTextareaControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTextareaModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        DynamicFormConfigService,
        DynamicFormValidationService,
      ],
    });

    fixture = TestBed.createComponent(MatDynamicFormTextareaComponent);
    component = fixture.componentInstance;

    builder = {} as any;

    form = new DynamicForm(builder, {} as DynamicFormDefinition, {});
    definition = { key: 'key', template: { label: 'label', input: {} } } as DynamicFormTextareaDefinition;
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
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const textareaDebugElement = fieldDebugElement.query(By.css('textarea'));
    const labelDebugElement = fieldDebugElement.query(By.css('label'));
    const fieldElement = fieldDebugElement.nativeElement as HTMLElement;
    const textareaElement = textareaDebugElement.nativeElement as HTMLTextAreaElement;
    const labelElement = labelDebugElement.nativeElement as HTMLLabelElement;

    expect(fieldElement).toBeTruthy();
    expect(textareaElement.id).toBe(component.inputId);
    expect(textareaElement.type).toBe('textarea');
    expect(labelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const textareaDebugElement = fieldDebugElement.query(By.css('textarea'));
    const textareaElement = textareaDebugElement.nativeElement as HTMLTextAreaElement;

    expect(textareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(textareaElement.readOnly).toBe(true);
  });
});
