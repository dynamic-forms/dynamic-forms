import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicForm, DynamicFormConfig, DynamicFormConfigService, DynamicFormControl,
  DynamicFormControlTemplate, DynamicFormTemplate, DynamicFormTextarea, DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea.component';
import { DynamicFormTextareaModule } from './dynamic-form-textarea.module';

describe('DynamicFormTextareaComponent', () => {
  let fixture: ComponentFixture<DynamicFormTextareaComponent>;
  let component: DynamicFormTextareaComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormTextarea>;
  let formControl: DynamicFormControl<DynamicFormTextarea>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormTextareaModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: DynamicFormConfigService,
          useValue: new DynamicFormConfigService(<DynamicFormConfig>{})
        },
        DynamicFormValidationService
      ]
    });

    fixture = TestBed.createComponent(DynamicFormTextareaComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormTextarea>>{ key: 'key', label: 'label', input: {} };
    formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, template);

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
    const fieldElement = <HTMLElement>fieldDebugElement.nativeElement;
    const textareaElement = <HTMLTextAreaElement>textareaDebugElement.nativeElement;

    expect(fieldElement.className).not.toContain('readonly');
    expect(textareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(fieldElement.className).toContain('readonly');
    expect(textareaElement.readOnly).toBe(true);
  });
});
