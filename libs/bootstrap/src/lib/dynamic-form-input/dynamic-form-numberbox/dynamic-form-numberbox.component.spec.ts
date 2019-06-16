import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormNumberbox,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';
import { DynamicFormNumberboxModule } from './dynamic-form-numberbox.module';

describe('DynamicFormNumberboxComponent', () => {
  let fixture: ComponentFixture<DynamicFormNumberboxComponent>;
  let component: DynamicFormNumberboxComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormNumberbox>;
  let formControl: DynamicFormControl<DynamicFormNumberbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormNumberboxModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormNumberboxComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormNumberbox>>{ key: 'key', input: {} };
    formControl = new DynamicFormControl<DynamicFormNumberbox>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement).toBeDefined();
    expect(inputElement.id).toBe(component.id);
    expect(inputElement.type).toBe('number');
  });

  it('sets dynamic form control to readonly', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.className).not.toContain('readonly');
    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.className).toContain('readonly');
    expect(inputElement.readOnly).toBe(true);
  });
});
