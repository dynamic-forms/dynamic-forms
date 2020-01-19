import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfigService, DynamicFormControl, DynamicFormControlDefinition,
  DynamicFormDefinition, DynamicFormTextarea, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { MatDynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('MatDynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<MatDynamicFormTextareaComponent>;
  let component: MatDynamicFormTextareaComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormTextarea>;
  let formControl: DynamicFormControl<DynamicFormTextarea>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDynamicFormTextareaModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService({ name: 'test' })
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(MatDynamicFormTextareaComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormTextarea>>{ key: 'key', template: { label: 'label', input: {} } };
    formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, definition);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const textareaDebugElement = fieldDebugElement.query(By.css('textarea.mat-input-element'));
    const labelDebugElement = fieldDebugElement.query(By.css('label.mat-form-field-label'));
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const textareaElement = <HTMLTextAreaElement>textareaDebugElement.nativeElement;
    const labelElement = <HTMLLabelElement>labelDebugElement.nativeElement;

    expect(fieldElement).toBeDefined();
    expect(textareaElement.id).toBe(component.id);
    expect(textareaElement.type).toBe('textarea');
    expect(labelElement.innerText).toBe('label');
  });

  it('sets dynamic form control to readonly', () => {
    const fieldDebugElement = fixture.debugElement.query(By.css('mat-form-field'));
    const textareaDebugElement = fieldDebugElement.query(By.css('textarea.mat-input-element'));
    const textareaElement = <HTMLTextAreaElement>textareaDebugElement.nativeElement;

    expect(textareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(textareaElement.readOnly).toBe(true);
  });
});
