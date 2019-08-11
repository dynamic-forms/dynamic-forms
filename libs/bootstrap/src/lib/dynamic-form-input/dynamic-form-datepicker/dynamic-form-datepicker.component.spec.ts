import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicForm, DynamicFormControl, DynamicFormControlDefinition, DynamicFormDatepicker,
  DynamicFormDefinition } from '@dynamic-forms/core';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';
import { DynamicFormDatepickerModule } from './dynamic-form-datepicker.module';

describe('DynamicFormDatepickerComponent', () => {
  let fixture: ComponentFixture<DynamicFormDatepickerComponent>;
  let component: DynamicFormDatepickerComponent;
  let form: DynamicForm;
  let definition: DynamicFormControlDefinition<DynamicFormDatepicker>;
  let formControl: DynamicFormControl<DynamicFormDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DynamicFormDatepickerModule
      ]
    });

    fixture = TestBed.createComponent(DynamicFormDatepickerComponent);
    component = fixture.componentInstance;

    form = new DynamicForm(<DynamicFormDefinition>{}, {});
    definition = <DynamicFormControlDefinition<DynamicFormDatepicker>>{ key: 'key', template: { label: 'label', input: {} } };
    formControl = new DynamicFormControl<DynamicFormDatepicker>(form, form, definition);

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
    expect(inputElement.type).toBe('date');
  });

  it('sets dynamic form control to readonly', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input.form-control'));
    const inputElement = <HTMLInputElement>inputDebugElement.nativeElement;

    expect(inputElement.readOnly).not.toBe(true);

    component.template.readonly = true;
    fixture.detectChanges();

    expect(inputElement.readOnly).toBe(true);
  });
});
