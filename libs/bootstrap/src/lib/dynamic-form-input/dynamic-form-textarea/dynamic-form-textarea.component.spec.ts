import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormTemplate,
  DynamicFormTextarea } from '@dynamic-forms/core';
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
        DynamicFormTextareaModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormTextareaComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormTextarea>>{ key: 'key', input: {} };
    formControl = new DynamicFormControl<DynamicFormTextarea>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formTextareaDebugElement = fixture.debugElement.query(By.css('textarea.form-control'));
    const formTextareaElement = <HTMLTextAreaElement>formTextareaDebugElement.nativeElement;

    expect(formTextareaElement).toBeDefined();
    expect(formTextareaElement.id).toBe(component.id);
  });

  it('sets dynamic form control to readonly', () => {
    const formTextareaDebugElement = fixture.debugElement.query(By.css('textarea.form-control'));
    const formTextareaElement = <HTMLTextAreaElement>formTextareaDebugElement.nativeElement;

    expect(formTextareaElement.className).not.toContain('readonly');
    expect(formTextareaElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formTextareaElement.className).toContain('readonly');
    expect(formTextareaElement.readOnly).toBe(true);
  });
});
