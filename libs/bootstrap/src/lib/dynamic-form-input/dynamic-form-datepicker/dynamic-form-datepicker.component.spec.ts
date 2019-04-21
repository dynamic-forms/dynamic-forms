import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlTemplate, DynamicFormDatepicker,
  DynamicFormTemplate } from '@dynamic-forms/core';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';
import { DynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('DynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<DynamicFormDatepickerComponent>;
  let component: DynamicFormDatepickerComponent;
  let form: DynamicForm;
  let template: DynamicFormControlTemplate<DynamicFormDatepicker>;
  let formControl: DynamicFormControl<DynamicFormDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDatepickerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormTemplate>{}, {});
    template = <DynamicFormControlTemplate<DynamicFormDatepicker>>{ key: 'key', label: 'label', input: {} };
    formControl = new DynamicFormControl<DynamicFormDatepicker>(form, form, template);

    component.field = formControl;

    fixture.detectChanges();
  }));

  it('creates component', () => {
    expect(component).toBeDefined();
    expect(component.id).toBe('key');
  });

  it('creates component template', () => {
    const formInputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    expect(formInputElement).toBeDefined();
    expect(formInputElement.id).toBe(component.id);
    expect(formInputElement.type).toBe('date');
  });

  it('sets dynamic form control to readonly', () => {
    const formInputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const formInputElement = <HTMLInputElement>formInputDebugElement.nativeElement;

    expect(formInputElement.className).not.toContain('readonly');
    expect(formInputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(formInputElement.className).toContain('readonly');
    expect(formInputElement.readOnly).toBe(true);
  });
});
